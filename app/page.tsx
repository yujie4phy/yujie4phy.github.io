import type { Metadata } from "next";
import Link from "next/link";
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
          I am a postdoctoral fellow at the{" "}
          <a href="https://uwaterloo.ca/institute-for-quantum-computing/">
            Institute for Quantum Computing
          </a>{" "}
          at the University of Waterloo and the{" "}
          <a href="https://perimeterinstitute.ca/">Perimeter Institute for Theoretical Physics</a>.
          I received my PhD in Physics from the University of Illinois at
          Urbana–Champaign and my BSc in Physics from Nanjing University.
        </p>
        <p>
          My research brings together <span className="accent-text">quantum foundations</span>,
          quantum information theory, and quantum optics. I study operational
          notions of nonclassicality and entanglement certification, while also
          developing practical protocols for higher-dimensional quantum networks
          and distributed quantum metrology.
        </p>
        <p>
          My current work includes generalized contextuality, frequency-bin
          quantum systems, quantum-enhanced long-baseline imaging, and
          astronomical interferometry. Publications and preprints are available
          through <a href="https://arxiv.org/a/zhang_y_54.html">arXiv</a> and{" "}
          <a href="https://scholar.google.com/citations?user=nbA1QlUAAAAJ&hl=en">
            Google Scholar
          </a>.
        </p>
        <p>
          Contact: <a href={`mailto:${profile.email}`}>{profile.email}</a>
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
          <Link className="text-link" href="/publications">view all →</Link>
        </div>
        <PublicationList publications={selected} compact />
      </section>
    </SiteShell>
  );
}
