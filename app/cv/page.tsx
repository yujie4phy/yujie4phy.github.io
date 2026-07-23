import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { awards, CareerEntry, education, employment, profile } from "../site-data";

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
    <SiteShell
      current="cv"
      pageTitle="CV"
      pageDescription="Appointments, education, and selected distinctions"
    >
      <div className="page-intro-action">
        <p>Download the complete CV for research experience, mentorship, outreach, and publications.</p>
        <a className="primary-button" href={profile.cvFile}>Download full CV</a>
      </div>
      <CareerSection title="Employment" entries={employment} />
      <CareerSection title="Education" entries={education} />
      <section className="cv-section" aria-labelledby="awards-heading">
        <h2 id="awards-heading">Awards &amp; Honors</h2>
        <div className="timeline">
          {awards.map((award) => (
            <article className="timeline-entry" key={`${award.year}-${award.title}`}>
              <div className="timeline-date">{award.year}</div>
              <div>
                <h3>
                  {award.href ? <a href={award.href}>{award.title}</a> : award.title}
                </h3>
                <p>{award.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
