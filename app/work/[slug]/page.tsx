import Link from "next/link";
import { notFound } from "next/navigation";

type CaseStudy = {
  title: string;
  label: string;
  role: string;
  year: string;
  image: string;
  summary: string;
  impact: string;
  stack: string[];
  details: string[];
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  bellevue: {
    title: "BELLEVUE",
    label: "PRODUCT / SOLO BUILD",
    role: "Medical clinic management platform",
    year: "2026",
    image: "/projects/bellevue-dashboard.webp",
    summary: "A complete medical cabinet experience: public booking on the front, real operations behind it.",
    impact: "The goal was not another brochure site. Bellevue connects patient appointments, opening hours, authentication and administration in one calm workflow.",
    stack: ["Next.js", "Server Actions", "PostgreSQL / Neon", "Auth"],
    details: ["Appointment booking", "Real-time availability", "Admin dashboard", "Configurable opening hours", "Settings and authentication"],
  },
  ishara: {
    title: "ISHARA",
    label: "PRODUCT / AI R&D",
    role: "Algerian Sign Language translation",
    year: "2025",
    image: "/projects/ishara.webp",
    summary: "An AI-powered translation experience that turns recognized signs into animated Algerian Sign Language output.",
    impact: "The product crosses computer vision, language representation and avatar animation to make a difficult interaction feel immediate.",
    stack: ["MediaPipe", "ONNX", "HamNoSys", "SiGML", "CWASA"],
    details: ["Sign recognition", "3D avatar output", "Hundreds of dictionary words", "Real-time processing"],
  },
  dpi: {
    title: "DPI",
    label: "PRODUCT",
    role: "Digital patient record system",
    year: "2024",
    image: "/projects/digital-patient-record.webp",
    summary: "A structured digital patient record application for information that needs to stay coherent.",
    impact: "Patients, appointments, prescriptions and exam results are organized around the people using them, not around disconnected screens.",
    stack: ["Full-stack web", "Structured data", "Patient records"],
    details: ["Patient profiles", "Appointment history", "Prescription tracking", "Exam result records"],
  },
  powerbi: {
    title: "DASHBOARDS & BI",
    label: "PRODUCT / DATA",
    role: "Analytics and business intelligence",
    year: "2024",
    image: "/projects/dashboards-bi.webp",
    summary: "Dashboard work designed for decisions, with the cleaning and KPI logic underneath the visual layer.",
    impact: "The valuable part is not the chart. It is making messy operational data readable enough to change what happens next.",
    stack: ["Power BI", "KPIs", "Data cleaning", "Visualization"],
    details: ["Data preparation", "KPI definition", "Decision-focused layouts", "Reporting workflows"],
  },
  jobagent: {
    title: "JOB INTELLIGENCE AGENT",
    label: "PRODUCT / AI AGENT",
    role: "AI-powered job discovery for Algeria",
    year: "2025",
    image: "/projects/job-intelligence-agent.webp",
    summary: "A pipeline that scrapes, reads and ranks job posts, then sends useful signals instead of noise.",
    impact: "OCR, semantic search, scam detection and Telegram alerts work together as one focused job discovery product.",
    stack: ["Playwright", "EasyOCR", "Embeddings", "PostgreSQL", "Telegram"],
    details: ["Source scraping", "OCR extraction", "Semantic matching", "Scam detection", "Telegram alerts"],
  },
  nas: {
    title: "HARDWARE-AWARE NAS",
    label: "RESEARCH",
    role: "Multi-objective neural architecture search",
    year: "2025",
    image: "/projects/hardware-aware-nas.webp",
    summary: "Research on finding image-classification architectures that balance accuracy and latency.",
    impact: "The work treats deployment constraints as part of the model problem, tracking candidate architectures through Pareto fronts and hypervolume.",
    stack: ["NAS", "Pareto front", "Hypervolume", "CNNs"],
    details: ["Thousands of candidate CNNs", "Accuracy and latency objectives", "Pareto-front tracking", "Hardware-aware evaluation"],
  },
  medvlm: {
    title: "MEDICAL VISION-LANGUAGE",
    label: "RESEARCH",
    role: "Domain and language shift in medical VLMs",
    year: "2025",
    image: "/projects/medical-vlm.webp",
    summary: "Research evaluating how medical vision-language models behave under domain and language changes.",
    impact: "The focus is reliability: understanding what shifts when a model leaves the conditions it was trained to expect.",
    stack: ["Vision-Language", "Chest X-rays", "Segmentation", "Evaluation"],
    details: ["Chest X-ray evaluation", "Segmentation conditions", "Domain-shift analysis", "Language-shift analysis"],
  },
};

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];

  if (!project) notFound();

  return (
    <main className="case-study">
      <nav className="case-nav">
        <Link href="/" className="nav-mark"><span className="dot" /> NADJIBA</Link>
        <Link href="/#work" className="case-back">Back to work <span>↗</span></Link>
      </nav>

      <div className="wrap case-wrap">
        <header className="case-header">
          <p className="eyebrow">{project.label}</p>
          <p className="case-year">{project.year}</p>
          <h1>{project.title}</h1>
          <p className="case-role">{project.role}</p>
        </header>

        <div className="case-visual" style={{ backgroundImage: `url('${project.image}')` }} role="img" aria-label={`${project.title} preview`} />

        <section className="case-grid" aria-label="Project details">
          <div>
            <p className="eyebrow">The brief</p>
            <h2>{project.summary}</h2>
          </div>
          <div className="case-copy">
            <p>{project.impact}</p>
            <ul className="case-details">
              {project.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </div>
        </section>

        <section className="case-stack">
          <p className="eyebrow">Built with</p>
          <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <Link href="/#work" className="case-next">See more work <span>→</span></Link>
      </div>
    </main>
  );
}
