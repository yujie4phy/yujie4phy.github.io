import type { Metadata } from "next";
import Link from "next/link";
import about from "../content/about.json";
import { PublicationList } from "./components/PublicationList";
import { RichText } from "./components/RichText";
import { SiteShell } from "./components/SiteShell";
import { profile, publications } from "./site-data";

export const metadata: Metadata = {
  title: `${profile.givenName} ${profile.familyName} — Quantum Information`,
  description: `Research profile, publications, talks, and CV for ${profile.givenName} ${profile.familyName}.`,
};

export default function Home() {
  const selected = publications.filter((publication) => publication.selected);

  return (
    <SiteShell current="about">
      <section className="home-heading" aria-labelledby="profile-name">
        <h1 id="profile-name" className="profile-name">
          {profile.givenName} <strong>{profile.familyName}</strong>
        </h1>
      </section>

      <section className="home-intro-grid" aria-label="About">
        <div className="prose intro-copy">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>

        <aside className="profile-portrait" aria-label={`Portrait of ${profile.givenName} ${profile.familyName}`}>
          {/* A plain image URL is used so the portrait works on the deployed site. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="profile-photo"
            src="/yujie-zhang.jpg"
            alt={`Portrait of ${profile.givenName} ${profile.familyName}`}
            width="175"
            height="233"
          />
          <span className="profile-location">{profile.location}</span>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="selected-publications">
        <div className="section-heading-row">
          <h2 id="selected-publications">selected publications</h2>
          <Link className="text-link" href="/publications">view all →</Link>
        </div>
        <PublicationList publications={selected} compact />
      </section>
    </SiteShell>
  );
}
