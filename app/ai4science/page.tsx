import type { Metadata } from "next";
import ai4science from "../../content/ai4science.json";
import { RichText } from "../components/RichText";
import { SiteShell } from "../components/SiteShell";
import { profile } from "../site-data";

export const metadata: Metadata = {
  title: `AI4Science — ${profile.givenName} ${profile.familyName}`,
  description:
    "AI-generated and AI-assisted research notes in quantum information science.",
};

export default function AI4SciencePage() {
  return (
    <SiteShell
      current="ai4science"
      pageTitle="AI4Science"
      pageDescription={ai4science.pageDescription}
      pageHeadingVariant="compact"
    >
      <section className="ai-disclosure" aria-labelledby="ai4science-introduction">
        <h2 id="ai4science-introduction">About these notes</h2>
        {ai4science.introduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <div className="ai-note-list">
        {ai4science.notes.map((note) => (
          <article className="ai-note" id={note.id} key={note.id}>
            <header className="ai-note-header">
              <div className="ai-note-index" aria-hidden="true">
                {note.number}
              </div>
              <div>
                <p className="ai-note-meta">
                  <span>{note.label}</span>
                  <span>{note.date}</span>
                </p>
                <h2>{note.title}</h2>
              </div>
            </header>

            <div className="ai-note-copy">
              {note.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>

            <div className="ai-note-actions" aria-label={`Files for ${note.title}`}>
              <a href={note.pdf} target="_blank" rel="noreferrer">
                Read the note
              </a>
              <a href={note.pdf} download>
                Download PDF
              </a>
            </div>

          </article>
        ))}
      </div>
    </SiteShell>
  );
}
