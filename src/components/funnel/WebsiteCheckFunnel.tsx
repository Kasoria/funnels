"use client";

import { useState, useEffect } from "react";
import { FunnelLogo } from "./FunnelLogo";
import { FunnelBar } from "./FunnelBar";

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────

interface CountdownTime {
  h: string;
  m: string;
  s: string;
}

function useCountdown(): CountdownTime | null {
  const [deadline] = useState(() => Date.now() + 47 * 3_600_000 + 23 * 60_000);
  const [time, setTime] = useState<CountdownTime | null>(null);

  useEffect(() => {
    const tick = () => {
      const delta = deadline - Date.now();
      if (delta <= 0) {
        setTime({ h: "00", m: "00", s: "00" });
        return;
      }
      setTime({
        h: String(Math.floor(delta / 3_600_000)).padStart(2, "0"),
        m: String(Math.floor((delta % 3_600_000) / 60_000)).padStart(2, "0"),
        s: String(Math.floor((delta % 60_000) / 1_000)).padStart(2, "0"),
      });
    };
    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [deadline]);

  return time;
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Answers = Record<number, string>;

interface TrustContent1 {
  bridge: string;
  quote: string;
  author: string;
  company: string;
  context: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface TrustContent2 {
  bridge: string;
  headline: string;
  sub: string;
  stats: StatItem[];
}

interface ResultContent {
  tag: string;
  h: string;
  b: string;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

// ─── QUESTION SLIDES ──────────────────────────────────────────────────────────

interface QuestionSlideData {
  type: "q";
  qKey: number;
  q: string;
  opts: string[];
}

interface TrustSlideData {
  type: "trust";
  trustFn: "trust1" | "trust2";
}

type SlideData = QuestionSlideData | TrustSlideData;

const SLIDES: SlideData[] = [
  {
    type: "q", qKey: 0,
    q: "Was beschreibt dein Unternehmen am besten?",
    opts: ["Handwerk & Bau", "Dienstleistung & Beratung", "Gesundheit & Beauty", "Gastronomie & Handel", "Sonstiges"],
  },
  {
    type: "q", qKey: 1,
    q: "Wie sieht deine Website-Situation gerade aus?",
    opts: ["Ich habe noch keine Website", "Ich habe eine – sie bringt kaum Anfragen", "Ich habe eine – bin damit unzufrieden"],
  },
  { type: "trust", trustFn: "trust1" },
  {
    type: "q", qKey: 2,
    q: "Was ist dein größtes Online-Problem?",
    opts: ["Zu wenig Kontaktanfragen", "Kaum bei Google sichtbar", "Veraltetes / unprofessionelles Design", "Technik-Probleme & schlechte Ladezeit"],
  },
  {
    type: "q", qKey: 3,
    q: "Wie viele Anfragen kommen aktuell pro Monat über deine Website?",
    opts: ["Kaum oder keine", "1–3 Anfragen", "4–10 Anfragen", "Mehr als 10"],
  },
  { type: "trust", trustFn: "trust2" },
  {
    type: "q", qKey: 4,
    q: "Was ist dein wichtigstes Ziel für die nächsten 6 Monate?",
    opts: ["Deutlich mehr Kontaktanfragen", "Besser bei Google gefunden werden", "Professionellerer Markenauftritt", "Alles – komplett neu starten"],
  },
  {
    type: "q", qKey: 5,
    q: "Was ist dein ungefähres Budget für eine neue Website?",
    opts: ["Unter 500 €", "500 – 1.500 €", "1.500 – 4.000 €", "4.000 € und mehr"],
  },
];

const QUESTIONS = SLIDES.filter((s): s is QuestionSlideData => s.type === "q");

// ─── CONTEXTUAL TRUST CONTENT ─────────────────────────────────────────────────

function getTrust1(answers: Answers): TrustContent1 {
  const situation = answers[1] ?? "";

  if (situation.includes("keine Website")) {
    return {
      bridge: "Viele unserer Kunden haben genau da gestartet.",
      quote: "Mega zufrieden! Wir treten jetzt endlich professionell bei Ausschreibungen auf.",
      author: "Vasil Stoyanov",
      company: "SPEDO GmbH · Hamburg",
      context: "Logistik & Kurierdienst · vorher: keine Website · Projekt: 11 Tage",
    };
  }
  if (situation.includes("kaum Anfragen")) {
    return {
      bridge: "Das hören wir oft – und es lässt sich konkret lösen.",
      quote: "Ich bin absolut begeistert. Das Buchungstool meiner Website wurde grandios – und kommt auch bei meiner Kundschaft extrem gut an.",
      author: "Michelle Rathjen",
      company: "Jingles Katzenstube · Niedersachsen",
      context: "Katzenpension · Anfragen laufen jetzt automatisch rein",
    };
  }
  return {
    bridge: "Damit bist du nicht allein.",
    quote: "Wir sind absolut zufrieden mit dem Ergebnis. Die Website ist Hammer, die Kunden sind auch begeistert.",
    author: "Denitsa Deneva",
    company: "Tattoo Avenue · Neu Wulmstorf",
    context: "Tattoo & Piercing Studio · Neues Design + Local SEO",
  };
}

function getTrust2(answers: Answers): TrustContent2 {
  const problem = answers[2] ?? "";

  if (problem.includes("Kontaktanfragen")) {
    return {
      bridge: "Zu wenig Anfragen ist kein Traffic-Problem. Es ist ein Conversion-Problem.",
      headline: "Die meisten Websites verlieren Leads still und leise.",
      sub: "Kein klarer Kontaktweg, kein Vertrauen, kein Formular, das funktioniert. Das beheben wir gezielt – nicht mit mehr Werbung, sondern mit besserer Seite.",
      stats: [
        { value: "3×",   label: "Mehr Anfragen nach Relaunch" },
        { value: "< 2s", label: "Ladezeit" },
        { value: "24/7", label: "Automatische Leaderfassung" },
        { value: "7–14", label: "Tage bis Launch" },
      ],
    };
  }
  if (problem.includes("Google")) {
    return {
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
  }
  if (problem.includes("Design")) {
    return {
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
  }
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

function getResult(answers: Answers): ResultContent {
  if ((answers[5] ?? "").includes("Unter 500")) {
    return {
      tag: "Budget-Check",
      h: "Lass uns kurz sprechen.",
      b: "Unsere Websites starten bei 799 €. Im kostenlosen Gespräch schauen wir, was in deiner Situation sinnvoll ist.",
    };
  }
  if (answers[1]?.includes("keine Website") || answers[4]?.includes("komplett")) {
    return {
      tag: "Neuer Auftritt",
      h: "Du bist bereit für einen starken Start.",
      b: "Wir bauen dir in 7–14 Tagen eine Website, die vom ersten Tag an Anfragen generiert.",
    };
  }
  if (answers[2]?.includes("Google") || answers[4]?.includes("Google")) {
    return {
      tag: "SEO-Potenzial",
      h: "Dein Google-Ranking kostet dich täglich Kunden.",
      b: "Mit der richtigen Seitenstruktur und lokalem SEO kannst du messbar mehr Anfragen gewinnen.",
    };
  }
  if (answers[3]?.includes("keine") || answers[3]?.includes("1–3")) {
    return {
      tag: "Conversion-Problem",
      h: "Mehr Traffic hilft nicht – deine Seite muss konvertieren.",
      b: "Das Problem liegt meist in fehlenden Kontaktwegen. Wir beheben das konkret – in 7–14 Tagen.",
    };
  }
  return {
    tag: "Wachstumspotenzial",
    h: "Du weißt, dass mehr möglich ist.",
    b: "Ein professioneller Auftritt ist oft der Unterschied zwischen Auftrag und Absprung.",
  };
}

// ─── SHARED LAYOUT ────────────────────────────────────────────────────────────

const SCREEN_BASE = "min-h-screen flex flex-col items-center justify-center font-body px-5 py-16 relative";
const CARD = "w-full max-w-[480px]";

// ─── LANDING ──────────────────────────────────────────────────────────────────

interface LandingProps {
  onStart: () => void;
}

function Landing({ onStart }: LandingProps) {
  const countdown = useCountdown();

  return (
    <div className={`${SCREEN_BASE} bg-[#0a0a0a]`}>
      <FunnelLogo />
      <div className={`${CARD} flex flex-col gap-7 text-center items-center`}>

        <div className="au d1">
          <span className="text-[10px] tracking-[0.16em] uppercase text-[rgba(240,239,233,0.32)]">
            Kostenloser Website-Check · 2 Minuten
          </span>
        </div>

        <div className="au d2">
          <h1 className="font-heading text-[clamp(28px,6vw,46px)] font-normal leading-[1.12] text-[#f0efe9]">
            Deine Website kostet<br />
            <em className="text-[rgba(240,239,233,0.38)]">dich täglich Kunden.</em>
          </h1>
        </div>

        <div className="au d3">
          <p className="text-[14.5px] leading-[1.78] text-[rgba(240,239,233,0.5)] max-w-[380px]">
            5 kurze Fragen – und wir melden uns persönlich bei dir mit einer konkreten Einschätzung.
          </p>
        </div>

        <div className="au d4 flex flex-col gap-3 w-full max-w-[340px] text-left">
          {["5 Fragen beantworten", "Wir analysieren deine Situation", "Christian meldet sich persönlich"].map(
            (step, index) => (
              <div key={index} className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full flex-shrink-0 border border-white/20 flex items-center justify-center text-[10px] font-bold text-[rgba(240,239,233,0.45)] mt-px">
                  {index + 1}
                </div>
                <span className="text-[13px] text-[rgba(240,239,233,0.55)] leading-[1.5]">{step}</span>
              </div>
            )
          )}
        </div>

        {countdown && (
          <div className="au d4 flex flex-col gap-2 items-center">
            <span className="inline-flex items-center bg-[rgba(255,220,100,0.1)] border border-[rgba(255,220,100,0.25)] text-[#ffd864] rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.06em] uppercase">
              ⚡ Einführungsangebot endet in
            </span>
            <div className="flex items-center gap-1.5 justify-center">
              {[{ val: countdown.h, label: "Std" }, { val: countdown.m, label: "Min" }, { val: countdown.s, label: "Sek" }].map(
                ({ val, label }, idx) => (
                  <>
                    <div key={label} className="bg-white/[0.06] border border-white/10 rounded-[7px] px-3 py-2 min-w-[52px] text-center">
                      <div className="text-[22px] font-bold text-[#f0efe9] leading-none">{val}</div>
                      <div className="text-[9px] tracking-[0.1em] uppercase text-[rgba(240,239,233,0.3)] mt-0.5">{label}</div>
                    </div>
                    {idx < 2 && (
                      <span key={`sep-${idx}`} className="text-[20px] text-[rgba(240,239,233,0.2)] mb-2">:</span>
                    )}
                  </>
                )
              )}
            </div>
          </div>
        )}

        <div className="au d5 flex flex-col gap-2 w-full">
          <button
            className="bg-[#f0efe9] text-[#0a0a0a] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full"
            onClick={onStart}
          >
            Check starten →
          </button>
          <p className="text-[11px] text-[rgba(240,239,233,0.2)] text-center">Kostenlos · Kein Spam · DSGVO-konform</p>
        </div>
      </div>

      <div className="absolute bottom-5 text-[10px] text-[rgba(240,239,233,0.15)]">
        © 2026 Kasoria · kasoria.com
      </div>
    </div>
  );
}

// ─── QUESTION SLIDE ───────────────────────────────────────────────────────────

interface QuestionSlideProps {
  slide: QuestionSlideData;
  qDone: number;
  qTotal: number;
  onAnswer: (value: string) => void;
}

function QuestionSlide({ slide, qDone, qTotal, onAnswer }: QuestionSlideProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={`${SCREEN_BASE} bg-[#0a0a0a]`}>
      <FunnelLogo />
      <FunnelBar done={qDone} total={qTotal} />

      <div className={`${CARD} flex flex-col gap-6`}>

        <div className="au d1 flex justify-between">
          <span className="text-[10px] tracking-[0.12em] uppercase text-[rgba(240,239,233,0.28)]">
            Frage {qDone + 1} / {qTotal}
          </span>
          <span className="text-[10px] text-[rgba(240,239,233,0.18)]">
            {Math.round((qDone / qTotal) * 100)}%
          </span>
        </div>

        <div className="au d2">
          <h2 className="font-heading text-[clamp(19px,4vw,27px)] font-normal leading-[1.25] text-[#f0efe9]">
            {slide.q}
          </h2>
        </div>

        <div className="au d3 flex flex-col gap-2">
          {slide.opts.map((option, index) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`text-left px-[18px] py-[14px] rounded-[9px] cursor-pointer text-[13.5px] font-normal transition-all duration-[180ms] flex items-center gap-3 leading-[1.45] w-full font-body ${
                selected === option
                  ? "bg-[#f0efe9] text-[#0a0a0a] border border-[#f0efe9] font-semibold"
                  : "bg-transparent border border-white/[0.11] text-[rgba(240,239,233,0.88)] hover:border-white/30 hover:bg-white/[0.04]"
              }`}
            >
              <span className={`w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold border ${
                selected === option ? "border-[rgba(10,10,10,0.4)] text-[rgba(10,10,10,0.4)]" : "border-current text-[rgba(255,255,255,0.25)]"
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>

        <div className="au d4">
          <button
            className="bg-[#f0efe9] text-[#0a0a0a] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full disabled:opacity-30 disabled:cursor-default"
            onClick={() => { if (selected) onAnswer(selected); }}
            disabled={!selected}
          >
            Weiter →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TRUST SLIDE: TESTIMONIAL ─────────────────────────────────────────────────

interface TestimonialSlideProps {
  content: TrustContent1;
  qDone: number;
  qTotal: number;
  onNext: () => void;
}

function TestimonialSlide({ content, qDone, qTotal, onNext }: TestimonialSlideProps) {
  return (
    <div className={`${SCREEN_BASE} bg-[#0d0c0b]`}>
      <FunnelLogo />
      <FunnelBar done={qDone} total={qTotal} />

      <div className={`${CARD} flex flex-col gap-7`}>

        <div className="au d1">
          <p className="text-[13px] text-[rgba(240,239,233,0.42)] leading-[1.6] italic">
            {content.bridge}
          </p>
        </div>

        <div className="au d2 border-l-2 border-white/10 pl-5 flex flex-col gap-4">
          <p className="font-heading text-[clamp(17px,3.5vw,22px)] font-normal leading-[1.5] italic text-[#f0efe9]">
            &ldquo;{content.quote}&rdquo;
          </p>
          <div className="flex flex-col gap-1">
            <div className="text-[#ffd864] text-[13px] tracking-[3px]">★★★★★</div>
            <p className="text-[13px] font-semibold text-[#f0efe9] mt-0.5">{content.author}</p>
            <p className="text-[11px] text-[rgba(240,239,233,0.4)]">{content.company}</p>
            <p className="text-[10px] text-[rgba(240,239,233,0.24)] mt-px">{content.context}</p>
          </div>
        </div>

        <div className="au d3">
          <button
            className="bg-[#f0efe9] text-[#0a0a0a] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full"
            onClick={onNext}
          >
            Weiter →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TRUST SLIDE: STATS ───────────────────────────────────────────────────────

interface StatsSlideProps {
  content: TrustContent2;
  qDone: number;
  qTotal: number;
  onNext: () => void;
}

function StatsSlide({ content, qDone, qTotal, onNext }: StatsSlideProps) {
  return (
    <div className={`${SCREEN_BASE} bg-[#0d0c0b]`}>
      <FunnelLogo />
      <FunnelBar done={qDone} total={qTotal} />

      <div className={`${CARD} flex flex-col gap-6`}>

        <div className="au d1">
          <p className="text-[13px] text-[rgba(240,239,233,0.42)] leading-[1.6] italic">
            {content.bridge}
          </p>
        </div>

        <div className="au d2 flex flex-col gap-2">
          <h3 className="font-heading text-[clamp(20px,4vw,26px)] font-normal leading-[1.25] text-[#f0efe9]">
            {content.headline}
          </h3>
          <p className="text-[13.5px] leading-[1.72] text-[rgba(240,239,233,0.5)]">
            {content.sub}
          </p>
        </div>

        <div className="au d3 grid grid-cols-2 gap-2.5 w-full">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.04] border border-white/[0.08] rounded-[10px] p-4 text-center"
            >
              <div className="font-heading text-[26px] text-[#f0efe9] leading-none">{stat.value}</div>
              <div className="text-[11px] text-[rgba(240,239,233,0.38)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="au d4">
          <button
            className="bg-[#f0efe9] text-[#0a0a0a] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full"
            onClick={onNext}
          >
            Weiter →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LEAD CAPTURE ─────────────────────────────────────────────────────────────

interface LeadCaptureProps {
  onSubmit: (data: LeadData) => void;
  showPrice: boolean;
}

function LeadCapture({ onSubmit, showPrice }: LeadCaptureProps) {
  const [formValues, setFormValues] = useState<LeadData>({ name: "", email: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const countdown = useCountdown();

  const handleSubmit = async () => {
    if (!formValues.name.trim() || !formValues.email.trim()) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    onSubmit(formValues);
  };

  return (
    <div className={`${SCREEN_BASE} bg-[#0a0a0a]`}>
      <FunnelLogo />
      <FunnelBar done={QUESTIONS.length} total={QUESTIONS.length} />

      <div className={`${CARD} flex flex-col gap-7`}>

        <div className="au d1">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[rgba(240,239,233,0.3)]">
            Letzter Schritt
          </span>
        </div>

        <div className="au d2">
          <h2 className="font-heading text-[clamp(22px,4vw,32px)] font-normal leading-[1.2] text-[#f0efe9]">
            Wir melden uns<br />
            <em className="text-[rgba(240,239,233,0.4)]">persönlich bei dir.</em>
          </h2>
        </div>

        <div className="au d2 flex flex-col gap-2.5">
          {[
            "Christian analysiert deine Antworten persönlich",
            "Kostenloses 15-Min-Gespräch – ehrlich, kein Verkaufsdruck",
            "Du bekommst eine konkrete Einschätzung deiner Situation",
          ].map((item, index) => (
            <div key={index} className="flex gap-2.5 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0 mt-[7px]" />
              <span className="text-[13px] text-[rgba(240,239,233,0.5)] leading-[1.55]">{item}</span>
            </div>
          ))}
        </div>

        {showPrice && (
          <div className="au d3 bg-[rgba(255,220,100,0.06)] border border-[rgba(255,220,100,0.18)] rounded-[10px] px-[18px] py-3.5 flex gap-3 items-center">
            <span className="text-lg">⚡</span>
            <div>
              <p className="text-[12.5px] text-[rgba(240,239,233,0.6)] leading-[1.6]">
                Einführungsangebot: Website ab{" "}
                <strong className="text-[#ffd864]">799 €</strong>{" "}
                statt regulär{" "}
                <span className="line-through opacity-45">2.500 €</span>
              </p>
              {countdown && (
                <p className="text-[11px] text-[rgba(255,220,100,0.45)] mt-0.5">
                  Endet in {countdown.h}:{countdown.m}:{countdown.s}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="h-px bg-white/[0.07]" />

        <div className="au d3 flex flex-col gap-[22px]">
          {[
            { label: "Dein Vorname *", type: "text", placeholder: "Max", key: "name" as const },
            { label: "E-Mail *", type: "email", placeholder: "max@unternehmen.de", key: "email" as const },
            { label: "Telefon (für schnellere Kontaktaufnahme)", type: "tel", placeholder: "+49 160 000 0000", key: "phone" as const },
          ].map(({ label, type, placeholder, key }) => (
            <div key={key}>
              <label className="block text-[10px] tracking-[0.12em] uppercase text-[rgba(240,239,233,0.35)] mb-1">
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={formValues[key]}
                onChange={(event) => setFormValues({ ...formValues, [key]: event.target.value })}
                className="bg-transparent border-none border-b border-white/[0.16] text-[#f0efe9] font-body text-[15px] py-3 w-full outline-none transition-[border-color] duration-200 focus:border-b-white/60 placeholder:text-[rgba(255,255,255,0.22)] placeholder:text-[13px]"
              />
            </div>
          ))}
        </div>

        <div className="au d4 flex flex-col gap-2">
          <button
            className="bg-[#f0efe9] text-[#0a0a0a] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full disabled:opacity-30 disabled:cursor-default"
            onClick={handleSubmit}
            disabled={!formValues.name.trim() || !formValues.email.trim() || isLoading}
          >
            {isLoading ? "Wird übermittelt…" : "Jetzt Gespräch anfragen →"}
          </button>
          <p className="text-[11px] text-[rgba(240,239,233,0.2)] text-center">
            Keine Weitergabe an Dritte · DSGVO-konform
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── THANK YOU ────────────────────────────────────────────────────────────────

interface ThankYouProps {
  result: ResultContent;
  name: string;
}

function ThankYou({ result, name }: ThankYouProps) {
  return (
    <div className={`${SCREEN_BASE} bg-[#0a0a0a]`}>
      <FunnelLogo />
      <FunnelBar done={QUESTIONS.length} total={QUESTIONS.length} />

      <div className={`${CARD} flex flex-col gap-6 text-center items-center`}>

        <div className="au d1">
          <div className="w-[46px] h-[46px] rounded-full border border-white/[0.16] flex items-center justify-center text-[17px] text-[rgba(240,239,233,0.6)]">
            ✓
          </div>
        </div>

        <div className="au d2 flex flex-col gap-2.5">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[rgba(240,239,233,0.3)]">
            {result.tag}
          </span>
          <h2 className="font-heading text-[clamp(20px,4vw,30px)] font-normal leading-[1.2] text-[#f0efe9]">
            {name ? `Danke, ${name}.` : "Danke."}<br />
            <em className="text-[rgba(240,239,233,0.42)]">Wir melden uns bald.</em>
          </h2>
        </div>

        <div className="au d3">
          <p className="text-[14.5px] leading-[1.75] text-[rgba(240,239,233,0.52)] max-w-[400px]">
            {result.b}
          </p>
        </div>

        <div className="au d3 bg-white/[0.04] border border-white/[0.08] rounded-[12px] p-[20px_22px] w-full text-left">
          <p className="text-[10px] tracking-[0.12em] uppercase text-[rgba(240,239,233,0.28)] mb-3.5">
            Was passiert jetzt
          </p>
          {[
            "Christian analysiert deine Antworten persönlich",
            "Du bekommst eine E-Mail oder einen Anruf – innerhalb von 24h",
            "Kostenloses 15-Min-Gespräch: konkrete Einschätzung, keine Floskeln",
          ].map((step, index) => (
            <div key={index} className={`flex gap-3 items-start${index < 2 ? " mb-2.5" : ""}`}>
              <span className="text-[11px] text-[rgba(240,239,233,0.3)] mt-px flex-shrink-0">
                0{index + 1}
              </span>
              <span className="text-[13px] text-[rgba(240,239,233,0.52)] leading-[1.55]">{step}</span>
            </div>
          ))}
        </div>

        <div className="au d4">
          <p className="text-[11px] text-[rgba(240,239,233,0.2)]">
            Schon neugierig?{" "}
            <a
              href="https://kasoria.com"
              target="_blank"
              rel="noreferrer"
              className="text-[rgba(240,239,233,0.45)] underline"
            >
              kasoria.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────

type Phase = "landing" | "quiz" | "lead" | "thanks";

interface WebsiteCheckFunnelProps {
  variant?: "a" | "b";
}

export function WebsiteCheckFunnel({ variant = "a" }: WebsiteCheckFunnelProps) {
  const showPrice = variant !== "b";
  const [phase, setPhase] = useState<Phase>("landing");
  const [slideIndex, setSlideIndex] = useState(0);
  const [qDone, setQDone] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [leadName, setLeadName] = useState("");

  const advance = () => {
    const nextIndex = slideIndex + 1;
    if (nextIndex >= SLIDES.length) {
      setPhase("lead");
    } else {
      setSlideIndex(nextIndex);
    }
  };

  const handleAnswer = (value: string) => {
    const currentSlide = SLIDES[slideIndex] as QuestionSlideData;
    setAnswers((prev) => ({ ...prev, [currentSlide.qKey]: value }));
    setQDone((n) => n + 1);
    advance();
  };

  const handleLead = async (data: LeadData) => {
    setLeadName(data.name);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, answers, variant, funnel: "website-check" }),
      });
    } catch {
      // Silent fail — lead is shown thank-you regardless
    }
    setPhase("thanks");
  };

  if (phase === "landing") {
    return <Landing onStart={() => setPhase("quiz")} />;
  }

  if (phase === "quiz") {
    const currentSlide = SLIDES[slideIndex];

    if (currentSlide.type === "q") {
      return (
        <QuestionSlide
          key={slideIndex}
          slide={currentSlide}
          qDone={qDone}
          qTotal={QUESTIONS.length}
          onAnswer={handleAnswer}
        />
      );
    }

    if (currentSlide.trustFn === "trust1") {
      return (
        <TestimonialSlide
          key={slideIndex}
          content={getTrust1(answers)}
          qDone={qDone}
          qTotal={QUESTIONS.length}
          onNext={advance}
        />
      );
    }

    if (currentSlide.trustFn === "trust2") {
      return (
        <StatsSlide
          key={slideIndex}
          content={getTrust2(answers)}
          qDone={qDone}
          qTotal={QUESTIONS.length}
          onNext={advance}
        />
      );
    }
  }

  if (phase === "lead") {
    return <LeadCapture onSubmit={handleLead} showPrice={showPrice} />;
  }

  return <ThankYou result={getResult(answers)} name={leadName} />;
}
