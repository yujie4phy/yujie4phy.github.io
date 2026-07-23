import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function output(relativePath) {
  return readFile(new URL(`../out/${relativePath}`, import.meta.url), "utf8");
}

test("renders the editable About content and profile links", async () => {
  const html = await output("index.html");

  assert.match(html, /Yujie/);
  assert.match(html, /Zhang/);
  assert.match(html, /Institute for Quantum Computing/);
  assert.match(html, /Perimeter Institute for Theoretical Physics/);
  assert.match(html, /https:\/\/x\.com\/Yujie4physics/);
  assert.match(html, /selected publications/);
});

test("renders research themes and related papers from content files", async () => {
  const html = await output("research/index.html");

  assert.match(html, /Operational Foundations of Quantum Nonclassicality/);
  assert.match(html, /Optical Quantum Information Processing and Quantum Networks/);
  assert.match(html, /Broader Directions in Quantum Information and AI/);
  assert.match(html, /Entanglement Certification with Noncontextuality Inequalities/);
});

test("renders publication pages and highlights the profile author", async () => {
  const html = await output("publications/index.html");

  assert.match(html, /Entanglement Certification with Noncontextuality Inequalities/);
  assert.match(html, /<strong class="self-author">Yujie Zhang<\/strong>/);
  assert.match(html, /Physical Review Letters 132, 250201/);
});

test("ships the local editor and editable content files", async () => {
  await Promise.all([
    access(new URL("../Edit My Website.command", import.meta.url)),
    access(new URL("../scripts/content_editor.py", import.meta.url)),
    access(new URL("../editor/index.html", import.meta.url)),
    access(new URL("../editor/editor.js", import.meta.url)),
  ]);

  const files = [
    "about.json",
    "research.json",
    "publications.json",
    "talks.json",
    "outreach.json",
    "cv.json",
    "profile.json",
  ];

  for (const filename of files) {
    const value = JSON.parse(
      await readFile(new URL(`../content/${filename}`, import.meta.url), "utf8"),
    );
    assert.ok(value !== null);
  }
});
