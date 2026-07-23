import Link from "next/link";
import { ReactNode } from "react";
import { FaEnvelope, FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiArxiv, SiGooglescholar, SiOrcid } from "react-icons/si";
import { profile } from "../site-data";
import { ThemeToggle } from "./ThemeToggle";

type Section = "about" | "cv" | "others" | "publications" | "research" | "talks";

const navigation: { label: string; href: string; id: Section }[] = [
  { label: "about", href: "/", id: "about" },
  { label: "publications", href: "/publications", id: "publications" },
  { label: "research", href: "/research", id: "research" },
  { label: "talks", href: "/talks", id: "talks" },
  { label: "others", href: "/others", id: "others" },
  { label: "CV", href: "/cv", id: "cv" },
];

const profileIcons = {
  email: FaEnvelope,
  scholar: SiGooglescholar,
  orcid: SiOrcid,
  arxiv: SiArxiv,
  twitter: FaXTwitter,
  github: FaGithub,
};

export function SiteShell({
  children,
  current,
  pageTitle,
  pageDescription,
  pageTitleAction,
  pageHeadingVariant = "default",
}: {
  children: ReactNode;
  current: Section;
  pageTitle?: string;
  pageDescription?: string;
  pageTitleAction?: ReactNode;
  pageHeadingVariant?: "default" | "compact";
}) {
  return (
    <div className="site-frame">
      <header className="site-header">
        <div className="header-inner">
          <div className="profile-links" aria-label="Academic profiles">
            {profile.links.map((link) => {
              const Icon = profileIcons[link.icon];

              return link.href ? (
                <a
                  className="profile-link"
                  href={link.href}
                  key={link.label}
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon aria-hidden="true" />
                </a>
              ) : (
                <span
                  className="profile-link is-placeholder"
                  key={link.label}
                  aria-label={`${link.label} link not added yet`}
                  title={`${link.label} profile link needed`}
                >
                  <Icon aria-hidden="true" />
                </span>
              );
            })}
          </div>

          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                className={item.id === current ? "active" : undefined}
                href={item.href}
                key={item.id}
                aria-current={item.id === current ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="site-main">
        {pageTitle ? (
          <header className={`page-heading ${pageHeadingVariant}`}>
            <Link className="name-link" href="/">
              {profile.givenName} {profile.familyName}
            </Link>
            {pageTitleAction ? (
              <div className="page-title-row">
                <h1>{pageTitle}</h1>
                {pageTitleAction}
              </div>
            ) : (
              <h1>{pageTitle}</h1>
            )}
            {pageDescription ? <p>{pageDescription}</p> : null}
          </header>
        ) : null}
        {children}
      </main>

      <footer className="site-footer">
        <div>
          <span>{profile.givenName} {profile.familyName}</span>
          <span>Quantum information, foundations and optics</span>
        </div>
        <p>Last updated {profile.lastUpdated}</p>
      </footer>
    </div>
  );
}
