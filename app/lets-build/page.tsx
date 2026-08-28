"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SiteLanguage, useSiteLanguage } from "../components/site-language";

export default function LetsBuildPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { language } = useSiteLanguage();
  const isFrench = language === "fr";

  async function sendBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = await response.json();
      setStatus(response.ok ? "sent" : "error");
      if (!response.ok) setErrorMessage(result.error || "The email could not be sent.");
    } catch {
      setStatus("error");
      setErrorMessage(isFrench ? "Service email indisponible. Réessayez." : "The email service is unavailable. Please try again.");
    }
  }

  function emailInstead() {
    const form = document.querySelector<HTMLFormElement>(".brief-form");
    if (!form) return;
    const data = new FormData(form);
    const subject = `${isFrench ? "Demande de projet" : "Project brief"} from ${data.get("name") || "a potential client"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `${isFrench ? "Type" : "Request type"}: ${data.get("requestType") || ""}`,
      `Budget: ${data.get("budget") || ""}`,
      `${isFrench ? "Délai" : "Timeline"}: ${data.get("timeline") || ""}`,
      "",
      isFrench ? "Détails :" : "Project details:",
      data.get("details") || "",
    ].join("\n");
    window.location.href = `mailto:rahalnadjiba5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="brief-page">
      <nav className="case-nav"><Link href="/" className="nav-mark"><span className="dot" style={{ backgroundImage: "url('/nadjiba-logo.png')" }} /> NADJIBA RAHAL</Link><SiteLanguage /><Link href="/#work" className="case-back">{isFrench ? "Retour" : "Back to portfolio"} <span>↗</span></Link></nav>
      <div className="wrap brief-wrap">
        <p className="eyebrow">{isFrench ? "Construisons" : "Let&apos;s build"}</p>
        <h1>{isFrench ? <>Parlez-moi de votre<br /><em>projet.</em></> : <>Tell me about your<br /><em>project.</em></>}</h1>
        <p className="brief-intro">{isFrench ? "Quelques détails pour commencer." : "A few details to get started."}</p>
        <form className="brief-form" onSubmit={sendBrief}>
          <label>{isFrench ? "Nom" : "Name"}<input required name="name" placeholder={isFrench ? "Votre nom" : "Your name"} /></label>
          <label>Email<input required type="email" name="email" placeholder="you@company.com" /></label>
          <label>{isFrench ? "Votre demande" : "What brings you here?"}<select required name="requestType" defaultValue=""><option value="" disabled>{isFrench ? "Choisir" : "Select one"}</option><option>{isFrench ? "Nouveau projet" : "New project"}</option><option>{isFrench ? "Poste" : "Job position"}</option><option>{isFrench ? "Partenariat" : "Partnership"}</option><option>{isFrench ? "Autre" : "Other"}</option></select></label>
          <label>{isFrench ? "Budget prévu" : "Budget"}<input name="budget" placeholder={isFrench ? "Montant ou à définir" : "Amount or to discuss"} /></label>
          <label>{isFrench ? "Délai souhaité" : "Ideal timeline"}<input name="timeline" placeholder={isFrench ? "Ex. 6 semaines, flexible" : "For example: 6 weeks, flexible"} /></label>
          <label className="brief-wide">{isFrench ? "Détails du projet" : "Project details"}<textarea required name="details" rows={7} placeholder={isFrench ? "Que faut-il construire ? Pour qui ?" : "What should exist at the end? Who will use it?"} /></label>
          <button className="btn btn-solid" type="submit" disabled={status === "sending"}>
            {status === "sending"
              ? (isFrench ? "Envoi..." : "Sending...")
              : status === "sent"
                ? (isFrench ? "Message envoyé" : "Message sent")
                : (isFrench ? "Envoyer le brief" : "Send project brief")}
          </button>
            <button className="btn btn-ghost" type="button" onClick={emailInstead}>
              {isFrench ? "M’écrire directement" : "Email me instead"}
            </button>
          {status === "error" && <p role="alert">{errorMessage || (isFrench ? "Impossible d’envoyer le message. Réessayez." : "The message could not be sent. Please try again.")}</p>}
        </form>
      </div>
    </main>
  );
}
