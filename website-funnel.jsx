"use client";
import { useState, useEffect } from "react";

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function useCountdown() {
  const [deadline] = useState(() => Date.now() + 47 * 3_600_000 + 23 * 60_000);
  const [t, setT] = useState(null);
  useEffect(() => {
    const tick = () => {
      const d = deadline - Date.now();
      if (d <= 0) return setT({ h: "00", m: "00", s: "00" });
      setT({
        h: String(Math.floor(d / 3_600_000)).padStart(2, "0"),
        m: String(Math.floor((d % 3_600_000) / 60_000)).padStart(2, "0"),
        s: String(Math.floor((d % 60_000) / 1_000)).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);
  return t;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Sora:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 0; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .au { animation: fadeUp 0.42s cubic-bezier(0.22,1,0.36,1) forwards; }
  .d1 { animation-delay: 0.04s; opacity: 0; }
  .d2 { animation-delay: 0.12s; opacity: 0; }
  .d3 { animation-delay: 0.21s; opacity: 0; }
  .d4 { animation-delay: 0.30s; opacity: 0; }
  .d5 { animation-delay: 0.38s; opacity: 0; }

  .opt {
    background: transparent; border: 1px solid rgba(255,255,255,0.11);
    color: rgba(240,239,233,0.88); text-align: left; padding: 14px 18px;
    border-radius: 9px; cursor: pointer; font-family: 'Sora', sans-serif;
    font-size: 13.5px; font-weight: 400; transition: all 0.18s ease;
    width: 100%; display: flex; align-items: center; gap: 13px; line-height: 1.45;
  }
  .opt:hover { border-color: rgba(255,255,255,0.32); background: rgba(255,255,255,0.04); }
  .opt.sel   { background: #f0efe9; color: #0a0a0a; border-color: #f0efe9; font-weight: 600; }
  .lbl {
    width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; border: 1px solid currentColor;
  }
  .inp {
    background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.16);
    color: #f0efe9; font-family: 'Sora', sans-serif; font-size: 15px;
    padding: 12px 0; width: 100%; outline: none; transition: border-color 0.2s;
  }
  .inp:focus { border-bottom-color: rgba(255,255,255,0.6); }
  .inp::placeholder { color: rgba(255,255,255,0.22); font-size: 13px; }
  .btn-p {
    background: #f0efe9; color: #0a0a0a; border: none; padding: 15px 28px;
    font-family: 'Sora', sans-serif; font-weight: 700; font-size: 12px;
    letter-spacing: 0.07em; text-transform: uppercase; border-radius: 9px;
    cursor: pointer; transition: opacity 0.15s; width: 100%;
  }
  .btn-p:hover { opacity: 0.88; }
  .btn-p:disabled { opacity: 0.28; cursor: default; }
  .step-row { display: flex; align-items: flex-start; gap: 14px; }
  .step-num {
    width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center;
    justify-content: center; font-size: 10px; font-weight: 700; color: rgba(240,239,233,0.45); margin-top: 1px;
  }
  .badge {
    display: inline-flex; align-items: center;
    background: rgba(255,220,100,0.1); border: 1px solid rgba(255,220,100,0.25);
    color: #ffd864; border-radius: 100px; padding: 4px 12px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .cd { display: flex; align-items: center; gap: 6px; justify-content: center; }
  .cd-box {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 7px; padding: 8px 12px; min-width: 52px; text-align: center;
  }
  .cd-n { font-size: 22px; font-weight: 700; color: #f0efe9; line-height: 1; }
  .cd-l { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(240,239,233,0.3); margin-top: 3px; }
  .cd-s { font-size: 20px; color: rgba(240,239,233,0.2); margin-bottom: 8px; }
  .stars { color: #ffd864; font-size: 13px; letter-spacing: 3px; }
  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; }
  .stat-box {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; padding: 16px; text-align: center;
  }
`;

// ─── CONTEXTUAL TRUST CONTENT ─────────────────────────────────────────────────
// Each trust slide picks content based on the last relevant answer.

// Trust slide 1 appears after Q2 (website situation) — adapts to that answer
function getTrust1(answers) {
  const sit = answers[1] || "";
  if (sit.includes("keine Website")) return {
    bridge: "Viele unserer Kunden haben genau da gestartet.",
    quote: "Mega zufrieden! Wir treten jetzt endlich professionell bei Ausschreibungen auf.",
    author: "Vasil Stoyanov", company: "SPEDO GmbH · Hamburg",
    context: "Logistik & Kurierdienst · vorher: keine Website · Projekt: 11 Tage",
  };
  if (sit.includes("kaum Anfragen")) return {
    bridge: "Das hören wir oft – und es lässt sich konkret lösen.",
    quote: "Ich bin absolut begeistert. Das Buchungstool meiner Website wurde grandios – und kommt auch bei meiner Kundschaft extrem gut an.",
    author: "Michelle Rathjen", company: "Jingles Katzenstube · Niedersachsen",
    context: "Katzenpension · Anfragen laufen jetzt automatisch rein",
  };
  return {
    bridge: "Damit bist du nicht allein.",
    quote: "Wir sind absolut zufrieden mit dem Ergebnis. Die Website ist Hammer, die Kunden sind auch begeistert.",
    author: "Denitsa Deneva", company: "Tattoo Avenue · Neu Wulmstorf",
    context: "Tattoo & Piercing Studio · Neues Design + Local SEO",
  };
}

// Trust slide 2 appears after Q4 (inquiries count) — adapts to Q3 (biggest problem)
function getTrust2(answers) {
  const problem = answers[2] || "";
  if (problem.includes("Kontaktanfragen")) return {
    bridge: "Zu wenig Anfragen ist kein Traffic-Problem. Es ist ein Conversion-Problem.",
    headline: "Die meisten Websites verlieren Leads still und leise.",
    sub: "Kein klarer Kontaktweg, kein Vertrauen, kein Formular, das funktioniert. Das beheben wir gezielt – nicht mit mehr Werbung, sondern mit besserer Seite.",
    stats: [
      { value: "3×", label: "Mehr Anfragen nach Relaunch" },
      { value: "< 2s", label: "Ladezeit" },
      { value: "24/7", label: "Automatische Leaderfassung" },
      { value: "7–14", label: "Tage bis Launch" },
    ],
  };
  if (problem.includes("Google")) return {
    bridge: "Google-Sichtbarkeit ist kein Zufall – sie ist Architektur.",
    headline: "Technik, Texte, Struktur. In dieser Reihenfolge.",
    sub: "Lokales SEO funktioniert, wenn die Seite technisch sauber ist und die richtigen Signale sendet. Wir bauen das von Anfang an rein.",
    stats: [
      { value: "Seite 1", label: "Lokale Google-Suche" },
      { value: "< 2s",   label: "Core Web Vitals grün" },
      { value: "7–14",   label: "Tage bis Launch" },
      { value: "100%",   label: "On-Page SEO inklusive" },
    ],
  };
  if (problem.includes("Design")) return {
    bridge: "Design entscheidet in Sekunden – bevor jemand liest.",
    headline: "Kein Template. Kein Kompromiss.",
    sub: "Jedes Projekt ist individuell auf deine Zielgruppe und Positionierung ausgerichtet. Das sieht man – und das fühlen deine Besucher.",
    stats: [
      { value: "100%", label: "Individuelles Design" },
      { value: "< 2s", label: "Ladezeit" },
      { value: "7–14", label: "Tage bis Launch" },
      { value: "3+",   label: "Projekte live" },
    ],
  };
  // Default / Technik
  return {
    bridge: "Schnell, stabil, sauber. Das ist die Grundlage.",
    headline: "Technik ist kein Bonus – sie ist die Basis.",
    sub: "Performance, DSGVO, Mobile, SSL, Backups – alles läuft von Tag 1. Du musst dich nicht darum kümmern.",
    stats: [
      { value: "< 2s",  label: "Ladezeit" },
      { value: "100%",  label: "Mobile optimiert" },
      { value: "7–14",  label: "Tage bis Launch" },
      { value: "99.9%", label: "Uptime" },
    ],
  };
}

// ─── SLIDE SEQUENCE ───────────────────────────────────────────────────────────
const SLIDES = [
  { type: "q", qKey: 0,
    q: "Was beschreibt dein Unternehmen am besten?",
    opts: ["Handwerk & Bau", "Dienstleistung & Beratung", "Gesundheit & Beauty", "Gastronomie & Handel", "Sonstiges"] },

  { type: "q", qKey: 1,
    q: "Wie sieht deine Website-Situation gerade aus?",
    opts: ["Ich habe noch keine Website", "Ich habe eine – sie bringt kaum Anfragen", "Ich habe eine – bin damit unzufrieden"] },

  // ↑ reacts to Q2 (website situation)
  { type: "trust", trustFn: "trust1" },

  { type: "q", qKey: 2,
    q: "Was ist dein größtes Online-Problem?",
    opts: ["Zu wenig Kontaktanfragen", "Kaum bei Google sichtbar", "Veraltetes / unprofessionelles Design", "Technik-Probleme & schlechte Ladezeit"] },

  { type: "q", qKey: 3,
    q: "Wie viele Anfragen kommen aktuell pro Monat über deine Website?",
    opts: ["Kaum oder keine", "1–3 Anfragen", "4–10 Anfragen", "Mehr als 10"] },

  // ↑ reacts to Q3 (biggest problem)
  { type: "trust", trustFn: "trust2" },

  { type: "q", qKey: 4,
    q: "Was ist dein wichtigstes Ziel für die nächsten 6 Monate?",
    opts: ["Deutlich mehr Kontaktanfragen", "Besser bei Google gefunden werden", "Professionellerer Markenauftritt", "Alles – komplett neu starten"] },

  { type: "q", qKey: 5,
    q: "Was ist dein ungefähres Budget für eine neue Website?",
    opts: ["Unter 500 €", "500 – 1.500 €", "1.500 – 4.000 €", "4.000 € und mehr"] },
];

const QUESTIONS = SLIDES.filter(s => s.type === "q");

function getResult(a) {
  if ((a[5] || "").includes("Unter 500"))
    return { tag: "Budget-Check", h: "Lass uns kurz sprechen.", b: "Unsere Websites starten bei 799 €. Im kostenlosen Gespräch schauen wir, was in deiner Situation sinnvoll ist." };
  if (a[1]?.includes("keine Website") || a[4]?.includes("komplett"))
    return { tag: "Neuer Auftritt", h: "Du bist bereit für einen starken Start.", b: "Wir bauen dir in 7–14 Tagen eine Website, die vom ersten Tag an Anfragen generiert." };
  if (a[2]?.includes("Google") || a[4]?.includes("Google"))
    return { tag: "SEO-Potenzial", h: "Dein Google-Ranking kostet dich täglich Kunden.", b: "Mit der richtigen Seitenstruktur und lokalem SEO kannst du messbar mehr Anfragen gewinnen." };
  if (a[3]?.includes("keine") || a[3]?.includes("1–3"))
    return { tag: "Conversion-Problem", h: "Mehr Traffic hilft nicht – deine Seite muss konvertieren.", b: "Das Problem liegt meist in fehlenden Kontaktwegen. Wir beheben das konkret – in 7–14 Tagen." };
  return { tag: "Wachstumspotenzial", h: "Du weißt, dass mehr möglich ist.", b: "Ein professioneller Auftritt ist oft der Unterschied zwischen Auftrag und Absprung." };
}

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const ROOT_BASE = { minHeight: "100vh", color: "#f0efe9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", padding: "64px 20px 32px", position: "relative" };
const CARD = { width: "100%", maxWidth: "480px" };
const Logo = () => <div style={{ position: "absolute", top: 22, left: 22 }}><span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em" }}>KASORIA</span></div>;
const Bar = ({ done, total }) => <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.07)" }}><div style={{ height: "100%", width: `${(done / total) * 100}%`, background: "#f0efe9", transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)" }} /></div>;
const FL = ({ c }) => <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,239,233,0.35)", marginBottom: 4 }}>{c}</label>;

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onStart }) {
  const t = useCountdown();
  return (
    <div style={{ ...ROOT_BASE, background: "#0a0a0a" }}><style>{CSS}</style><Logo />
      <div style={{ ...CARD, display: "flex", flexDirection: "column", gap: 28, textAlign: "center", alignItems: "center" }}>
        <div className="au d1"><span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(240,239,233,0.32)" }}>Kostenloser Website-Check · 2 Minuten</span></div>
        <div className="au d2">
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(28px,6vw,46px)", fontWeight: 400, lineHeight: 1.12 }}>
            Deine Website kostet<br /><em style={{ color: "rgba(240,239,233,0.38)" }}>dich täglich Kunden.</em>
          </h1>
        </div>
        <div className="au d3"><p style={{ fontSize: 14.5, lineHeight: 1.78, color: "rgba(240,239,233,0.5)", maxWidth: 380 }}>5 kurze Fragen – und wir melden uns persönlich bei dir mit einer konkreten Einschätzung.</p></div>
        <div className="au d4" style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 340, textAlign: "left" }}>
          {["5 Fragen beantworten", "Wir analysieren deine Situation", "Christian meldet sich persönlich"].map((s, i) => (
            <div key={i} className="step-row">
              <div className="step-num">{i + 1}</div>
              <span style={{ fontSize: 13, color: "rgba(240,239,233,0.55)", lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
        {t && (
          <div className="au d4" style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <span className="badge">⚡ Einführungsangebot endet in</span>
            <div className="cd">
              <div className="cd-box"><div className="cd-n">{t.h}</div><div className="cd-l">Std</div></div>
              <span className="cd-s">:</span>
              <div className="cd-box"><div className="cd-n">{t.m}</div><div className="cd-l">Min</div></div>
              <span className="cd-s">:</span>
              <div className="cd-box"><div className="cd-n">{t.s}</div><div className="cd-l">Sek</div></div>
            </div>
          </div>
        )}
        <div className="au d5" style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <button className="btn-p" onClick={onStart}>Check starten →</button>
          <p style={{ fontSize: 11, color: "rgba(240,239,233,0.2)" }}>Kostenlos · Kein Spam · DSGVO-konform</p>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 20, fontSize: 10, color: "rgba(240,239,233,0.15)" }}>© 2026 Kasoria · kasoria.com</div>
    </div>
  );
}

// ─── QUESTION SLIDE ───────────────────────────────────────────────────────────
function QuestionSlide({ slide, qDone, qTotal, onAnswer }) {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ ...ROOT_BASE, background: "#0a0a0a" }}><style>{CSS}</style><Logo /><Bar done={qDone} total={qTotal} />
      <div style={{ ...CARD, display: "flex", flexDirection: "column", gap: 26 }}>
        <div className="au d1" style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,239,233,0.28)" }}>Frage {qDone + 1} / {qTotal}</span>
          <span style={{ fontSize: 10, color: "rgba(240,239,233,0.18)" }}>{Math.round((qDone / qTotal) * 100)}%</span>
        </div>
        <div className="au d2"><h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(19px,4vw,27px)", fontWeight: 400, lineHeight: 1.25 }}>{slide.q}</h2></div>
        <div className="au d3" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {slide.opts.map((opt, i) => (
            <button key={opt} className={`opt${sel === opt ? " sel" : ""}`} onClick={() => setSel(opt)}>
              <span className="lbl" style={{ color: sel === opt ? "rgba(10,10,10,0.4)" : "rgba(255,255,255,0.25)" }}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          ))}
        </div>
        <div className="au d4">
          <button className="btn-p" onClick={() => { if (!sel) return; onAnswer(sel); }} disabled={!sel}>Weiter →</button>
        </div>
      </div>
    </div>
  );
}

// ─── TRUST SLIDE: TESTIMONIAL ─────────────────────────────────────────────────
// Slightly warmer background tint to signal a different "mode"
function TestimonialSlide({ content, qDone, qTotal, onNext }) {
  return (
    <div style={{ ...ROOT_BASE, background: "#0d0c0b" }}><style>{CSS}</style><Logo /><Bar done={qDone} total={qTotal} />
      <div style={{ ...CARD, display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Bridge line — reacts to their answer */}
        <div className="au d1">
          <p style={{ fontSize: 13, color: "rgba(240,239,233,0.42)", lineHeight: 1.6, fontStyle: "italic" }}>
            {content.bridge}
          </p>
        </div>

        {/* Quote */}
        <div className="au d2" style={{ borderLeft: "2px solid rgba(255,255,255,0.1)", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(17px,3.5vw,22px)", fontWeight: 400, lineHeight: 1.5, fontStyle: "italic", color: "#f0efe9" }}>
            "{content.quote}"
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div className="stars">★★★★★</div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#f0efe9", marginTop: 2 }}>{content.author}</p>
            <p style={{ fontSize: 11, color: "rgba(240,239,233,0.4)" }}>{content.company}</p>
            <p style={{ fontSize: 10, color: "rgba(240,239,233,0.24)", marginTop: 1 }}>{content.context}</p>
          </div>
        </div>

        <div className="au d3">
          <button className="btn-p" onClick={onNext}>Weiter →</button>
        </div>
      </div>
    </div>
  );
}

// ─── TRUST SLIDE: STATS ───────────────────────────────────────────────────────
function StatsSlide({ content, qDone, qTotal, onNext }) {
  return (
    <div style={{ ...ROOT_BASE, background: "#0d0c0b" }}><style>{CSS}</style><Logo /><Bar done={qDone} total={qTotal} />
      <div style={{ ...CARD, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Bridge line */}
        <div className="au d1">
          <p style={{ fontSize: 13, color: "rgba(240,239,233,0.42)", lineHeight: 1.6, fontStyle: "italic" }}>
            {content.bridge}
          </p>
        </div>

        <div className="au d2" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(20px,4vw,26px)", fontWeight: 400, lineHeight: 1.25 }}>{content.headline}</h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.72, color: "rgba(240,239,233,0.5)" }}>{content.sub}</p>
        </div>

        <div className="au d3 stat-grid">
          {content.stats.map(s => (
            <div key={s.label} className="stat-box">
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: "#f0efe9", lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(240,239,233,0.38)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="au d4">
          <button className="btn-p" onClick={onNext}>Weiter →</button>
        </div>
      </div>
    </div>
  );
}

// ─── LEAD CAPTURE ─────────────────────────────────────────────────────────────
function LeadCapture({ onSubmit, showPrice }) {
  const [v, setV] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const t = useCountdown();
  const go = async () => {
    if (!v.name.trim() || !v.email.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    onSubmit(v);
  };
  return (
    <div style={{ ...ROOT_BASE, background: "#0a0a0a" }}><style>{CSS}</style><Logo /><Bar done={QUESTIONS.length} total={QUESTIONS.length} />
      <div style={{ ...CARD, display: "flex", flexDirection: "column", gap: 28 }}>
        <div className="au d1"><span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,239,233,0.3)" }}>Letzter Schritt</span></div>
        <div className="au d2"><h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(22px,4vw,32px)", fontWeight: 400, lineHeight: 1.2 }}>Wir melden uns<br /><em style={{ color: "rgba(240,239,233,0.4)" }}>persönlich bei dir.</em></h2></div>
        <div className="au d2" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["Christian analysiert deine Antworten persönlich", "Kostenloses 15-Min-Gespräch – ehrlich, kein Verkaufsdruck", "Du bekommst eine konkrete Einschätzung deiner Situation"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.2)", flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: 13, color: "rgba(240,239,233,0.5)", lineHeight: 1.55 }}>{s}</span>
            </div>
          ))}
        </div>
        {showPrice && (
          <div className="au d3" style={{ background: "rgba(255,220,100,0.06)", border: "1px solid rgba(255,220,100,0.18)", borderRadius: 10, padding: "14px 18px", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 18 }}>⚡</span>
            <div>
              <p style={{ fontSize: 12.5, color: "rgba(240,239,233,0.6)", lineHeight: 1.6 }}>
                Einführungsangebot: Website ab <strong style={{ color: "#ffd864" }}>799 €</strong> statt regulär <span style={{ textDecoration: "line-through", opacity: 0.45 }}>2.500 €</span>
              </p>
              {t && <p style={{ fontSize: 11, color: "rgba(255,220,100,0.45)", marginTop: 3 }}>Endet in {t.h}:{t.m}:{t.s}</p>}
            </div>
          </div>
        )}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
        <div className="au d3" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div><FL c="Dein Vorname *" /><input className="inp" placeholder="Max" value={v.name} onChange={e => setV({ ...v, name: e.target.value })} /></div>
          <div><FL c="E-Mail *" /><input className="inp" type="email" placeholder="max@unternehmen.de" value={v.email} onChange={e => setV({ ...v, email: e.target.value })} /></div>
          <div><FL c={<>Telefon <span style={{ opacity: 0.38 }}>(für schnellere Kontaktaufnahme)</span></>} /><input className="inp" type="tel" placeholder="+49 160 000 0000" value={v.phone} onChange={e => setV({ ...v, phone: e.target.value })} /></div>
        </div>
        <div className="au d4" style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <button className="btn-p" onClick={go} disabled={!v.name.trim() || !v.email.trim() || loading}>{loading ? "Wird übermittelt…" : "Jetzt Gespräch anfragen →"}</button>
          <p style={{ fontSize: 11, color: "rgba(240,239,233,0.2)", textAlign: "center" }}>Keine Weitergabe an Dritte · DSGVO-konform</p>
        </div>
      </div>
    </div>
  );
}

// ─── THANK YOU ────────────────────────────────────────────────────────────────
function ThankYou({ result, name }) {
  return (
    <div style={{ ...ROOT_BASE, background: "#0a0a0a" }}><style>{CSS}</style><Logo /><Bar done={QUESTIONS.length} total={QUESTIONS.length} />
      <div style={{ ...CARD, display: "flex", flexDirection: "column", gap: 26, textAlign: "center", alignItems: "center" }}>
        <div className="au d1"><div style={{ width: 46, height: 46, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: "rgba(240,239,233,0.6)" }}>✓</div></div>
        <div className="au d2" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,239,233,0.3)" }}>{result.tag}</span>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(20px,4vw,30px)", fontWeight: 400, lineHeight: 1.2 }}>
            {name ? `Danke, ${name}.` : "Danke."}<br /><em style={{ color: "rgba(240,239,233,0.42)" }}>Wir melden uns bald.</em>
          </h2>
        </div>
        <div className="au d3"><p style={{ fontSize: 14.5, lineHeight: 1.75, color: "rgba(240,239,233,0.52)", maxWidth: 400 }}>{result.b}</p></div>
        <div className="au d3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 22px", width: "100%", textAlign: "left" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,239,233,0.28)", marginBottom: 14 }}>Was passiert jetzt</p>
          {["Christian analysiert deine Antworten persönlich", "Du bekommst eine E-Mail oder einen Anruf – innerhalb von 24h", "Kostenloses 15-Min-Gespräch: konkrete Einschätzung, keine Floskeln"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 2 ? 10 : 0 }}>
              <span style={{ fontSize: 11, color: "rgba(240,239,233,0.3)", marginTop: 1, flexShrink: 0 }}>0{i + 1}</span>
              <span style={{ fontSize: 13, color: "rgba(240,239,233,0.52)", lineHeight: 1.55 }}>{s}</span>
            </div>
          ))}
        </div>
        <div className="au d4"><p style={{ fontSize: 11, color: "rgba(240,239,233,0.2)" }}>Schon neugierig? <a href="https://kasoria.com" target="_blank" rel="noreferrer" style={{ color: "rgba(240,239,233,0.45)", textDecoration: "underline" }}>kasoria.com</a></p></div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
// AB TEST (Next.js):
//
//   // app/check/page.tsx
//   export default function Page({ searchParams }) {
//     const variant = searchParams?.v === "b" ? "b" : "a"
//     return <QuizFunnel variant={variant} />
//   }
//
//   Ad-URL Variante A: kasoria.com/check?v=a  →  Preis sichtbar am Lead-Screen
//   Ad-URL Variante B: kasoria.com/check?v=b  →  Kein Preis irgendwo
//   Tracking: window.gtag?.("event", "lead_submit", { variant })

export default function QuizFunnel({ variant = "a" }) {
  const showPrice = variant !== "b";
  const [phase, setPhase]           = useState("landing");
  const [slideIndex, setSlideIndex] = useState(0);
  const [qDone, setQDone]           = useState(0);
  const [answers, setAnswers]       = useState({});
  const [leadName, setLeadName]     = useState("");

  const advance = () => {
    const next = slideIndex + 1;
    if (next >= SLIDES.length) setPhase("lead");
    else setSlideIndex(next);
  };

  const handleAnswer = (val) => {
    const slide = SLIDES[slideIndex];
    setAnswers(prev => ({ ...prev, [slide.qKey]: val }));
    setQDone(n => n + 1);
    advance();
  };

  const handleLead = async (data) => {
    setLeadName(data.name);
    // await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, answers, variant }) });
    // window.gtag?.("event", "lead_submit", { variant });
    setPhase("thanks");
  };

  if (phase === "landing") return <Landing onStart={() => setPhase("quiz")} />;

  if (phase === "quiz") {
    const slide = SLIDES[slideIndex];
    if (slide.type === "q") {
      return <QuestionSlide key={slideIndex} slide={slide} qDone={qDone} qTotal={QUESTIONS.length} onAnswer={handleAnswer} />;
    }
    if (slide.trustFn === "trust1") {
      return <TestimonialSlide key={slideIndex} content={getTrust1(answers)} qDone={qDone} qTotal={QUESTIONS.length} onNext={advance} />;
    }
    if (slide.trustFn === "trust2") {
      return <StatsSlide key={slideIndex} content={getTrust2(answers)} qDone={qDone} qTotal={QUESTIONS.length} onNext={advance} />;
    }
  }

  if (phase === "lead") return <LeadCapture onSubmit={handleLead} showPrice={showPrice} />;
  return <ThankYou result={getResult(answers)} name={leadName} />;
}