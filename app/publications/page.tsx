import type { Metadata } from "next";
import { PublicationList } from "../components/PublicationList";
import { SiteShell } from "../components/SiteShell";
import { profile, publications } from "../site-data";

export const metadata: Metadata = {
  title: `Publications — ${profile.givenName} ${profile.familyName}`,
};

export default function PublicationsPage() {
  const years = Array.from(new Set(publications.map((publication) => publication.year))).sort(
    (a, b) => b - a,
  );

  return (
    <SiteShell
      current="publications"
      pageTitle="publications"
      pageDescription="Publications in reverse chronological order"
    >
      <p className="page-lead">
        All papers can link to arXiv and Google Scholar. Published versions,
        local PDFs, code, slides, and videos can be attached to each entry.
      </p>
      {years.map((year) => (
        <section className="year-section" key={year} aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`}>{year}</h2>
          <PublicationList publications={publications.filter((publication) => publication.year === year)} />
        </section>
      ))}
    </SiteShell>
  );
}
