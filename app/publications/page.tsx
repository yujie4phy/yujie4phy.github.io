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
  const publicationsByYear = years.map((year) => ({
    year,
    publications: publications.filter((publication) => publication.year === year),
  }));
  const yearSections = publicationsByYear.map((section, index) => ({
    ...section,
    startNumber: publicationsByYear
      .slice(index)
      .reduce((total, yearSection) => total + yearSection.publications.length, 0),
  }));

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
      {yearSections.map((section) => (
        <section
          className="year-section"
          key={section.year}
          aria-labelledby={`year-${section.year}`}
        >
          <h2 id={`year-${section.year}`}>{section.year}</h2>
          <PublicationList
            publications={section.publications}
            numbered
            startNumber={section.startNumber}
            numberDirection="descending"
          />
        </section>
      ))}
    </SiteShell>
  );
}
