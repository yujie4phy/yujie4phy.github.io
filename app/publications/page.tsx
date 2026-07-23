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
        Papers and preprints in reverse chronological order. See also{" "}
        <a href="https://arxiv.org/a/zhang_y_54.html">arXiv</a> and{" "}
        <a href="https://scholar.google.com/citations?user=nbA1QlUAAAAJ&hl=en">
          Google Scholar
        </a>. An asterisk marks co-first authorship.
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
