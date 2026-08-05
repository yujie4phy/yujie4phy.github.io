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
  let nextPublicationNumber = 1;
  const yearSections = years.map((year) => {
    const yearPublications = publications.filter(
      (publication) => publication.year === year,
    );
    const startNumber = nextPublicationNumber;
    nextPublicationNumber += yearPublications.length;

    return { year, publications: yearPublications, startNumber };
  });

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
          />
        </section>
      ))}
    </SiteShell>
  );
}
