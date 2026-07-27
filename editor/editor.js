const sectionDefinitions = [
  {
    key: "about",
    label: "About",
    kicker: "ABOUT PAGE",
    description: "Edit the two introductory paragraphs shown beside your portrait.",
    route: "/",
  },
  {
    key: "research",
    label: "Research",
    kicker: "RESEARCH PAGE",
    description: "Edit research themes, subtopics, explanatory text, and related papers.",
    route: "/research/",
  },
  {
    key: "publications",
    label: "Publications",
    kicker: "PUBLICATION LIST",
    description: "Add papers, change metadata and links, or choose items for the About page.",
    route: "/publications/",
  },
  {
    key: "publications-page",
    label: "Publication intro",
    kicker: "PUBLICATION PAGE",
    description: "Edit the publication summary, page subtitle, and profile links above the paper list.",
    route: "/publications/",
  },
  {
    key: "talks",
    label: "Talks",
    kicker: "TALKS PAGE",
    description: "Add presentations, update events, and connect online slide links.",
    route: "/talks/",
  },
  {
    key: "outreach",
    label: "Outreach",
    kicker: "OTHERS PAGE",
    description: "Maintain public engagement activities shown on the Others page.",
    route: "/others/",
  },
  {
    key: "cv",
    label: "CV entries",
    kicker: "CV PAGE",
    description: "Edit employment, education, awards, and honors.",
    route: "/cv/",
  },
  {
    key: "profile",
    label: "Profile & links",
    kicker: "SITE-WIDE DETAILS",
    description: "Update your name, location, academic profiles, footer date, and CV path.",
    route: "/",
  },
  {
    key: "files",
    label: "Replace files",
    kicker: "PHOTOS & DOCUMENTS",
    description: "Replace your portrait, CV PDF, or PowerPoint slide decks.",
    route: "/",
  },
];

const friendlyLabels = {
  abstract: "Abstract",
  authors: "Authors",
  awards: "Awards and honors",
  citation: "Journal citation",
  cvFile: "CV file path",
  date: "Year / date",
  dates: "Dates",
  department: "Affiliations",
  description: "Description",
  detail: "Details",
  education: "Education",
  email: "Email address",
  employment: "Employment",
  event: "Event",
  familyName: "Family name",
  figures: "Illustrative figures",
  figuresAfter: "Figures after this subtopic",
  figuresBefore: "Figures before this subtopic",
  givenName: "Given name",
  href: "Web link",
  icon: "Icon",
  id: "Section ID",
  institution: "Institution",
  interests: "Research interests",
  label: "Label",
  lastUpdated: "Last updated",
  links: "Links",
  location: "Location",
  note: "Short explanation",
  outreach: "Outreach",
  overview: "Overview",
  pageDescription: "Page subtitle",
  papers: "Related papers",
  papersHeading: "Paper-list heading",
  paragraphs: "Paragraphs",
  publications: "Publications",
  role: "Professional title",
  selected: "Show on About page",
  src: "Image path",
  subthemes: "Subtopics",
  themes: "Research themes",
  title: "Title",
  topics: "Overview bullet points",
  venue: "Journal / venue",
  wide: "Use full width",
  year: "Year",
};

const longTextKeys = new Set([
  "abstract",
  "authors",
  "citation",
  "description",
  "detail",
  "note",
  "paragraphs",
  "topics",
]);

const fieldHints = {
  href: "Paste the complete https:// address.",
  links: "Buttons displayed beneath this item.",
  selected: "Only selected papers appear on the About page.",
  paragraphs: "Links: [label](https://address). Bold: **text**.",
  id: "Use lowercase words separated by dashes; usually leave this unchanged.",
  lastUpdated: "For example: July 2026.",
};

let siteContent = {};
let activeKey = "about";
let workingValue = null;
let dirty = false;
let toastTimer = null;

const tabs = document.querySelector("#section-tabs");
const editorContent = document.querySelector("#editor-content");
const filesPanel = document.querySelector("#files-panel");
const saveButton = document.querySelector("#save-button");
const saveState = document.querySelector("#save-state");
const previewButton = document.querySelector("#preview-button");
const previewPanel = document.querySelector("#preview-panel");
const previewFrame = document.querySelector("#preview-frame");
const buildDialog = document.querySelector("#build-dialog");
const buildOutput = document.querySelector("#build-output");
const toast = document.querySelector("#toast");

function clone(value) {
  return structuredClone(value);
}

function labelFor(key) {
  if (friendlyLabels[key]) return friendlyLabels[key];
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function sectionDefinition(key = activeKey) {
  return sectionDefinitions.find((section) => section.key === key);
}

function showToast(message, error = false) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.toggle("error", error);
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4200);
}

function markDirty() {
  dirty = true;
  saveButton.disabled = false;
  saveState.textContent = "Unsaved changes";
  saveState.classList.add("dirty");
}

function markSaved(message = "All changes saved") {
  dirty = false;
  saveButton.disabled = activeKey === "files";
  saveState.textContent = message;
  saveState.classList.remove("dirty");
}

function getAtPath(root, path) {
  return path.reduce((value, key) => value[key], root);
}

function setAtPath(root, path, value) {
  if (!path.length) {
    workingValue = value;
    return;
  }
  const parent = getAtPath(root, path.slice(0, -1));
  parent[path.at(-1)] = value;
}

function makeButton(text, className, handler, title = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = text;
  if (title) button.title = title;
  button.addEventListener("click", handler);
  return button;
}

function templateFor(collectionKey) {
  const templates = {
    paragraphs: "",
    topics: "",
    links: { label: "arXiv", href: "" },
    interests: { title: "", description: "" },
    publications: {
      year: new Date().getFullYear(),
      venue: "",
      title: "New publication",
      authors: "Yujie Zhang",
      citation: "",
      abstract: "",
      selected: false,
      links: [],
    },
    employment: {
      title: "",
      institution: "",
      location: "",
      dates: "",
      detail: "",
    },
    education: {
      title: "",
      institution: "",
      location: "",
      dates: "",
      detail: "",
    },
    awards: {
      year: String(new Date().getFullYear()),
      title: "",
      description: "",
      href: "",
    },
    talks: {
      date: String(new Date().getFullYear()),
      title: "New talk",
      event: "",
      location: "—",
      links: [],
    },
    outreach: {
      year: String(new Date().getFullYear()),
      title: "New outreach activity",
      description: "",
      href: "",
    },
    themes: {
      id: "new-research-theme",
      title: "New research theme",
      paragraphs: [""],
      figures: [],
      papersHeading: "Selected related work",
      papers: [],
      subthemes: [],
    },
    figures: {
      src: "/research/image.png",
      alt: "",
      caption: "",
      href: "",
      width: 1200,
      height: 800,
      wide: false,
    },
    subthemes: {
      title: "New subtopic",
      figuresBefore: [],
      paragraphs: [""],
      papers: [],
      figuresAfter: [],
    },
    papers: {
      title: "Paper title",
      href: "",
      note: "",
    },
  };
  return clone(templates[collectionKey] ?? "");
}

function objectTitle(value, index) {
  if (typeof value !== "object" || value === null) return `Item ${index + 1}`;
  return (
    value.title ||
    value.label ||
    value.name ||
    value.institution ||
    value.date ||
    `Item ${index + 1}`
  );
}

function renderPrimitive(value, path, key) {
  const field = document.createElement("label");
  field.className = "field";

  if (typeof value === "boolean") {
    field.className = "checkbox-field";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = value;
    input.addEventListener("change", () => {
      setAtPath(workingValue, path, input.checked);
      markDirty();
    });
    const text = document.createElement("span");
    text.textContent = labelFor(key);
    field.append(input, text);
    return field;
  }

  const heading = document.createElement("span");
  heading.className = "field-label";
  heading.textContent = labelFor(key);
  if (fieldHints[key]) {
    const hint = document.createElement("span");
    hint.className = "field-help";
    hint.textContent = fieldHints[key];
    heading.append(hint);
  }
  field.append(heading);

  const stringValue = value ?? "";
  const useTextarea =
    typeof stringValue === "string" &&
    (stringValue.length > 110 || longTextKeys.has(key));
  const input = document.createElement(useTextarea ? "textarea" : "input");
  if (!useTextarea) {
    input.type =
      typeof value === "number" ? "number" : key === "href" ? "url" : "text";
  }
  input.value = stringValue;
  input.addEventListener("input", () => {
    const updated = typeof value === "number" ? Number(input.value) : input.value;
    setAtPath(workingValue, path, updated);
    markDirty();
  });
  field.append(input);
  return field;
}

function renderObject(value, path, key, nested = false) {
  const container = document.createElement("div");
  container.className = nested ? "nested-object" : "object-fields";

  if (nested) {
    const heading = document.createElement("div");
    heading.className = "block-heading";
    const title = document.createElement("h3");
    title.textContent = labelFor(key);
    heading.append(title);
    container.append(heading);
  }

  const entries = Object.entries(value);
  if (
    key === "publications" &&
    !Object.prototype.hasOwnProperty.call(value, "selected")
  ) {
    const linksIndex = entries.findIndex(([childKey]) => childKey === "links");
    entries.splice(linksIndex === -1 ? entries.length : linksIndex, 0, [
      "selected",
      false,
    ]);
  }

  entries.forEach(([childKey, childValue]) => {
    container.append(renderValue(childValue, [...path, childKey], childKey, true));
  });
  return container;
}

function renderArray(value, path, key) {
  const block = document.createElement("section");
  block.className = "array-block";
  const heading = document.createElement("div");
  heading.className = "block-heading";
  const title = document.createElement("h3");
  title.textContent = `${labelFor(key)} (${value.length})`;
  const add = makeButton(
    "+ Add",
    "small-button",
    () => {
      value.push(templateFor(path.length ? key : activeKey));
      markDirty();
      renderActiveSection();
    },
    `Add ${labelFor(key).toLowerCase()}`,
  );
  heading.append(title, add);
  block.append(heading);

  value.forEach((item, index) => {
    const itemPath = [...path, index];
    if (typeof item !== "object" || item === null) {
      const row = document.createElement("div");
      row.className = "simple-array-item";
      row.append(renderPrimitive(item, itemPath, key));
      row.append(
        makeButton("Remove", "small-button danger", () => {
          value.splice(index, 1);
          markDirty();
          renderActiveSection();
        }),
      );
      block.append(row);
      return;
    }

    const details = document.createElement("details");
    details.className = "item-card";
    details.open = value.length <= 3 || index === 0;
    const summary = document.createElement("summary");
    summary.textContent = objectTitle(item, index);
    const body = document.createElement("div");
    body.className = "item-card-body";
    body.append(renderObject(item, itemPath, key));
    const actions = document.createElement("div");
    actions.className = "item-actions";
    if (index > 0) {
      actions.append(
        makeButton("Move up", "small-button", () => {
          [value[index - 1], value[index]] = [value[index], value[index - 1]];
          markDirty();
          renderActiveSection();
        }),
      );
    }
    if (index < value.length - 1) {
      actions.append(
        makeButton("Move down", "small-button", () => {
          [value[index + 1], value[index]] = [value[index], value[index + 1]];
          markDirty();
          renderActiveSection();
        }),
      );
    }
    actions.append(
      makeButton("Remove", "small-button danger", () => {
        if (!window.confirm(`Remove “${objectTitle(item, index)}”?`)) return;
        value.splice(index, 1);
        markDirty();
        renderActiveSection();
      }),
    );
    body.append(actions);
    details.append(summary, body);
    block.append(details);
  });
  return block;
}

function renderValue(value, path, key, nested = false) {
  if (Array.isArray(value)) return renderArray(value, path, key);
  if (typeof value === "object" && value !== null) {
    return renderObject(value, path, key, nested);
  }
  return renderPrimitive(value, path, key);
}

function renderTabs() {
  tabs.replaceChildren();
  sectionDefinitions.forEach((section) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = `section-tab${section.key === activeKey ? " active" : ""}`;
    tab.innerHTML = `<span>${section.label}</span><small>›</small>`;
    tab.addEventListener("click", () => selectSection(section.key));
    tabs.append(tab);
  });
}

function renderActiveSection() {
  const definition = sectionDefinition();
  document.querySelector("#section-kicker").textContent = definition.kicker;
  document.querySelector("#section-title").textContent = definition.label;
  document.querySelector("#section-description").textContent = definition.description;
  renderTabs();

  const isFiles = activeKey === "files";
  editorContent.hidden = isFiles;
  filesPanel.hidden = !isFiles;
  saveButton.hidden = isFiles;
  saveState.hidden = isFiles;
  if (isFiles) {
    loadFiles();
    return;
  }

  editorContent.replaceChildren(
    renderValue(workingValue, [], activeKey, false),
  );
}

function selectSection(key) {
  if (key === activeKey) return;
  if (dirty && !window.confirm("Discard the unsaved changes in this section?")) return;
  activeKey = key;
  workingValue = key === "files" ? null : clone(siteContent[key]);
  markSaved();
  renderActiveSection();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function saveSection(showMessage = true) {
  if (activeKey === "files") return true;
  saveButton.disabled = true;
  saveState.textContent = "Saving…";
  try {
    const response = await fetch(`/api/content/${activeKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workingValue),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Could not save.");
    siteContent[activeKey] = clone(workingValue);
    markSaved("Saved");
    if (showMessage) showToast(result.message);
    return true;
  } catch (error) {
    saveButton.disabled = false;
    saveState.textContent = "Save failed";
    saveState.classList.add("dirty");
    showToast(error.message, true);
    return false;
  }
}

async function buildPreview() {
  if (dirty && !(await saveSection(false))) return;
  buildOutput.textContent = "";
  buildOutput.style.display = "none";
  buildDialog.showModal();
  previewButton.disabled = true;
  try {
    const response = await fetch("/api/build", { method: "POST" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.output || result.message);
    buildDialog.close();
    const route = sectionDefinition().route;
    previewFrame.src = `/preview${route}?fresh=${Date.now()}`;
    previewPanel.hidden = false;
    showToast("Preview ready.");
  } catch (error) {
    buildOutput.textContent = error.message;
    buildOutput.style.display = "block";
    buildDialog.querySelector("h2").textContent = "Preview needs attention";
    buildDialog.querySelector("p").textContent =
      "Your saved content is safe. Close this window and use the message below if you need help.";
    showToast("The preview could not be prepared.", true);
    window.setTimeout(() => buildDialog.addEventListener("click", () => buildDialog.close(), { once: true }), 0);
  } finally {
    previewButton.disabled = false;
  }
}

async function loadFiles() {
  try {
    const response = await fetch("/api/files");
    const files = await response.json();
    const slideList = document.querySelector("#slide-list");
    slideList.replaceChildren();
    files.slides.forEach((filename) => {
      const code = document.createElement("code");
      code.textContent = filename;
      slideList.append(code);
    });
  } catch {
    showToast("Could not list the current files.", true);
  }
}

async function uploadFile(input, kind) {
  const file = input.files?.[0];
  if (!file) return;
  const label = input.closest(".file-picker").querySelector("span");
  const originalLabel = label.textContent;
  label.textContent = "Saving…";
  try {
    const response = await fetch(`/api/upload?kind=${encodeURIComponent(kind)}`, {
      method: "POST",
      headers: { "X-Filename": file.name },
      body: file,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    showToast(result.message);
    input.value = "";
    if (kind === "slides") {
      const publicDeck = `https://yujie4phy.github.io/slides/${encodeURIComponent(result.filename)}`;
      const viewer = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(publicDeck)}`;
      const resultBox = document.querySelector("#slide-link-result");
      resultBox.hidden = false;
      resultBox.innerHTML =
        `<strong>Online slide link</strong><br>` +
        `Copy this into the talk’s Web link field:<br><code>${viewer}</code>`;
      loadFiles();
    }
  } catch (error) {
    showToast(error.message, true);
  } finally {
    label.textContent = originalLabel;
  }
}

async function initialize() {
  try {
    const response = await fetch("/api/content");
    if (!response.ok) throw new Error("The content files could not be opened.");
    siteContent = await response.json();
    workingValue = clone(siteContent[activeKey]);
    markSaved();
    renderActiveSection();
  } catch (error) {
    editorContent.innerHTML = `<p>${error.message}</p>`;
    showToast(error.message, true);
  }
}

saveButton.addEventListener("click", () => saveSection());
previewButton.addEventListener("click", buildPreview);
document.querySelector("#close-preview").addEventListener("click", () => {
  previewPanel.hidden = true;
  previewFrame.src = "about:blank";
});
document.querySelector("#portrait-file").addEventListener("change", (event) => {
  uploadFile(event.currentTarget, "portrait");
});
document.querySelector("#cv-file").addEventListener("change", (event) => {
  uploadFile(event.currentTarget, "cv");
});
document.querySelector("#slides-file").addEventListener("change", (event) => {
  uploadFile(event.currentTarget, "slides");
});
window.addEventListener("beforeunload", (event) => {
  if (!dirty) return;
  event.preventDefault();
});

initialize();
