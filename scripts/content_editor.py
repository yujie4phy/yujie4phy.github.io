#!/usr/bin/env python3
"""A local, dependency-free editor for this personal website."""

from __future__ import annotations

import datetime as dt
import glob
import json
import mimetypes
import os
import re
import shutil
import subprocess
import sys
import threading
import urllib.parse
import webbrowser
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
EDITOR_ROOT = ROOT / "editor"
CONTENT_ROOT = ROOT / "content"
PUBLIC_ROOT = ROOT / "public"
PREVIEW_ROOT = ROOT / "out"
BACKUP_ROOT = ROOT / ".content-backups"
MAX_JSON_SIZE = 8 * 1024 * 1024
MAX_ASSET_SIZE = 80 * 1024 * 1024

SECTIONS = {
    "profile": "profile.json",
    "about": "about.json",
    "publications": "publications.json",
    "publications-page": "publications-page.json",
    "research": "research.json",
    "talks": "talks.json",
    "outreach": "outreach.json",
    "cv": "cv.json",
}

ASSETS = {
    "portrait": {
        "path": PUBLIC_ROOT / "yujie-zhang.jpg",
        "extensions": {".jpg", ".jpeg"},
        "signature": lambda data: data.startswith(b"\xff\xd8\xff"),
    },
    "cv": {
        "path": PUBLIC_ROOT / "Yujie-Zhang-CV.pdf",
        "extensions": {".pdf"},
        "signature": lambda data: data.startswith(b"%PDF"),
    },
}

BUILD_LOCK = threading.Lock()


def now_stamp() -> str:
    return dt.datetime.now().strftime("%Y%m%d-%H%M%S-%f")


def safe_backup(source: Path) -> None:
    if not source.exists():
        return
    relative = source.relative_to(ROOT)
    destination = BACKUP_ROOT / now_stamp() / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def atomic_write(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{os.getpid()}.tmp")
    temporary.write_bytes(data)
    temporary.replace(path)


def find_pnpm() -> tuple[str | None, dict[str, str]]:
    environment = os.environ.copy()
    executable = shutil.which("pnpm")
    if executable:
        return executable, environment

    fallback_patterns = [
        str(
            Path.home()
            / ".cache/codex-runtimes/*/dependencies/bin/fallback/pnpm"
        ),
        str(
            Path.home()
            / ".cache/codex-runtimes/*/dependencies/bin/override/pnpm"
        ),
    ]
    candidates: list[str] = []
    for pattern in fallback_patterns:
        candidates.extend(glob.glob(pattern))

    if not candidates:
        return None, environment

    executable = sorted(candidates)[-1]
    node_candidates = glob.glob(
        str(Path(executable).parents[2] / "node/bin/node")
    )
    if node_candidates:
        environment["PATH"] = (
            str(Path(node_candidates[-1]).parent)
            + os.pathsep
            + environment.get("PATH", "")
        )
    return executable, environment


def run_build() -> tuple[bool, str]:
    if not BUILD_LOCK.acquire(blocking=False):
        return False, "A preview is already being prepared."
    try:
        pnpm, environment = find_pnpm()
        if not pnpm:
            return (
                False,
                "Local preview needs Node.js and pnpm. You can still save all "
                "changes here and let GitHub build the public website after you publish.",
            )
        result = subprocess.run(
            [pnpm, "run", "build:github"],
            cwd=ROOT,
            env=environment,
            capture_output=True,
            text=True,
            timeout=420,
            check=False,
        )
        output = f"{result.stdout}\n{result.stderr}".strip()
        if result.returncode:
            return False, output[-14000:]
        return True, output[-8000:]
    except subprocess.TimeoutExpired:
        return False, "The preview build took longer than seven minutes and was stopped."
    finally:
        BUILD_LOCK.release()


class WebsiteEditorHandler(BaseHTTPRequestHandler):
    server_version = "YujieWebsiteEditor/1.0"

    def log_message(self, format_string: str, *args: object) -> None:
        print(f"[editor] {format_string % args}")

    def send_json(self, payload: object, status: int = 200) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def send_file(self, path: Path, *, preview_html: bool = False) -> None:
        if not path.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        data = path.read_bytes()
        content_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        if preview_html and path.suffix == ".html":
            text = data.decode("utf-8")
            text = re.sub(
                r'(?P<attr>\b(?:href|src)=["\'])/(?!preview/)',
                r"\g<attr>/preview/",
                text,
            )
            data = text.encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8" if content_type.startswith("text/") else content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def read_body(self, maximum: int) -> bytes:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as error:
            raise ValueError("Invalid content length.") from error
        if length <= 0 or length > maximum:
            raise ValueError("The submitted file is empty or too large.")
        return self.rfile.read(length)

    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        route = urllib.parse.unquote(parsed.path)

        if route == "/api/content":
            payload = {
                key: json.loads((CONTENT_ROOT / filename).read_text("utf-8"))
                for key, filename in SECTIONS.items()
            }
            self.send_json(payload)
            return

        if route == "/api/files":
            slides = []
            slide_root = PUBLIC_ROOT / "slides"
            if slide_root.exists():
                slides = sorted(path.name for path in slide_root.glob("*.pptx"))
            self.send_json(
                {
                    "portrait": ASSETS["portrait"]["path"].exists(),
                    "cv": ASSETS["cv"]["path"].exists(),
                    "slides": slides,
                }
            )
            return

        if route.startswith("/preview"):
            relative = route.removeprefix("/preview").lstrip("/")
            target = PREVIEW_ROOT / relative
            if route.endswith("/") or not target.suffix:
                target = target / "index.html"
            try:
                target.resolve().relative_to(PREVIEW_ROOT.resolve())
            except ValueError:
                self.send_error(HTTPStatus.FORBIDDEN)
                return
            self.send_file(target, preview_html=True)
            return

        if route == "/":
            self.send_file(EDITOR_ROOT / "index.html")
            return

        relative = route.lstrip("/")
        target = EDITOR_ROOT / relative
        try:
            target.resolve().relative_to(EDITOR_ROOT.resolve())
        except ValueError:
            self.send_error(HTTPStatus.FORBIDDEN)
            return
        self.send_file(target)

    def do_POST(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        route = urllib.parse.unquote(parsed.path)

        if route.startswith("/api/content/"):
            section = route.removeprefix("/api/content/")
            filename = SECTIONS.get(section)
            if not filename:
                self.send_json({"ok": False, "message": "Unknown section."}, 404)
                return
            try:
                raw = self.read_body(MAX_JSON_SIZE)
                payload = json.loads(raw.decode("utf-8"))
            except (ValueError, UnicodeDecodeError, json.JSONDecodeError) as error:
                self.send_json({"ok": False, "message": str(error)}, 400)
                return
            target = CONTENT_ROOT / filename
            safe_backup(target)
            atomic_write(
                target,
                f"{json.dumps(payload, indent=2, ensure_ascii=False)}\n".encode("utf-8"),
            )
            self.send_json(
                {
                    "ok": True,
                    "message": f"{section.capitalize()} saved. A backup was kept.",
                }
            )
            return

        if route == "/api/build":
            ok, output = run_build()
            self.send_json(
                {
                    "ok": ok,
                    "message": "Preview ready." if ok else "Preview could not be prepared.",
                    "output": output,
                },
                200 if ok else 500,
            )
            return

        if route == "/api/upload":
            query = urllib.parse.parse_qs(parsed.query)
            kind = query.get("kind", [""])[0]
            original_name = self.headers.get("X-Filename", "")
            try:
                data = self.read_body(MAX_ASSET_SIZE)
            except ValueError as error:
                self.send_json({"ok": False, "message": str(error)}, 400)
                return

            if kind == "slides":
                filename = Path(original_name).name
                if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._-]*\.pptx", filename, re.I):
                    self.send_json(
                        {
                            "ok": False,
                            "message": "Use a simple .pptx filename with letters, numbers, dashes, or underscores.",
                        },
                        400,
                    )
                    return
                if not data.startswith(b"PK"):
                    self.send_json({"ok": False, "message": "This is not a valid PowerPoint file."}, 400)
                    return
                target = PUBLIC_ROOT / "slides" / filename
            else:
                specification = ASSETS.get(kind)
                if not specification:
                    self.send_json({"ok": False, "message": "Unknown file type."}, 400)
                    return
                extension = Path(original_name).suffix.lower()
                if (
                    extension not in specification["extensions"]
                    or not specification["signature"](data)
                ):
                    expected = ", ".join(sorted(specification["extensions"]))
                    self.send_json(
                        {"ok": False, "message": f"Please choose a valid {expected} file."},
                        400,
                    )
                    return
                target = specification["path"]

            safe_backup(target)
            atomic_write(target, data)
            self.send_json(
                {
                    "ok": True,
                    "message": f"{target.name} saved. A backup was kept.",
                    "filename": target.name,
                }
            )
            return

        self.send_error(HTTPStatus.NOT_FOUND)


def find_port(start: int = 4174) -> int:
    for port in range(start, start + 20):
        try:
            server = ThreadingHTTPServer(("127.0.0.1", port), WebsiteEditorHandler)
        except OSError:
            continue
        server.server_close()
        return port
    raise RuntimeError("Could not find an available local port.")


def main() -> None:
    port = find_port()
    server = ThreadingHTTPServer(("127.0.0.1", port), WebsiteEditorHandler)
    url = f"http://127.0.0.1:{port}"
    print("\nYujie's website editor is ready.")
    print(f"Open {url} if your browser does not open automatically.")
    print("Keep this window open while editing. Press Control-C to stop.\n")
    if "--no-open" not in sys.argv:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nEditor stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
