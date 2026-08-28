"use client";

import { useEffect, useSyncExternalStore } from "react";

type Language = "en" | "fr";

function getLanguage(): Language {
  const saved = window.localStorage.getItem("site-language");
  if (saved === "fr" || saved === "en") return saved;
  return window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function getServerLanguage(): Language {
  return "en";
}

function subscribe(onChange: () => void) {
  window.addEventListener("site-language-change", onChange);
  return () => window.removeEventListener("site-language-change", onChange);
}

export function useSiteLanguage() {
  const language = useSyncExternalStore(subscribe, getLanguage, getServerLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(nextLanguage: Language) {
    window.localStorage.setItem("site-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.dispatchEvent(new CustomEvent("site-language-change", { detail: nextLanguage }));
  }

  return { language, setLanguage };
}

export function SiteLanguage() {
  const { language, setLanguage } = useSiteLanguage();
  return (
    <div className="language-switch" aria-label="Language">
      <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
      <span>/</span>
      <button className={language === "fr" ? "active" : ""} onClick={() => setLanguage("fr")}>FR</button>
    </div>
  );
}
