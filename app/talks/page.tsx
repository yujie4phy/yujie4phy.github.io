import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { profile, talks } from "../site-data";

export const metadata: Metadata = { title: `Talks — ${profile.givenName} ${profile.familyName}` };

export default function TalksPage() {
  return (
    <SiteShell
      current="talks"
      pageTitle="talks"
      pageDescription="Selected presentations, seminars, and conference talks"
    >
      <p className="page-lead">
        Selected conference and seminar presentations. Slides are available
        for the talks marked below.
      </p>
      <div className="talks-table" role="table" aria-label="Selected talks">
        <div className="talk-row talk-header" role="row">
          <span role="columnheader">Date</span>
          <span role="columnheader">Talk</span>
        </div>
        {talks.map((talk) => (
          <article className="talk-row" role="row" key={`${talk.date}-${talk.title}`}>
            <span className="talk-date" role="cell">{talk.date}</span>
            <div role="cell">
              <h2>{talk.title}</h2>
              <p>{talk.event}</p>
              <div className="talk-actions">
                {talk.links.map((link) =>
                  link.href ? (
                    <a
                      href={link.href}
                      key={link.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <span className="paper-link is-disabled" key={link.label}>{link.label}</span>
                  ),
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
