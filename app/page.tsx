import type { Metadata } from "next";
import { PublicationList } from "./components/PublicationList";
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
        <div>
          <p className="eyebrow">Academic profile</p>
          <h1 id="profile-name" className="profile-name">
            {profile.givenName} <strong>{profile.familyName}</strong>
          </h1>
          <p className="role-line">{profile.role}</p>
        </div>

        <aside className="affiliation-card" aria-label="Current affiliation">
          <span className="ket-mark" aria-hidden="true">|ψ⟩</span>
          <div>
            <strong>{profile.institution}</strong>
            <span>{profile.department}</span>
            <span>{profile.location}</span>
          </div>
        </aside>
      </section>

      <section className="prose intro-copy" aria-label="About">
        <p>
          I am a postdoctoral researcher working in quantum information and
          quantum computation. Replace this opening with your current position,
          institution, research group, and a short description of your academic
          path.
        </p>
        <p>
          My research interests include <span className="accent-text">quantum
          information theory</span>, quantum algorithms, quantum resources, and
          the mathematical structures underlying quantum computation. This
          paragraph is ready for your specific research questions and methods.
        </p>
        <p>
          My papers will be available through <a href="https://arxiv.org/">arXiv</a>
          {" "}and <a href="https://scholar.google.com/">Google Scholar</a>. I can
          also share research software and supporting material through GitHub.
        </p>
        <p>
          Contact: <span className="placeholder-text">{profile.email}</span>
        </p>
      </section>

      <section className="section-block" aria-labelledby="research-interests">
        <div className="section-heading-row">
          <h2 id="research-interests">research interests</h2>
          <span className="section-rule" />
        </div>
        <div className="interest-grid">
          {profile.interests.map((interest, index) => (
            <article className="interest-card" key={interest.title}>
              <span className="interest-index">0{index + 1}</span>
              <h3>{interest.title}</h3>
              <p>{interest.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="selected-publications">
        <div className="section-heading-row">
          <h2 id="selected-publications">selected publications</h2>
          <a className="text-link" href="/publications">view all →</a>
        </div>
        <PublicationList publications={selected} compact />
      </section>
    </SiteShell>
  );
}
