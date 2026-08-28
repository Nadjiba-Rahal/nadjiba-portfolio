import Link from "next/link";
import { SiteLanguage } from "../components/site-language";
import CvViewer from "./cv-viewer";

export const metadata = { title: "CV / Nadjiba Rahal" };

export default function CvPage() {
  return (
    <main className="cv-page">
      <nav className="case-nav"><Link href="/" className="nav-mark"><span className="dot" style={{ backgroundImage: "url('/nadjiba-logo.png')" }} /> NADJIBA RAHAL</Link><SiteLanguage /><Link href="/#work" className="case-back">Back to portfolio <span>↗</span></Link></nav>
      <div className="wrap cv-wrap">
        <p className="eyebrow">Curriculum vitae</p>
        <h1>The person<br /><em>behind the systems.</em></h1>
        <p className="cv-intro">Choose a version, then keep exploring the work that gives the words context.</p>
        <CvViewer />
      </div>
    </main>
  );
}
