import { ReactNode } from "react";
import { profile } from "../site-data";
import { ThemeToggle } from "./ThemeToggle";

type Section = "about" | "cv" | "others" | "publications" | "talks";

const navigation: { label: string; href: string; id: Section }[] = [
  { label: "about", href: "/", id: "about" },
  { label: "CV", href: "/cv", id: "cv" },
  { label: "others", href: "/others", id: "others" },
  { label: "publications", href: "/publications", id: "publications" },
  { label: "talks", href: "/talks", id: "talks" },
];

export function SiteShell({
  children,
  current,
  pageTitle,
  pageDescription,
}: {
  children: ReactNode;
  current: Section;
  pageTitle?: string;
  pageDescription?: string;
}) {
  return (
    <div className="site-frame">
      <header className="site-header">
        <div className="header-inner">
          <div className="profile-links" aria-label="Academic profiles">
            {profile.links.map((link) =>
              link.href ? (
                <a
                  className="profile-link"
                  href={link.href}
                  key={link.label}
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.shortLabel}
                </a>
              ) : (
                <span
                  className="profile-link is-placeholder"
                  key={link.label}
                  aria-label={`${link.label} link not added yet`}
                  title={`Add your ${link.label} link in site-data.ts`}
                >
                  {link.shortLabel}
                </span>
              ),
            )}
          </div>

          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                className={item.id === current ? "active" : undefined}
                href={item.href}
                key={item.id}
                aria-current={item.id === current ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="site-main">
        {pageTitle ? (
          <header className="page-heading">
            <a className="name-link" href="/">
              {profile.givenName} {profile.familyName}
            </a>
            <h1>{pageTitle}</h1>
            {pageDescription ? <p>{pageDescription}</p> : null}
          </header>
        ) : null}
        {children}
      </main>

      <footer className="site-footer">
        <div>
          <span>{profile.givenName} {profile.familyName}</span>
          <span>Quantum information</span>
        </div>
        <p>Built for free hosting · Last updated {profile.lastUpdated}</p>
      </footer>
    </div>
  );
}
