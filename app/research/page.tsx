import type { Metadata } from "next";
import research from "../../content/research.json";
import { RichText } from "../components/RichText";
import { SiteShell } from "../components/SiteShell";
import { profile } from "../site-data";

export const metadata: Metadata = {
  title: `Research — ${profile.givenName} ${profile.familyName}`,
  description:
    "Research in operational quantum nonclassicality, optical quantum information processing, quantum networks, and AI-assisted quantum science.",
};

type ResearchPaper = {
  title: string;
  href: string;
  note: string;
};

type ResearchFigure = {
  src: string;
  alt: string;
  caption: string;
  href: string;
  width: number;
  height: number;
  wide: boolean;
};

function PaperList({ papers }: { papers: ResearchPaper[] }) {
  if (!papers.length) return null;

  return (
    <ul className="research-papers">
      {papers.map((paper) => (
        <li key={`${paper.title}-${paper.href}`}>
          <a href={paper.href}>{paper.title}</a>
          <span>{paper.note}</span>
        </li>
      ))}
    </ul>
  );
}

function FigureGallery({ figures }: { figures: ResearchFigure[] }) {
  if (!figures.length) return null;

  return (
    <div className="research-figures" aria-label="Research illustrations">
      {figures.map((figure) => (
        <figure
          className={`research-figure${figure.wide ? " wide" : ""}`}
          key={figure.src}
        >
          <a
            className="research-figure-image-link"
            href={figure.href}
            aria-label={`${figure.caption} View the related paper`}
          >
            <img
              src={figure.src}
              alt={figure.alt}
              width={figure.width}
              height={figure.height}
              loading="lazy"
            />
          </a>
          <figcaption>
            {figure.caption} <a href={figure.href}>View paper ↗</a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>
          <RichText text={paragraph} />
        </p>
      ))}
    </>
  );
}

export default function ResearchPage() {
  return (
    <SiteShell
      current="research"
      pageTitle="research"
      pageDescription={research.pageDescription}
      pageHeadingVariant="compact"
    >
      <section className="research-overview" aria-labelledby="research-overview">
        <h2 id="research-overview">{research.overview.title}</h2>
        <Paragraphs paragraphs={research.overview.paragraphs} />
        <ul className="research-topic-list">
          {research.overview.topics.map((topic) => (
            <li key={topic}>
              <RichText text={topic} />
            </li>
          ))}
        </ul>
      </section>

      {research.themes.map((theme) => (
        <section
          className="research-theme"
          aria-labelledby={theme.id}
          key={theme.id}
        >
          <header className="research-theme-heading">
            <h2 id={theme.id}>{theme.title}</h2>
          </header>

          <div className="research-copy">
            <Paragraphs paragraphs={theme.paragraphs} />
          </div>

          <FigureGallery figures={theme.figures} />

          {theme.papers.length ? (
            <>
              <h3 className="related-work-heading">{theme.papersHeading}</h3>
              <PaperList papers={theme.papers} />
            </>
          ) : null}

          {theme.subthemes.map((subtheme) => (
            <div className="research-subtheme" key={subtheme.title}>
              <h3>{subtheme.title}</h3>
              <Paragraphs paragraphs={subtheme.paragraphs} />
              <PaperList papers={subtheme.papers} />
            </div>
          ))}
        </section>
      ))}
    </SiteShell>
  );
}
