"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react";

/* ============================================================================
   DATA
  Edit the content below directly. This file keeps
   everything in one place so it's easy to update.
   ============================================================================ */

const LINKS = {
  email: "mailto:rahalnadjiba5@gmail.com",
  phone: "tel:+213540276848",
  github: "https://github.com/Nadjiba-Rahal",
  linkedin: "https://linkedin.com/in/nadjiba-rahal",
};

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "#contact" },
];

const ABOUT_CELLS = [
  {
    n: "01",
    title: "AI",
    body: "ML, computer vision and NLP for real problems.",
  },
  {
    n: "02",
    title: "SOFTWARE",
    body: "Full-stack web, backend and mobile products.",
  },
  {
    n: "03",
    title: "DATA",
    body: "Dashboards and data products for better decisions.",
  },
  {
    n: "04",
    title: "AUTOMATION",
    body: "AI workflows that remove repetitive work.",
  },
];

type ProjectVariant = "window" | "nodes" | "pareto" | "scan" | "record" | "bars" | "pipeline";
type ProjectKind = "product" | "research" | "data";

type Project = {
  id: string;
  kicker: string;
  title: string;
  role: string;
  blurb: string;
  stack: string[];
  variant: ProjectVariant;
  image: string;
  kind: ProjectKind;
  year: string;
  impact: string;
};

const FEATURED_PROJECT: Project = {
  id: "bellevue",
  kicker: "PRODUCT / SOLO BUILD",
  title: "BELLEVUE",
  role: "Medical clinic management platform",
  blurb:
    "A full-stack medical cabinet system. Public booking, real-time availability and a private admin dashboard.",
  stack: ["Next.js", "Server Actions", "PostgreSQL / Neon", "Auth"],
  variant: "window",
  image: "/projects/cabinet-medical.png",
  kind: "product",
  year: "2026",
  impact: "A complete clinic workflow, from public booking to private operations.",
};

const FEATURED_FEATURES = [
  "Appointment booking",
  "Real-time availability",
  "Admin dashboard",
  "Appointment management",
  "Configurable opening hours",
  "Settings & auth",
];

const PROJECTS: Project[] = [
  {
    id: "ishara",
    kicker: "PRODUCT / AI PLATFORM",
    title: "ISHARA",
    role: "Algerian Sign Language translation",
    blurb: "A full-stack Algerian Sign Language recognition and translation platform: camera input, landmark extraction, ONNX inference, sign labels and a 3D avatar.",
    stack: [".NET 10", "ASP.NET Core", "Next.js", "Three.js", "React Native", "PyTorch", "ONNX"],
    variant: "nodes",
    image: "/projects/ishara.png",
    kind: "product",
    year: "2025",
    impact: "Making Algerian Sign Language more visible, searchable and usable.",
  },
  {
    id: "video-assistant",
    kicker: "PRODUCT / AGENT",
    title: "AGENTIC VIDEO ASSISTANT",
    role: "Idea-to-video AI agent",
    blurb: "An AI agent that researches when needed, improves a prompt, calls a video-generation API, monitors the async job and downloads the result.",
    stack: ["Python", "smolagents", "Gradio", "DuckDuckGo", "Pytest", "Docker"],
    variant: "pipeline",
    image: "/projects/agentic-video-assistant.webp",
    kind: "product",
    year: "2025",
    impact: "Turning one rough idea into a researched, generated and delivered video.",
  },
  {
    id: "enterprise-rag",
    kicker: "PRODUCT / RAG",
    title: "ENTERPRISE RAG ENGINE",
    role: "Multilingual document question-answering",
    blurb: "A PDF question-answering system with local parsing, chunking and embeddings, hybrid retrieval, grounded LLM answers and citations in English, French and Arabic.",
    stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Sentence Transformers", "Groq Llama-3"],
    variant: "window",
    image: "/projects/enterprise-rag.webp",
    kind: "product",
    year: "2025",
    impact: "Making a multilingual document archive answerable, with evidence attached.",
  },
  {
    id: "ecommerce",
    kicker: "PRODUCT / COMMERCE",
    title: "ENTERPRISE E-COMMERCE",
    role: "Single-tenant white-label commerce platform",
    blurb: "A customizable storefront and commerce infrastructure built for cash-on-delivery businesses and deployment as an individual store.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB Atlas", "Cloudinary", "Vercel"],
    variant: "window",
    image: "/projects/e-commerce.png",
    kind: "product",
    year: "2025",
    impact: "Giving a COD business a storefront it can actually shape around its operation.",
  },
  {
    id: "commerce-intelligence",
    kicker: "PRODUCT / REAL-TIME DATA",
    title: "COMMERCE INTELLIGENCE",
    role: "Real-time event streaming and analytics",
    blurb: "A live commerce telemetry engine that simulates activity, processes events asynchronously, evaluates fraud risk and displays business signals.",
    stack: ["Python", "asyncio.Queue", "DuckDB", "Streamlit", "Poisson", "Markov"],
    variant: "bars",
    image: "/projects/commerce-fraud.png",
    kind: "product",
    year: "2025",
    impact: "Turning simulated transaction streams into a live operational picture.",
  },
  {
    id: "sentiment-bert",
    kicker: "ML PIPELINE",
    title: "SENTIMENT ANALYSIS WITH BERT",
    role: "End-to-end NLP classification",
    blurb: "A complete sentiment pipeline: normalization, WordPiece tokenization, contextual BERT embeddings and positive/negative classification.",
    stack: ["Python", "BERT", "Transformers", "WordPiece", "PyTorch", "NLP"],
    variant: "nodes",
    image: "",
    kind: "product",
    year: "2024",
    impact: "A readable, reproducible path from raw text to a measured prediction.",
  },
];

const SERVICES = [
  {
    n: "01",
    title: "AI INTEGRATION",
    body: "Integrate AI into existing products and workflows.",
    examples: ["LLM integration", "AI assistants", "Document processing", "NLP", "Computer vision", "Intelligent search"],
  },
  {
    n: "02",
    title: "WEB & SOFTWARE",
    body: "Build modern full-stack web applications.",
    examples: ["Next.js", "React", "TypeScript", "Python", "Django", ".NET", "PostgreSQL"],
  },
  {
    n: "03",
    title: "AUTOMATION",
    body: "Automate repetitive workflows and business processes.",
    examples: ["Data collection", "Scraping", "Document processing", "Notifications", "AI pipelines"],
  },
  {
    n: "04",
    title: "DATA & DASHBOARDS",
    body: "Build dashboards and data products.",
    examples: ["Power BI", "Analytics dashboards", "Data visualization", "Reporting", "KPI systems"],
  },
  {
    n: "05",
    title: "AI / DATA SYSTEMS",
    body: "Machine learning and data science solutions.",
    examples: ["Classification", "Computer vision", "NLP", "Model evaluation", "Data processing"],
  },
  {
    n: "06",
    title: "MOBILE / DIGITAL PRODUCTS",
    body: "Modern mobile and digital applications.",
    examples: ["Cross-platform apps", "AI-powered features", "Product UI"],
  },
];

const STACK_ROW_1 = [
  "Python",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Django",
  ".NET",
  "PostgreSQL",
  "SQL",
  "Docker",
  "Git",
  "GitHub",
];
const STACK_ROW_2 = [
  "PyTorch",
  "ONNX",
  "MediaPipe",
  "Power BI",
  "Machine Learning",
  "Computer Vision",
  "NLP",
  "Data Science",
  "AI Agents",
  "Automation",
];

const CREDIBILITY = [
  { org: "SONATRACH", role: "Data Science internship", desc: "Power BI, dashboards & data work." },
  { org: "SONELGAZ", role: "Software / information systems", desc: "Practical, applied software work." },
  { org: "ESI ALGIERS", role: "AI & Software Engineering", desc: "École Supérieure d'Informatique, Algiers." },
  { org: "RESEARCH", role: "Applied AI research projects", desc: "NAS, medical vision-language, sign language AI." },
];

const PROCESS = [
  { n: "01", title: "DISCOVER", body: "Understand the problem." },
  { n: "02", title: "DESIGN", body: "Turn the idea into a system." },
  { n: "03", title: "BUILD", body: "Develop the product." },
  { n: "04", title: "INTEGRATE", body: "Connect AI, data and automation." },
  { n: "05", title: "DELIVER", body: "Deploy a usable solution." },
  { n: "06", title: "ITERATE", body: "Improve based on feedback." },
];

const UI_COPY = {
  en: {
    nav: ["Work", "Services", "About", "CV", "Contact"],
    explore: "Explore products",
    build: "Let's build something",
    workEyebrow: "The work",
    workTitle: "Built to be used.",
    workNote: "Products first. Research stays separate.",
    products: "Products",
    research: "Research",
    all: "Everything",
    open: "Open project",
    language: "Language",
    heroTitle: "Software developer & AI engineer.",
    heroSub: "Web, mobile, AI and data systems for real problems.",
    featured: "Featured build",
    aboutEyebrow: "What I build",
    aboutTitle: "Useful systems for ambitious ideas.",
    aboutNote: "AI, software and data from idea to launch.",
    servicesEyebrow: "Ways to work together",
    servicesTitle: "Bring the problem.",
    servicesNote: "Build, integrate, automate.",
    contactTitle: "Have something worth building?",
    contactSub: "Tell me what you need.",
    footerRole: "AI / SOFTWARE / DATA",
  },
  fr: {
    nav: ["Projets", "Services", "À propos", "CV", "Contact"],
    explore: "Voir les produits",
    build: "Construisons quelque chose",
    workEyebrow: "Le travail",
    workTitle: "Des produits utiles.",
    workNote: "Les produits d’abord. La recherche à part.",
    products: "Produits",
    research: "Recherche",
    all: "Tout",
    open: "Ouvrir le projet",
    language: "Langue",
    heroTitle: "Développeuse logiciel. Créatrice de produits.",
    heroSub: "Web, mobile, IA et données pour de vrais problèmes.",
    featured: "Projet phare",
    aboutEyebrow: "Ce que je construis",
    aboutTitle: "Des systèmes utiles pour les idées ambitieuses.",
    aboutNote: "IA, logiciel et données de l’idée au lancement.",
    servicesEyebrow: "Travaillons ensemble",
    servicesTitle: "Apportez le problème.",
    servicesNote: "Construire, intégrer, automatiser.",
    contactTitle: "Un projet qui mérite d’exister ?",
    contactSub: "Dites-moi ce qu’il vous faut.",
    footerRole: "IA / LOGICIEL / DONNÉES",
  },
} as const;

/* ============================================================================
  SMALL VISUAL MOTIFS (pure inline SVG/CSS)
   ============================================================================ */

function ProjectMotif({ variant }: { variant: ProjectVariant }) {
  switch (variant) {
    case "window":
      return (
        <div className="motif-window" aria-hidden="true">
          <div className="bar">
            <i /> <i /> <i />
          </div>
          <div className="block" style={{ top: 34, left: 14, width: "40%", height: 16 }} />
          <div className="block" style={{ top: 60, left: 14, width: "70%", height: 46 }} />
          <div className="block" style={{ top: 116, left: 14, width: "30%", height: 16 }} />
          <div className="block" style={{ top: 34, left: "58%", right: 14, height: 72 }} />
        </div>
      );
    case "record":
      return (
        <div className="motif-window" aria-hidden="true">
          <div className="bar">
            <i /> <i /> <i />
          </div>
          <div className="block" style={{ top: 32, left: 14, right: 14, height: 12 }} />
          <div className="block" style={{ top: 52, left: 14, right: 14, height: 12 }} />
          <div className="block" style={{ top: 72, left: 14, right: 14, height: 12 }} />
          <div className="block" style={{ top: 92, left: 14, right: 14, height: 12 }} />
          <div className="block" style={{ top: 112, left: 14, right: 14, height: 12 }} />
        </div>
      );
    case "nodes":
      return (
        <svg className="motif-nodes" viewBox="0 0 300 168" width="100%" height="100%" aria-hidden="true">
          <line x1="60" y1="40" x2="140" y2="80" />
          <line x1="140" y1="80" x2="220" y2="50" />
          <line x1="140" y1="80" x2="120" y2="140" />
          <line x1="140" y1="80" x2="200" y2="130" />
          <line x1="60" y1="40" x2="90" y2="120" />
          <circle className="pulse" cx="60" cy="40" r="4" />
          <circle cx="140" cy="80" r="5" />
          <circle className="pulse" cx="220" cy="50" r="4" />
          <circle cx="120" cy="140" r="4" />
          <circle className="pulse" cx="200" cy="130" r="4" />
          <circle cx="90" cy="120" r="3.5" />
        </svg>
      );
    case "pareto":
      return (
        <svg className="motif-nodes" viewBox="0 0 300 168" width="100%" height="100%" aria-hidden="true">
          <polyline points="20,150 55,110 95,80 150,55 220,35 275,20" />
          <circle cx="30" cy="130" r="3" />
          <circle cx="55" cy="110" r="4" />
          <circle cx="70" cy="95" r="3" />
          <circle className="pulse" cx="95" cy="80" r="4" />
          <circle cx="120" cy="70" r="3" />
          <circle className="pulse" cx="150" cy="55" r="4.5" />
          <circle cx="185" cy="45" r="3" />
          <circle className="pulse" cx="220" cy="35" r="4" />
          <circle cx="275" cy="20" r="4" />
        </svg>
      );
    case "scan":
      return (
        <div className="motif-scan" aria-hidden="true">
          <div className="beam" />
        </div>
      );
    case "bars":
      return (
        <div className="motif-bars" aria-hidden="true">
          <i style={{ height: "40%", animationDelay: "0s" }} />
          <i style={{ height: "70%", animationDelay: "0.15s" }} />
          <i style={{ height: "55%", animationDelay: "0.3s" }} />
          <i style={{ height: "90%", animationDelay: "0.45s" }} />
          <i style={{ height: "35%", animationDelay: "0.6s" }} />
          <i style={{ height: "65%", animationDelay: "0.75s" }} />
        </div>
      );
    case "pipeline":
      return (
        <div className="motif-pipeline" aria-hidden="true">
          <span className="node">SCRAPE</span>
          <span className="arrow" />
          <span className="node">OCR</span>
          <span className="arrow" />
          <span className="node">MATCH</span>
        </div>
      );
  }
}

/* ============================================================================
   PAGE
   ============================================================================ */

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openService, setOpenService] = useState<number | null>(0);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [projectFilter, setProjectFilter] = useState<"all" | ProjectKind>("all");
  const copy = UI_COPY[language];
  const visibleProjects = PROJECTS.filter((project) => projectFilter === "all" || project.kind === projectFilter);

  /* cursor + spotlight + floating-label parallax, all via CSS custom
    properties on <html>. No re-renders on mousemove. */
  useEffect(() => {
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith("fr")) setLanguage("fr");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    function onMove(e: MouseEvent) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const xPct = (e.clientX / window.innerWidth) * 100;
        const yPct = (e.clientY / window.innerHeight) * 100;
        root.style.setProperty("--mx", `${xPct}%`);
        root.style.setProperty("--my", `${yPct}%`);
        if (finePointer && cursorRef.current) {
          cursorRef.current.style.setProperty("--cx", `${e.clientX}px`);
          cursorRef.current.style.setProperty("--cy", `${e.clientY}px`);
        }
      });
    }

    function onOver(e: MouseEvent) {
      if (!cursorRef.current) return;
      const target = (e.target as HTMLElement)?.closest("a, button, [data-cursor-hover]");
      cursorRef.current.classList.toggle("hovering", !!target);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  /* nav: blur once scrolled, hide on scroll-down, reappear on scroll-up */
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const nav = navRef.current;
      if (!nav) return;
      nav.classList.toggle("scrolled", y > 40);
      if (y > lastScrollY.current && y > 160) {
        nav.classList.add("nav-hidden");
      } else {
        nav.classList.remove("nav-hidden");
      }
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-reveal for anything with .reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* magnetic buttons: nudge toward the cursor within their bounds */
  function magneticMove(e: ReactMouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.setProperty("--tx", `${relX * 0.28}px`);
    el.style.setProperty("--ty", `${relY * 0.28}px`);
  }
  function magneticLeave(e: ReactMouseEvent<HTMLElement>) {
    e.currentTarget.style.setProperty("--tx", "0px");
    e.currentTarget.style.setProperty("--ty", "0px");
  }

  return (
    <>
      <div className="signal-field" />
      <div className="signal-spotlight" />
      <div className="cursor-dot" ref={cursorRef} />

      {/* ------------------------------ NAV ------------------------------ */}
      <header className="nav" ref={navRef}>
        <a href="#top" className="nav-mark" aria-label="Nadjiba Rahal home">
          <span
            className="dot"
            aria-hidden="true"
            style={{ backgroundImage: "url('/nadjiba-logo.png')" }}
          />
          NADJIBA RAHAL
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {copy.nav[NAV_LINKS.indexOf(l)]}
            </a>
          ))}
        </nav>

        <div className="language-switch" aria-label={copy.language}>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          <span>/</span>
          <button className={language === "fr" ? "active" : ""} onClick={() => setLanguage("fr")}>FR</button>
        </div>

        <a
          href="/lets-build"
          className="nav-cta magnetic"
          onMouseMove={magneticMove}
          onMouseLeave={magneticLeave}
        >
          Let&apos;s talk
        </a>

        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
            {copy.nav[NAV_LINKS.indexOf(l)]}
          </a>
        ))}
        <a href="/lets-build" className="mobile-cta" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
          {copy.build}
        </a>
      </div>

      <main id="top">
        {/* ------------------------------ HERO ------------------------------ */}
        <section className="hero" aria-label="Introduction">
          <div className="hero-orbit" aria-hidden="true">
            <span className="orbit-ring orbit-ring-one" />
            <span className="orbit-ring orbit-ring-two" />
            <span className="orbit-core" aria-label="Nadjiba Rahal logo" />
            <span className="satellite satellite-one">ISHARA</span>
            <span className="satellite satellite-two">RAG</span>
            <span className="satellite satellite-three">LIVE DATA</span>
          </div>
          <div className="hero-particles" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ "--particle": i } as CSSProperties} />)}
          </div>
          <span className="float-tag tag-ai">AI</span>
          <span className="float-tag tag-data">DATA</span>
          <span className="float-tag tag-code">CODE</span>
          <span className="float-tag tag-automation">AUTOMATION</span>
          <span className="float-tag tag-product">PRODUCT</span>

          <div className="wrap hero-inner">
            <p className="eyebrow">NADJIBA RAHAL / AI &amp; SOFTWARE BUILDER</p>

            <div className="hero-identity" aria-label="Nadjiba Rahal portrait">
              <div className="hero-portrait" style={{ backgroundImage: "url('/me.jpg')" }} />
              <span className="hero-identity-mark">NR / 26</span>
            </div>

            <h1 className="hero-title">
              <span className="line"><span>{copy.heroTitle}</span></span>
            </h1>

            <div className="hero-sub">
              <p className="hero-descriptor">
                <b>AI × SOFTWARE × DATA × AUTOMATION</b>
                <br />
                {copy.heroSub}
              </p>
              <div className="hero-actions">
                <a
                  href="#work"
                  className="btn btn-solid magnetic"
                  onMouseMove={magneticMove}
                  onMouseLeave={magneticLeave}
                >
                  {copy.explore}
                </a>
                <a
                  href="/lets-build"
                  className="btn btn-ghost magnetic"
                  onMouseMove={magneticMove}
                  onMouseLeave={magneticLeave}
                >
                  {copy.build}
                </a>
                <a href="/cv" className="hero-cv-link">{language === "fr" ? "Voir mon CV" : "View my CV"} <span>↗</span></a>
              </div>
            </div>

          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span className="stem" />
            Scroll
          </div>
        </section>

        {/* ------------------------------ ABOUT ------------------------------ */}
        <section id="about" className="section" aria-labelledby="about-title">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">{copy.aboutEyebrow}</p>
                <h2 id="about-title" className="section-title">
                  {copy.aboutTitle}
                </h2>
              </div>
              <p className="section-note">{copy.aboutNote}</p>
            </div>

            <p className="about-lede reveal">
              My work spans <b>Artificial Intelligence</b>, <b>Machine Learning</b>, <b>Computer Vision</b> and{" "}
              <b>NLP</b>, plus <b>full-stack development</b>, <b>dashboards</b> and <b>automation</b>. I build
              web applications, AI workflows, data tools and custom software.
            </p>

            <div className="about-grid">
              {ABOUT_CELLS.map((c, i) => (
                <div className={`about-cell reveal reveal-delay-${i + 1}`} key={c.n}>
                  <span className="num">{c.n}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ WORK ------------------------------ */}
        <section id="work" className="section" aria-labelledby="work-title">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">{copy.workEyebrow}</p>
                <h2 id="work-title" className="section-title">
                  {copy.workTitle}
                </h2>
              </div>
              <p className="section-note">{copy.workNote}</p>
            </div>

            <div className="project-filter reveal" role="tablist" aria-label="Project categories">
              {(["all", "product", "research"] as const).map((filter) => (
                <button
                  key={filter}
                  className={projectFilter === filter ? "active" : ""}
                  onClick={() => setProjectFilter(filter)}
                  role="tab"
                  aria-selected={projectFilter === filter}
                >
                  {filter === "all" ? copy.all : filter === "product" ? copy.products : copy.research}
                </button>
              ))}
            </div>

            {projectFilter !== "research" && <div className="work-featured reveal">
              <div className="work-featured-visual">
                <ProjectMotif variant={FEATURED_PROJECT.variant} />
                <div
                  className="project-image project-image-featured"
                  style={{ backgroundImage: `url('${FEATURED_PROJECT.image}')` }}
                  role="img"
                  aria-label={`${FEATURED_PROJECT.title} project preview`}
                />
              </div>
              <div className="work-featured-copy">
                <div className="tag-row">
                  <span>{FEATURED_PROJECT.kicker}</span>
                </div>
                <p className="role">{FEATURED_PROJECT.role}</p>
                <h3>{FEATURED_PROJECT.title}</h3>
                <p>{FEATURED_PROJECT.blurb}</p>
                <ul className="feat-list">
                  {FEATURED_FEATURES.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="tag-row">
                  {FEATURED_PROJECT.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <Link className="project-link" href={`/work/${FEATURED_PROJECT.id}`}>{copy.open} <span>↗</span></Link>
              </div>
            </div>}

            <div
              className="work-strip-scroller reveal"
              style={{ marginTop: 28 }}
              tabIndex={0}
              aria-label="More projects, scroll horizontally"
            >
              {visibleProjects.map((p) => (
                <article className="work-card" key={p.id}>
                  <div className="work-card-visual">
                    <ProjectMotif variant={p.variant} />
                    {p.image && (
                      <div
                        className="project-image"
                        style={{ backgroundImage: `url('${p.image}')` }}
                        role="img"
                        aria-label={`${p.title} project preview`}
                      />
                    )}
                  </div>
                  <p className="kicker">
                    <span>{p.kicker}</span>
                  </p>
                  <h4>{p.title}</h4>
                  <span className="project-year">{p.year} / {p.kind}</span>
                  <p>{p.blurb}</p>
                  <p className="project-impact">{p.impact}</p>
                  <div className="stack-row">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <Link className="project-link" href={`/work/${p.id}`}>{copy.open} <span>↗</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ SERVICES ------------------------------ */}
        <section id="services" className="section" aria-labelledby="services-title">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">{copy.servicesEyebrow}</p>
                <h2 id="services-title" className="section-title">
                  {copy.servicesTitle}
                </h2>
              </div>
              <p className="section-note">{copy.servicesNote}</p>
            </div>

            <div className="service-list reveal">
              {SERVICES.map((s, i) => {
                const isOpen = openService === i;
                return (
                  <div
                    className={`service-row ${isOpen ? "is-open" : ""}`}
                    key={s.n}
                    onClick={() => setOpenService(isOpen ? null : i)}
                  >
                    <span className="num">{s.n}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <div className="service-detail" aria-hidden={!isOpen}>
                        <p>{s.body}</p>
                        <div className="examples">
                          {s.examples.map((ex) => (
                            <span key={ex}>{ex}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      className="expand-icon"
                      aria-expanded={isOpen}
                      aria-label={isOpen ? `Collapse ${s.title}` : `Expand ${s.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenService(isOpen ? null : i);
                      }}
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------ STACK ------------------------------ */}
        <section aria-label="Technology stack">
          <div className="stack-marquee">
            <div className="stack-track" aria-hidden="true">
              {[...STACK_ROW_1, ...STACK_ROW_1].map((t, i) => (
                <span key={`${t}-${i}`}>{t}</span>
              ))}
            </div>
          </div>
          <div className="stack-marquee">
            <div className="stack-track stack-track-rev" aria-hidden="true">
              {[...STACK_ROW_2, ...STACK_ROW_2].map((t, i) => (
                <span key={`${t}-${i}`}>{t}</span>
              ))}
            </div>
          </div>
          <p className="sr-only">Technologies: {[...STACK_ROW_1, ...STACK_ROW_2].join(", ")}.</p>
        </section>

        {/* ------------------------------ CREDIBILITY ------------------------------ */}
        <section className="section" aria-labelledby="cred-title">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Where it&apos;s been tested</p>
                <h2 id="cred-title" className="section-title">
                  Applied, not <em>theoretical</em>.
                </h2>
              </div>
            </div>
            <div className="cred-list reveal">
              {CREDIBILITY.map((c) => (
                <div className="cred-row" key={c.org}>
                  <span className="org">{c.org}</span>
                  <div>
                    <p className="role">{c.role}</p>
                    <p className="desc">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ PROCESS ------------------------------ */}
        <section className="section" aria-labelledby="process-title">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">How I work</p>
                <h2 id="process-title" className="section-title">
                  Idea to <em>system</em>.
                </h2>
              </div>
            </div>
            <div className="process-list">
              {PROCESS.map((p, i) => (
                <div className={`process-step reveal reveal-delay-${(i % 4) + 1}`} key={p.n}>
                  <span className="marker">{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ CONTACT ------------------------------ */}
        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <div className="wrap">
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Let&apos;s build
            </p>
            <h2 id="contact-title" className="contact-title reveal">
              {copy.contactTitle}
            </h2>
            <p className="contact-sub reveal">{copy.contactSub}</p>

            <div className="contact-actions reveal">
              <a
                href="/lets-build"
                className="btn btn-solid magnetic"
                onMouseMove={magneticMove}
                onMouseLeave={magneticLeave}
              >
                Start a project
              </a>
              <a
                href="/lets-build"
                className="btn btn-ghost magnetic"
                onMouseMove={magneticMove}
                onMouseLeave={magneticLeave}
              >
                Email me
              </a>
            </div>

            <div className="contact-links reveal">
              <Link href="/cv">View my CV</Link>
              <a href={LINKS.phone}>+213 540 276 848</a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <p className="foot-brand"><span className="footer-logo" />Nadjiba Rahal</p>
          <p className="foot-role">{copy.footerRole}</p>
        </div>
        <p className="foot-meta">
          Algiers, Algeria
          <br />© 2026
        </p>
      </footer>
    </>
  );
}