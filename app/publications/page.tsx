import type { Metadata } from "next";
import publicationsPage from "../../content/publications-page.json";
import { PublicationList } from "../components/PublicationList";
import { RichText } from "../components/RichText";
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
      pageDescription={publicationsPage.pageDescription}
      pageHeadingVariant="compact"
    >
      <div className="page-lead">
        {publicationsPage.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
      {years.map((year) => (
        <section className="year-section" key={year} aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`}>{year}</h2>
          <PublicationList publications={publications.filter((publication) => publication.year === year)} />
        </section>
      ))}
    </SiteShell>
  );
}
