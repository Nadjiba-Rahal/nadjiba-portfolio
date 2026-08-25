"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function LetsBuildPage() {
  const [sent, setSent] = useState(false);

  function sendBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Project brief from ${data.get("name") || "a potential client"}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Request type: ${data.get("requestType")}`,
      `Budget: ${data.get("budget")}`,
      `Timeline: ${data.get("timeline")}`,
      "",
      "Project details:",
      data.get("details"),
    ].join("\n");
    window.location.href = `mailto:rahalnadjiba5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <main className="brief-page">
      <nav className="case-nav"><Link href="/" className="nav-mark"><span className="dot" /> NADJIBA</Link><Link href="/#work" className="case-back">Back to portfolio <span>↗</span></Link></nav>
      <div className="wrap brief-wrap">
        <p className="eyebrow">Let&apos;s build</p>
        <h1>Bring me the<br /><em>interesting problem.</em></h1>
        <p className="brief-intro">Tell me what you are building, what you need and what reality looks like. The form opens a ready-to-send brief in your email app.</p>
        <form className="brief-form" onSubmit={sendBrief}>
          <label>Name<input required name="name" placeholder="Your name" /></label>
          <label>Email<input required type="email" name="email" placeholder="you@company.com" /></label>
          <label>What brings you here?<select required name="requestType" defaultValue=""><option value="" disabled>Select one</option><option>New project</option><option>Job position</option><option>Partnership</option><option>Just exploring</option></select></label>
          <label>Budget range<select name="budget" defaultValue="Not decided"><option>Not decided</option><option>Under $1,000</option><option>$1,000 - $5,000</option><option>$5,000 - $15,000</option><option>$15,000+</option></select></label>
          <label>Ideal timeline<input name="timeline" placeholder="For example: 6 weeks, flexible" /></label>
          <label className="brief-wide">Tell me the details<textarea required name="details" rows={7} placeholder="What should exist at the end? Who will use it? What is already ready? What feels difficult?" /></label>
          <button className="btn btn-solid" type="submit">{sent ? "Brief ready to send ↗" : "Prepare my brief ↗"}</button>
        </form>
      </div>
    </main>
  );
}
