import Link from "next/link";
import { SiteLanguage } from "../components/site-language";

export const metadata = { title: "CV / Nadjiba Rahal" };

export default function CvPage() {
  return (
    <main className="cv-page">
      <nav className="case-nav"><Link href="/" className="nav-mark"><span className="dot" style={{ backgroundImage: "url('/nadjiba-logo.png')" }} /> NADJIBA RAHAL</Link><SiteLanguage /><Link href="/#work" className="case-back">Back to portfolio <span>↗</span></Link></nav>
      <div className="wrap cv-wrap">
        <p className="eyebrow">Curriculum vitae</p>
        <h1>The person<br /><em>behind the systems.</em></h1>
        <p className="cv-intro">Choose a version, then keep exploring the work that gives the words context.</p>
        <div className="cv-options">
          <a className="cv-card" href="/cv-nadjiba-rahal-en.pdf" target="_blank" rel="noreferrer"><span>EN / 01</span><strong>English CV</strong><small>Open PDF ↗</small></a>
          <a className="cv-card" href="/cv-nadjiba-rahal-fr.pdf" target="_blank" rel="noreferrer"><span>FR / 02</span><strong>CV français</strong><small>Ouvrir le PDF ↗</small></a>
        </div>
        <div className="cv-previews">
          <section className="cv-preview" aria-labelledby="cv-english-preview">
            <h2 id="cv-english-preview">English CV</h2>
            <iframe src="/cv-nadjiba-rahal-en.pdf" title="English CV preview" />
          </section>
          <section className="cv-preview" aria-labelledby="cv-french-preview">
            <h2 id="cv-french-preview">CV français</h2>
            <iframe src="/cv-nadjiba-rahal-fr.pdf" title="French CV preview" />
          </section>
        </div>
      </div>
    </main>
  );
}
