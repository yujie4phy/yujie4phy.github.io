import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { outreach, profile } from "../site-data";

export const metadata: Metadata = { title: `Others — ${profile.givenName} ${profile.familyName}` };

export default function OthersPage() {
  return (
    <SiteShell
      current="others"
      pageTitle="others"
      pageDescription="Public engagement beyond the publication list"
      pageHeadingVariant="compact"
    >
      <section className="cv-section" aria-labelledby="outreach-heading">
        <h2 id="outreach-heading">Outreach</h2>
        <div className="others-grid outreach-grid">
          {outreach.map((item, index) => (
            <article className="feature-panel" key={item.title}>
              <span className="panel-number">0{index + 1} · {item.year}</span>
              <h3><a href={item.href}>{item.title}</a></h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

    </SiteShell>
  );
}
