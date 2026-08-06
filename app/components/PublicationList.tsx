import { profile, type Publication } from "../site-data";

const selfAuthorName = `${profile.givenName} ${profile.familyName}`;
const selfAuthorAliases = [selfAuthorName, `Y. ${profile.familyName}`];

function highlightSelfAuthor(authors: string) {
  return authors.split(/(Yujie Zhang|Y\. Zhang)/g).map((part, index) =>
    selfAuthorAliases.includes(part) ? (
      <strong className="self-author" key={`${part}-${index}`}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function PublicationList({
  publications,
  compact = false,
  numbered = false,
  startNumber = 1,
  numberDirection = "ascending",
}: {
  publications: Publication[];
  compact?: boolean;
  numbered?: boolean;
  startNumber?: number;
  numberDirection?: "ascending" | "descending";
}) {
  const className = [
    "publication-list",
    compact ? "compact" : "",
    numbered ? "numbered" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {publications.map((publication, index) => {
        const publicationNumber =
          startNumber + (numberDirection === "descending" ? -index : index);

        return (
          <article className="publication" key={`${publication.year}-${publication.title}`}>
            <div className="venue-column">
              {numbered ? (
                <span
                  className="publication-number"
                  aria-label={`Publication ${publicationNumber}`}
                >
                  [{publicationNumber}]
                </span>
              ) : null}
              <span className="venue-tag">{publication.venue}</span>
              <span className="publication-year">{publication.year}</span>
            </div>
            <div className="publication-content">
              <h3>{publication.title}</h3>
              <p className="authors">{highlightSelfAuthor(publication.authors)}</p>
              <p className="citation">{publication.citation}</p>
              <div className="paper-actions">
                <details>
                  <summary>Abstract</summary>
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
        );
      })}
    </div>
  );
}
