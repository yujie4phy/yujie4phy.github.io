import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { CareerEntry, education, employment, profile } from "../site-data";

export const metadata: Metadata = { title: `CV — ${profile.givenName} ${profile.familyName}` };

function CareerSection({ title, entries }: { title: string; entries: CareerEntry[] }) {
  return (
    <section className="cv-section" aria-labelledby={`${title.toLowerCase()}-heading`}>
      <h2 id={`${title.toLowerCase()}-heading`}>{title}</h2>
      <div className="timeline">
        {entries.map((entry) => (
          <article className="timeline-entry" key={`${entry.title}-${entry.dates}`}>
            <div className="timeline-date">{entry.dates}</div>
            <div>
              <h3>{entry.title}</h3>
              <p className="institution-line">
                <strong>{entry.institution}</strong> · {entry.location}
              </p>
              <p>{entry.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function CVPage() {
  return (
    <SiteShell current="cv" pageTitle="CV" pageDescription="Employment and education">
      <div className="page-intro-action">
        <p>A complete PDF version can be linked here when you add your CV.</p>
        {profile.cvFile ? (
          <a className="primary-button" href={profile.cvFile}>Download full CV</a>
        ) : (
          <span className="primary-button is-disabled" title="Add your CV file path in site-data.ts">
            PDF coming soon
          </span>
        )}
      </div>
      <CareerSection title="Employment" entries={employment} />
      <CareerSection title="Education" entries={education} />
    </SiteShell>
  );
}
