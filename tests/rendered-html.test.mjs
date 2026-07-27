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
  assert.match(
    html,
    /class="profile-photo"[^>]+width="175"[^>]+height="175"/,
  );
});

test("renders research themes and related papers from content files", async () => {
  const html = await output("research/index.html");

  assert.match(html, /id="nonclassicality"/);
  assert.match(html, /id="optical-networks"/);
  assert.match(html, /id="broader-directions"/);
  assert.match(
    html,
    /Leibnizian nonclassicality through generalized noncontextuality/,
  );
  assert.match(html, /Measurement incompatibility and quantum steering/);
  assert.match(html, /Bell nonlocality/);
  assert.match(
    html,
    /Quantum protocols through the lens of foundational concepts/,
  );
  assert.match(html, /Entanglement Certification with Noncontextuality Inequalities/);
  assert.match(html, /\/research\/classical-process\.png/);
  assert.match(html, /\/research\/nonclassicality-hierarchy\.png/);
  assert.match(html, /\/research\/array-spade\.png/);
  assert.match(html, /\/research\/one-way-telescopy\.png/);
  assert.match(html, /One-way, entanglement-assisted long-baseline interferometry/);
  assert.doesNotMatch(html, /View paper/);

  const processFigure = html.indexOf("/research/classical-process.png");
  const leibnizianSection = html.indexOf(
    "Leibnizian nonclassicality through generalized noncontextuality",
  );
  const hierarchyFigure = html.indexOf(
    "/research/nonclassicality-hierarchy.png",
  );

  assert.ok(processFigure < leibnizianSection);
  assert.ok(leibnizianSection < hierarchyFigure);
});

test("renders publication pages and highlights the profile author", async () => {
  const html = await output("publications/index.html");

  assert.match(html, /Entanglement Certification with Noncontextuality Inequalities/);
  assert.match(html, /<strong class="self-author">Yujie Zhang<\/strong>/);
  assert.match(html, /Physical Review Letters 132, 250201/);
  assert.match(html, /My work spans quantum foundations, quantum information/);
  assert.match(html, /Research articles and preprints across quantum information science/);
  assert.match(html, /An asterisk denotes co-first authorship/);
});

test("ships the local editor and editable content files", async () => {
  await Promise.all([
    access(new URL("../Edit My Website.command", import.meta.url)),
    access(new URL("../scripts/content_editor.py", import.meta.url)),
    access(new URL("../editor/index.html", import.meta.url)),
    access(new URL("../editor/editor.js", import.meta.url)),
    access(new URL("../public/research/classical-process.png", import.meta.url)),
    access(new URL("../public/research/nonclassicality-hierarchy.png", import.meta.url)),
    access(new URL("../public/research/array-spade.png", import.meta.url)),
    access(new URL("../public/research/one-way-telescopy.png", import.meta.url)),
  ]);

  const editorSource = await readFile(
    new URL("../editor/editor.js", import.meta.url),
    "utf8",
  );
  assert.match(editorSource, /key === "publications"/);
  assert.match(editorSource, /\[\s*"selected",\s*false,?\s*\]/);

  const files = [
    "about.json",
    "research.json",
    "publications.json",
    "publications-page.json",
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
