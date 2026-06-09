import type { FunnelDict } from "./types";

export const de = {
  countdown: {
    days: "Tage",
    hours: "Std",
    minutes: "Min",
    seconds: "Sek",
    badge: "⚡ Einführungsangebot endet in",
  },

  landing: {
    eyebrow: "Kostenloser Website-Check · 2 Minuten",
    headline: "Deine Website kostet",
    headlineAccent: "dich täglich Kunden.",
    subtext: "5 kurze Fragen – und wir melden uns persönlich bei dir mit einer konkreten Einschätzung.",
    steps: [
      "5 Fragen beantworten",
      "Wir analysieren deine Situation",
      "Christian meldet sich persönlich",
    ],
    cta: "Check starten →",
    security: "🔒 Kostenlos · Kein Spam · DSGVO-konform",
    footer: "© 2026 Kasoria · kasoria.com",
  },

  quiz: {
    progressLabel: "Frage",
    continueBtn: "Weiter →",
    websiteUrl: {
      q: "Wie lautet deine aktuelle Website-URL?",
      placeholder: "https://deine-website.de",
      skip: "Überspringen →",
    },
    questions: [
      {
        q: "Was beschreibt dein Unternehmen am besten?",
        opts: ["Handwerk & Bau", "Dienstleistung & Beratung", "Gesundheit & Beauty", "Gastronomie & Handel", "Sonstiges"],
      },
      {
        q: "Wie sieht deine Website-Situation gerade aus?",
        opts: ["Ich habe noch keine Website", "Ich habe eine – sie bringt kaum Anfragen", "Ich habe eine – bin damit unzufrieden"],
      },
      {
        q: "Was ist dein größtes Online-Problem?",
        opts: ["Zu wenig Kontaktanfragen", "Kaum bei Google sichtbar", "Veraltetes / unprofessionelles Design", "Technik-Probleme & schlechte Ladezeit"],
      },
      {
        q: "Wie viele Anfragen kommen aktuell pro Monat über deine Website?",
        opts: ["Kaum oder keine", "1–3 Anfragen", "4–10 Anfragen", "Mehr als 10"],
      },
      {
        q: "Was ist dein wichtigstes Ziel für die nächsten 6 Monate?",
        opts: ["Deutlich mehr Kontaktanfragen", "Besser bei Google gefunden werden", "Professionellerer Markenauftritt", "Alles – komplett neu starten"],
      },
      {
        q: "Was ist dein ungefähres Budget für eine neue Website?",
        opts: ["Unter 500 €", "500 – 1.500 €", "1.500 – 4.000 €", "4.000 € und mehr"],
      },
    ],
  },

  trust1: [
    {
      bridge: "Viele unserer Kunden haben genau da gestartet.",
      quote: "Mega zufrieden! Wir treten jetzt endlich professionell bei Ausschreibungen auf.",
      author: "Vasil Stoyanov",
      company: "SPEDO GmbH · Hamburg",
      context: "Logistik & Kurierdienst · vorher: keine Website · Projekt: 11 Tage",
    },
    {
      bridge: "Das hören wir oft – und es lässt sich konkret lösen.",
      quote: "Ich bin absolut begeistert. Das Buchungstool meiner Website wurde grandios – und kommt auch bei meiner Kundschaft extrem gut an.",
      author: "Michelle Rathjen",
      company: "Jingles Katzenstube · Niedersachsen",
      context: "Katzenpension · Anfragen laufen jetzt automatisch rein",
    },
    {
      bridge: "Damit bist du nicht allein.",
      quote: "Wir sind absolut zufrieden mit dem Ergebnis. Die Website ist Hammer, die Kunden sind auch begeistert.",
      author: "Denitsa Deneva",
      company: "Tattoo Avenue · Neu Wulmstorf",
      context: "Tattoo & Piercing Studio · Neues Design + Local SEO",
    },
  ],

  trust2: [
    {
      bridge: "Zu wenig Anfragen ist kein Traffic-Problem. Es ist ein Conversion-Problem.",
      headline: "Die meisten Websites verlieren Leads still und leise.",
      sub: "Kein klarer Kontaktweg, kein Vertrauen, kein Formular, das funktioniert. Das beheben wir gezielt – nicht mit mehr Werbung, sondern mit besserer Seite.",
      stats: [
        { value: "3×",   label: "Mehr Anfragen nach Relaunch" },
        { value: "< 2s", label: "Ladezeit" },
        { value: "24/7", label: "Automatische Leaderfassung" },
        { value: "7–14", label: "Tage bis Launch" },
      ],
    },
    {
      bridge: "Google-Sichtbarkeit ist kein Zufall – sie ist Architektur.",
      headline: "Technik, Texte, Struktur. In dieser Reihenfolge.",
      sub: "Lokales SEO funktioniert, wenn die Seite technisch sauber ist und die richtigen Signale sendet. Wir bauen das von Anfang an rein.",
      stats: [
        { value: "Seite 1", label: "Lokale Google-Suche" },
        { value: "< 2s",   label: "Core Web Vitals grün" },
        { value: "7–14",   label: "Tage bis Launch" },
        { value: "100%",   label: "On-Page SEO inklusive" },
      ],
    },
    {
      bridge: "Design entscheidet in Sekunden – bevor jemand liest.",
      headline: "Kein Template. Kein Kompromiss.",
      sub: "Jedes Projekt ist individuell auf deine Zielgruppe und Positionierung ausgerichtet. Das sieht man – und das fühlen deine Besucher.",
      stats: [
        { value: "100%", label: "Individuelles Design" },
        { value: "< 2s", label: "Ladezeit" },
        { value: "7–14", label: "Tage bis Launch" },
        { value: "3+",   label: "Projekte live" },
      ],
    },
    {
      bridge: "Schnell, stabil, sauber. Das ist die Grundlage.",
      headline: "Technik ist kein Bonus – sie ist die Basis.",
      sub: "Performance, DSGVO, Mobile, SSL, Backups – alles läuft von Tag 1. Du musst dich nicht darum kümmern.",
      stats: [
        { value: "< 2s",  label: "Ladezeit" },
        { value: "100%",  label: "Mobile optimiert" },
        { value: "7–14",  label: "Tage bis Launch" },
        { value: "99.9%", label: "Uptime" },
      ],
    },
  ],

  lead: {
    stepLabel: "Letzter Schritt",
    headline: "Wir melden uns",
    headlineAccent: "persönlich bei dir.",
    bullets: [
      "Christian analysiert deine Antworten persönlich",
      "Kostenloses 15-Min-Gespräch – ehrlich, kein Verkaufsdruck",
      "Du bekommst eine konkrete Einschätzung deiner Situation",
    ],
    offer: {
      prefix: "Einführungsangebot: Website ab",
      price: "799 €",
      originalLabel: "statt regulär",
      originalPrice: "2.500 €",
      countdown: "Endet in",
    },
    fields: {
      name:  { label: "Dein Vorname *",  placeholder: "Max" },
      email: { label: "E-Mail *",         placeholder: "max@unternehmen.de" },
      phone: { label: "Telefon *",        placeholder: "+49 160 000 0000" },
      websiteUrl: { label: "Deine Website-URL (falls vorhanden)", placeholder: "https://deine-website.de" },
    },
    cta: "Jetzt Gespräch anfragen →",
    ctaLoading: "Wird übermittelt…",
    security: "🔒 Keine Weitergabe an Dritte · DSGVO-konform",
  },

  thanks: {
    greeting: "Danke",
    headlineAccent: "Wir melden uns bald.",
    nextStepsLabel: "Was passiert jetzt",
    nextSteps: [
      "Christian analysiert deine Antworten persönlich",
      "Du bekommst eine E-Mail oder einen Anruf – innerhalb von 24h",
      "Kostenloses 15-Min-Gespräch: konkrete Einschätzung, keine Floskeln",
    ],
    curious: "Schon neugierig?",
  },

  results: [
    {
      tag: "Budget-Check",
      headline: "Lass uns kurz sprechen.",
      body: "Unsere Websites starten bei 799 €. Im kostenlosen Gespräch schauen wir, was in deiner Situation sinnvoll ist.",
    },
    {
      tag: "Neuer Auftritt",
      headline: "Du bist bereit für einen starken Start.",
      body: "Wir bauen dir in 7–14 Tagen eine Website, die vom ersten Tag an Anfragen generiert.",
    },
    {
      tag: "SEO-Potenzial",
      headline: "Dein Google-Ranking kostet dich täglich Kunden.",
      body: "Mit der richtigen Seitenstruktur und lokalem SEO kannst du messbar mehr Anfragen gewinnen.",
    },
    {
      tag: "Conversion-Problem",
      headline: "Mehr Traffic hilft nicht – deine Seite muss konvertieren.",
      body: "Das Problem liegt meist in fehlenden Kontaktwegen. Wir beheben das konkret – in 7–14 Tagen.",
    },
    {
      tag: "Wachstumspotenzial",
      headline: "Du weißt, dass mehr möglich ist.",
      body: "Ein professioneller Auftritt ist oft der Unterschied zwischen Auftrag und Absprung.",
    },
  ],
} satisfies FunnelDict;
