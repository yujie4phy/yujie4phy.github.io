import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { mentorship, outreach, profile } from "../site-data";

export const metadata: Metadata = { title: `Others — ${profile.givenName} ${profile.familyName}` };

export default function OthersPage() {
  return (
    <SiteShell
      current="others"
      pageTitle="others"
      pageDescription="Mentorship and public engagement beyond the publication list"
    >
      <section className="cv-section" aria-labelledby="outreach-heading">
        <h2 id="outreach-heading">Outreach</h2>
        <div className="others-grid outreach-grid">
          {outreach.map((item, index) => (
            <article className="feature-panel" key={item.title}>
              <span className="panel-number">0{index + 1} · {item.year}</span>
              <h3><a href={item.href}>{item.title}</a></h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section mentorship-section" aria-labelledby="mentorship-heading">
        <h2 id="mentorship-heading">Mentorship</h2>
        <p className="section-note">
          Research mentorship across the University of Waterloo, Perimeter Institute,
          and the University of Illinois Urbana–Champaign.
        </p>
        <div className="mentorship-list">
          {mentorship.map((entry) => (
            <article className="mentorship-entry" key={`${entry.name}-${entry.dates}`}>
              <span className="timeline-date">{entry.dates}</span>
              <div>
                <h3>{entry.name}</h3>
                <p className="mentorship-meta">{entry.level} · {entry.institution}</p>
                <p>{entry.project}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
