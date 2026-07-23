# Yujie Zhang — personal academic website

This repository contains the source for
[yujie4phy.github.io](https://yujie4phy.github.io). The public design is kept
separate from the editable academic content.

## The easy way to edit

1. Open this website folder in Finder.
2. Double-click **Edit My Website.command**.
3. If macOS blocks it the first time, right-click it, choose **Open**, and
   confirm.
4. The local editor opens in your browser.
5. Choose a page from the left, make your changes, and click **Save section**.
6. Click **Build preview** to inspect the website before publishing.

The editor covers:

- About text
- Research themes, subtopics, and linked papers
- Publications and selected publications
- Talks and online slide links
- Outreach
- CV entries and awards
- Profile links, location, and footer date
- Replacing the portrait, CV PDF, and PowerPoint files

Every save makes a private local backup in `.content-backups`. This folder is
not published.

## Publish changes with GitHub Desktop

After saving and previewing:

1. Open **GitHub Desktop**.
2. Choose this repository.
3. Review the changed files shown on the left.
4. In **Summary**, write a short description such as `Add new publication`.
5. Click **Commit to main**.
6. Click **Push origin**.
7. Wait about one or two minutes. GitHub Actions will rebuild and publish the
   site automatically.
8. Visit [yujie4phy.github.io](https://yujie4phy.github.io) and refresh.

If GitHub Desktop has not opened this folder before, use **File → Add Local
Repository**, then select the folder containing this README.

## Where the content lives

The form editor writes plain JSON files in `content/`:

- `about.json`
- `research.json`
- `publications.json`
- `talks.json`
- `outreach.json`
- `cv.json`
- `profile.json`

They can also be edited directly in any text editor. The website layout and
styling live in `app/` and should normally be left unchanged.

For text fields, use:

- `[link label](https://example.com)` to add a link
- `**important text**` to add bold text

## Developer commands

The project uses Node.js 22 or newer and pnpm.

```bash
pnpm install
pnpm editor
pnpm run build:github
pnpm test
```

The GitHub Pages workflow is in `.github/workflows/deploy-pages.yml`.
