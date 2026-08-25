import Link from "next/link";

export const metadata = { title: "CV / Nadjiba Rahal" };

export default function CvPage() {
  return (
    <main className="cv-page">
      <nav className="case-nav"><Link href="/" className="nav-mark"><span className="dot" style={{ backgroundImage: "url('/nadjiba-logo.png')" }} /> NADJIBA</Link><Link href="/#work" className="case-back">Back to portfolio <span>↗</span></Link></nav>
      <div className="wrap cv-wrap">
        <p className="eyebrow">Curriculum vitae</p>
        <h1>The person<br /><em>behind the systems.</em></h1>
        <p className="cv-intro">Choose a version, then keep exploring the work that gives the words context.</p>
        <div className="cv-options">
          <a className="cv-card" href="/cv-nadjiba-rahal-en.pdf" target="_blank" rel="noreferrer"><span>EN / 01</span><strong>English CV</strong><small>Open PDF ↗</small></a>
          <a className="cv-card" href="/cv-nadjiba-rahal-fr.pdf" target="_blank" rel="noreferrer"><span>FR / 02</span><strong>CV français</strong><small>Ouvrir le PDF ↗</small></a>
        </div>
        <p className="cv-missing">Place your files in <strong>public/cv-nadjiba-rahal-en.pdf</strong> and <strong>public/cv-nadjiba-rahal-fr.pdf</strong>.</p>
      </div>
    </main>
  );
}
