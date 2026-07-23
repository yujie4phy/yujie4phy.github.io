import { Publication } from "../site-data";

export function PublicationList({
  publications,
  compact = false,
}: {
  publications: Publication[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "publication-list compact" : "publication-list"}>
      {publications.map((publication) => (
        <article className="publication" key={`${publication.year}-${publication.title}`}>
          <div className="venue-column">
            <span className="venue-tag">{publication.venue}</span>
            <span className="publication-year">{publication.year}</span>
          </div>
          <div className="publication-content">
            <h3>{publication.title}</h3>
            <p className="authors">{publication.authors}</p>
            <p className="citation">{publication.citation}</p>
            <div className="paper-actions">
              <details>
                <summary>Abs</summary>
                <p>{publication.abstract}</p>
              </details>
              {publication.links.map((link) =>
                link.href ? (
                  <a href={link.href} key={link.label}>{link.label}</a>
                ) : (
                  <span
                    className="paper-link is-disabled"
                    title={`Add the ${link.label} URL in site-data.ts`}
                    key={link.label}
                  >
                    {link.label}
                  </span>
                ),
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
