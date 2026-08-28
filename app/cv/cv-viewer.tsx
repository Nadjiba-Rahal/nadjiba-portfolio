"use client";

import { useState } from "react";

type CvLanguage = "en" | "fr";

const CV_FILES = {
  en: {
    label: "English CV",
    code: "EN / 01",
    file: "/cv-nadjiba-rahal-en.pdf",
    open: "Open full PDF",
  },
  fr: {
    label: "CV français",
    code: "FR / 02",
    file: "/cv-nadjiba-rahal-fr.pdf",
    open: "Ouvrir le PDF complet",
  },
} as const;

export default function CvViewer() {
  const [selected, setSelected] = useState<CvLanguage>("en");
  const cv = CV_FILES[selected];

  return (
    <section className="cv-viewer" aria-labelledby="cv-viewer-title">
      <div className="cv-selector" role="tablist" aria-label="Choose a CV">
        {(Object.keys(CV_FILES) as CvLanguage[]).map((language) => {
          const option = CV_FILES[language];
          return (
            <button
              key={language}
              className={`cv-selector-button ${selected === language ? "active" : ""}`}
              type="button"
              role="tab"
              aria-selected={selected === language}
              onClick={() => setSelected(language)}
            >
              <span>{option.code}</span>
              <strong>{option.label}</strong>
              <small>{selected === language ? "Selected" : "View this CV"}</small>
            </button>
          );
        })}
      </div>

      <div className="cv-viewer-heading">
        <div>
          <p className="eyebrow">Selected document</p>
          <h2 id="cv-viewer-title">{cv.label}</h2>
        </div>
        <a href={cv.file} target="_blank" rel="noreferrer" className="cv-open-link">
          {cv.open} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <iframe key={cv.file} src={cv.file} title={`${cv.label} preview`} />
    </section>
  );
}
