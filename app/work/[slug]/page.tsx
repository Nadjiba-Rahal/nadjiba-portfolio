import Link from "next/link";
import { notFound } from "next/navigation";

const PROJECTS = {
  ishara: ["ISHARA", "PRODUCT / AI PLATFORM", "Algerian Sign Language recognition and translation", "A full-stack ALSL platform that captures camera input, extracts hand and pose landmarks, runs an ONNX model, produces a recognized sign label and renders signs through a 3D avatar.", [".NET 10", "ASP.NET Core", "PostgreSQL", "EF Core", "Next.js", "Three.js", "React Native / Expo", "PyTorch", "MediaPipe", "ONNX Runtime", "Docker", "GitHub Actions"], "/projects/ishara.png"],
  "video-assistant": ["AGENTIC VIDEO ASSISTANT", "PRODUCT / AI AGENT", "Idea-to-video generation agent", "An agent that researches information when needed, improves the user's prompt, calls a video-generation API, monitors the asynchronous job and downloads the resulting video.", ["Python", "smolagents", "Gradio", "DuckDuckGo", "Video API", "Pytest", "Docker"], "/projects/agentic-video-assistant.webp"],
  "enterprise-rag": ["ENTERPRISE RAG ENGINE", "PRODUCT / GENAI", "Multilingual document question-answering", "A PDF RAG system that parses documents, chunks and embeds them locally, retrieves context through hybrid search, then generates grounded answers with citations in English, French and Arabic.", ["Python", "FastAPI", "Streamlit", "LangChain", "PyPDFLoader", "Sentence Transformers", "ChromaDB", "Groq Llama-3", "Docker", "Pytest"], "/projects/enterprise-rag.webp"],
  ecommerce: ["ENTERPRISE E-COMMERCE PLATFORM", "PRODUCT / COMMERCE", "Single-tenant white-label commerce", "A customizable storefront and commerce infrastructure designed for cash-on-delivery businesses and deployment as an individual store.", ["Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "MongoDB Atlas", "Cloudinary", "Vercel"], "/projects/e-commerce.png"],
  "commerce-intelligence": ["REAL-TIME COMMERCE INTELLIGENCE", "PRODUCT / REAL-TIME DATA", "Event streaming and analytics engine", "A real-time engine that simulates e-commerce activity, processes events asynchronously, evaluates fraud risk and displays live business telemetry using bounded in-memory stream windows.", ["Python", "asyncio.Queue", "DuckDB", "Streamlit", "Risk engines", "Poisson", "Exponential", "Markov"], "/projects/commerce-fraud.png"],
  "sentiment-bert": ["SENTIMENT ANALYSIS WITH BERT", "ML PIPELINE", "End-to-end NLP classification", "A complete sentiment pipeline: text normalization, WordPiece tokenization, contextual BERT embeddings, classification and evaluation for positive and negative sentiment.", ["Python", "BERT", "Transformers", "WordPiece", "PyTorch", "NLP"], "/projects/bi.png"],
  bellevue: ["BELLEVUE", "PRODUCT / SOLO BUILD", "Medical clinic management platform", "A full-stack medical cabinet website and management system with public booking, real-time availability and a private admin dashboard.", ["Next.js", "Server Actions", "PostgreSQL / Neon", "Auth"], "/projects/cabinet-medical.png"],
} as const;

export function generateStaticParams() { return Object.keys(PROJECTS).map((slug) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS[slug as keyof typeof PROJECTS];
  if (!project) notFound();
  const [title, label, role, summary, stack, image] = project;

  return (
    <main className="case-study">
      <nav className="case-nav"><Link href="/" className="nav-mark"><span className="dot" style={{ backgroundImage: "url('/nadjiba-logo.png')" }} /> NADJIBA RAHAL</Link><Link href="/#work" className="case-back">Back to work <span>↗</span></Link></nav>
      <div className="wrap case-wrap">
        <header className="case-header"><p className="eyebrow">{label}</p><p className="case-year">2025 / SHIPPED</p><h1>{title}</h1><p className="case-role">{role}</p></header>
        <div className="case-visual" style={{ backgroundImage: `url('${image}')` }} role="img" aria-label={`${title} project preview`} />
        <section className="case-grid" aria-label="Project details"><div><p className="eyebrow">What it is</p><h2>{summary}</h2></div><div className="case-copy"><p>This is the kind of work I care about: a real system with a clear user, a difficult technical center and a result that can leave the notebook.</p><ul className="case-details">{stack.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
        <section className="case-stack"><p className="eyebrow">Technology</p><div className="tag-row">{stack.map((item) => <span key={item}>{item}</span>)}</div></section>
        <Link href="/#work" className="case-next">See more work <span>→</span></Link>
      </div>
    </main>
  );
}
