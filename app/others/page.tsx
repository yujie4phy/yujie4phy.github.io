import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { profile } from "../site-data";

export const metadata: Metadata = { title: `Others — ${profile.givenName} ${profile.familyName}` };

export default function OthersPage() {
  return (
    <SiteShell
      current="others"
      pageTitle="others"
      pageDescription="Interests and activities beyond the publication list"
    >
      <div className="others-grid">
        <article className="feature-panel">
          <span className="panel-number">01</span>
          <h2>Beyond research</h2>
          <p>
            Marco uses this page for music. Replace this text with the interests
            you would like colleagues and visitors to know about—music, art,
            outreach, languages, sport, or something entirely different.
          </p>
        </article>
        <article className="feature-panel">
          <span className="panel-number">02</span>
          <h2>Notes & resources</h2>
          <p>
            This space can collect lecture notes, useful references, software,
            recorded explanations, or informal writing related to your work.
          </p>
        </article>
        <article className="feature-panel">
          <span className="panel-number">03</span>
          <h2>Academic service</h2>
          <p>
            Optionally list conference organization, reviewing, community work,
            mentoring, or public engagement without creating a Teaching page.
          </p>
        </article>
      </div>
    </SiteShell>
  );
}
