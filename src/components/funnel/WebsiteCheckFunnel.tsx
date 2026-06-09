"use client";

import { useState, useEffect, Fragment } from "react";
import { usePostHog } from "posthog-js/react";
import type { FunnelDict, TrustTestimonial, TrustStats, FunnelResult } from "@/locales/types";
import { FunnelLogo } from "./FunnelLogo";
import { FunnelBar } from "./FunnelBar";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

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

// Answers store the selected option INDEX (0-based), not the string value.
// This makes trust/result logic language-independent.
type Answers = Record<number, number>;

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

interface QuestionSlideData {
  type: "q";
  qKey: number;
  q: string;
  opts: readonly string[];
}

interface TrustSlideData {
  type: "trust";
  trustFn: "trust1" | "trust2";
}

type SlideData = QuestionSlideData | TrustSlideData;

// ─── SLIDE BUILDER ────────────────────────────────────────────────────────────

function buildSlides(dict: FunnelDict): SlideData[] {
  const [q0, q1, q2, q3, q4, q5] = dict.quiz.questions;
  return [
    { type: "q", qKey: 0, q: q0.q, opts: q0.opts },
    { type: "q", qKey: 1, q: q1.q, opts: q1.opts },
    { type: "trust", trustFn: "trust1" },
    { type: "q", qKey: 2, q: q2.q, opts: q2.opts },
    { type: "q", qKey: 3, q: q3.q, opts: q3.opts },
    { type: "trust", trustFn: "trust2" },
    { type: "q", qKey: 4, q: q4.q, opts: q4.opts },
    { type: "q", qKey: 5, q: q5.q, opts: q5.opts },
  ];
}

// ─── ANSWER → CONTENT RESOLVERS ───────────────────────────────────────────────

function resolveTrust1(answers: Answers, dict: FunnelDict): TrustTestimonial {
  const q1 = answers[1] ?? -1;
  if (q1 === 0) return dict.trust1[0]; // no website
  if (q1 === 1) return dict.trust1[1]; // few leads
  return dict.trust1[2];
}

function resolveTrust2(answers: Answers, dict: FunnelDict): TrustStats {
  const q2 = answers[2] ?? -1;
  if (q2 === 0) return dict.trust2[0]; // conversion
  if (q2 === 1) return dict.trust2[1]; // seo
  if (q2 === 2) return dict.trust2[2]; // design
  return dict.trust2[3];              // tech / default
}

function resolveResult(answers: Answers, dict: FunnelDict): FunnelResult {
  if (answers[5] === 0)                          return dict.results[0]; // budget
  if (answers[1] === 0 || answers[4] === 3)      return dict.results[1]; // new site
  if (answers[2] === 1 || answers[4] === 1)      return dict.results[2]; // seo
  if (answers[3] === 0 || answers[3] === 1)      return dict.results[3]; // conversion
  return dict.results[4];                                                 // default
}

// ─── SHARED LAYOUT ────────────────────────────────────────────────────────────

const SCREEN = "min-h-screen flex flex-col items-center justify-center font-body px-5 py-16 relative";
const CARD   = "w-full max-w-[480px]";

// ─── LANDING ──────────────────────────────────────────────────────────────────

function Landing({ dict, lang, onStart }: { dict: FunnelDict; lang: "de" | "en"; onStart: () => void }) {
  const countdown = useCountdown();
  const { landing, countdown: cd } = dict;

  return (
    <div className={`${SCREEN} bg-[#0a0a0a]`}>
      <FunnelLogo />
      <div className={`${CARD} flex flex-col gap-7 text-center items-center`}>

        <div className="au d1">
          <span className="text-[10px] font-medium tracking-[0.16em] uppercase text-[rgba(240,239,233,0.65)]">
            {landing.eyebrow}
          </span>
        </div>

        <div className="au d2">
          <h1 className="font-heading text-[clamp(28px,6vw,46px)] font-normal leading-[1.12] text-[#f0efe9]">
            {landing.headline}<br />
            <em className="text-[#E8C87A]">{landing.headlineAccent}</em>
          </h1>
        </div>

        <div className="au d3">
          <p className="text-[14.5px] leading-[1.78] text-[rgba(240,239,233,0.65)] max-w-[380px]">
            {landing.subtext}
          </p>
        </div>

        <div className="au d4 flex flex-col gap-3 w-full max-w-[340px] text-left">
          {(["✦", "◎", "→"] as const).map((icon, index) => (
            <div key={index} className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full flex-shrink-0 border border-[rgba(232,200,122,0.35)] flex items-center justify-center text-[10px] font-bold text-[#E8C87A] mt-px">
                {icon}
              </div>
              <span className="text-[13px] text-[rgba(240,239,233,0.7)] leading-[1.5]">{landing.steps[index]}</span>
            </div>
          ))}
        </div>

        {countdown && (
          <div className="au d4 flex flex-col gap-2 items-center">
            <span className="inline-flex items-center bg-[rgba(232,200,122,0.12)] border border-[rgba(232,200,122,0.3)] text-[#E8C87A] rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.06em] uppercase">
              {cd.badge}
            </span>
            <div className="flex items-center gap-1.5 justify-center">
              {([
                { val: countdown.h, label: cd.hours },
                { val: countdown.m, label: cd.minutes },
                { val: countdown.s, label: cd.seconds },
              ] as const).map(({ val, label }, idx) => (
                <Fragment key={label}>
                  <div className="bg-[rgba(232,200,122,0.06)] border border-[rgba(232,200,122,0.2)] rounded-[7px] px-3 py-2 min-w-[52px] text-center">
                    <div className="text-[22px] font-bold text-[#f0efe9] leading-none">{val}</div>
                    <div className="text-[9px] font-medium tracking-[0.1em] uppercase text-[rgba(240,239,233,0.65)] mt-0.5">{label}</div>
                  </div>
                  {idx < 2 && (
                    <span className="text-[20px] text-[rgba(240,239,233,0.4)] mb-2">:</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="au d5 flex flex-col gap-2 w-full">
          <button
            className="bg-[#E8C87A] text-[#2A1800] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full"
            onClick={onStart}
          >
            {landing.cta}
          </button>
          <p className="text-[11px] font-medium text-[rgba(240,239,233,0.7)] text-center">{landing.security}</p>
        </div>
      </div>

      <div className="absolute bottom-5 flex flex-col items-center gap-1.5">
        <span className="text-[10px] font-medium text-[rgba(240,239,233,0.55)]">{landing.footer}</span>
        <div className="flex gap-3 text-[10px] text-[rgba(240,239,233,0.35)]">
          <a href={lang === "en" ? "/en/impressum" : "/impressum"} className="hover:text-[rgba(240,239,233,0.6)] transition-colors">{lang === "en" ? "Legal Notice" : "Impressum"}</a>
          <a href={lang === "en" ? "/en/datenschutz" : "/datenschutz"} className="hover:text-[rgba(240,239,233,0.6)] transition-colors">{lang === "en" ? "Privacy Policy" : "Datenschutz"}</a>
        </div>
      </div>
    </div>
  );
}

// ─── QUESTION SLIDE ───────────────────────────────────────────────────────────

interface QuestionSlideProps {
  slide: QuestionSlideData;
  qDone: number;
  questionCount: number;
  dict: FunnelDict;
  onAnswer: (index: number) => void;
}

function QuestionSlide({ slide, qDone, questionCount, dict, onAnswer }: QuestionSlideProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={`${SCREEN} bg-[#0a0a0a]`}>
      <FunnelLogo />
      <FunnelBar done={qDone} total={questionCount} />

      <div className={`${CARD} flex flex-col gap-6`}>

        <div className="au d1 flex justify-between">
          <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[rgba(240,239,233,0.65)]">
            {dict.quiz.progressLabel} {qDone + 1} / {questionCount}
          </span>
          <span className="text-[10px] text-[#E8C87A] font-semibold">
            {Math.round((qDone / questionCount) * 100)}%
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
              onClick={() => setSelected(index)}
              className={`text-left px-[18px] py-[14px] rounded-[9px] cursor-pointer text-[13.5px] font-normal transition-all duration-[180ms] flex items-center gap-3 leading-[1.45] w-full font-body ${
                selected === index
                  ? "bg-[#E8C87A] text-[#2A1800] border border-[#E8C87A] font-semibold"
                  : "bg-transparent border border-[rgba(232,200,122,0.18)] text-[rgba(240,239,233,0.88)] hover:border-[rgba(232,200,122,0.4)] hover:bg-[rgba(232,200,122,0.04)]"
              }`}
            >
              <span className={`w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold border ${
                selected === index
                  ? "border-[rgba(42,24,0,0.5)] text-[rgba(42,24,0,0.6)]"
                  : "border-[rgba(232,200,122,0.4)] text-[rgba(232,200,122,0.65)]"
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>

        <div className="au d4">
          <button
            className="bg-[#E8C87A] text-[#2A1800] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full disabled:opacity-30 disabled:cursor-default"
            onClick={() => { if (selected !== null) onAnswer(selected); }}
            disabled={selected === null}
          >
            {dict.quiz.continueBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TRUST SLIDE: TESTIMONIAL ─────────────────────────────────────────────────

interface TestimonialSlideProps {
  content: TrustTestimonial;
  qDone: number;
  questionCount: number;
  continueBtn: string;
  onNext: () => void;
}

function TestimonialSlide({ content, qDone, questionCount, continueBtn, onNext }: TestimonialSlideProps) {
  return (
    <div className={`${SCREEN} bg-[#0f0f0d]`}>
      <FunnelLogo />
      <FunnelBar done={qDone} total={questionCount} />

      <div className={`${CARD} flex flex-col gap-7`}>

        <div className="au d1">
          <p className="text-[13px] text-[rgba(240,239,233,0.6)] leading-[1.6] italic">
            {content.bridge}
          </p>
        </div>

        <div className="au d2 border-l-2 border-[rgba(232,200,122,0.25)] pl-5 flex flex-col gap-4">
          <p className="font-body text-[clamp(17px,3.5vw,22px)] leading-[1.5] italic text-[#f0efe9]">
            &ldquo;{content.quote}&rdquo;
          </p>
          <div className="flex flex-col gap-1">
            <div className="text-[#E8C87A] text-[13px] tracking-[3px]">★★★★★</div>
            <p className="text-[13px] font-semibold text-[#f0efe9] mt-0.5">{content.author}</p>
            <p className="text-[11px] font-medium text-[rgba(240,239,233,0.7)]">{content.company}</p>
            <p className="text-[10px] font-medium text-[rgba(240,239,233,0.6)] mt-px">{content.context}</p>
          </div>
        </div>

        <div className="au d3">
          <button
            className="bg-[#E8C87A] text-[#2A1800] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full"
            onClick={onNext}
          >
            {continueBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TRUST SLIDE: STATS ───────────────────────────────────────────────────────

interface StatsSlideProps {
  content: TrustStats;
  qDone: number;
  questionCount: number;
  continueBtn: string;
  onNext: () => void;
}

function StatsSlide({ content, qDone, questionCount, continueBtn, onNext }: StatsSlideProps) {
  return (
    <div className={`${SCREEN} bg-[#0f0f0d]`}>
      <FunnelLogo />
      <FunnelBar done={qDone} total={questionCount} />

      <div className={`${CARD} flex flex-col gap-6`}>

        <div className="au d1">
          <p className="text-[13px] text-[rgba(240,239,233,0.6)] leading-[1.6] italic">
            {content.bridge}
          </p>
        </div>

        <div className="au d2 flex flex-col gap-2">
          <h3 className="font-heading text-[clamp(20px,4vw,26px)] font-normal leading-[1.25] text-[#f0efe9]">
            {content.headline}
          </h3>
          <p className="text-[13.5px] leading-[1.72] text-[rgba(240,239,233,0.65)]">
            {content.sub}
          </p>
        </div>

        <div className="au d3 grid grid-cols-2 gap-2.5 w-full">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[rgba(232,200,122,0.05)] border border-[rgba(232,200,122,0.15)] rounded-[10px] p-4 text-center"
            >
              <div className="font-heading text-[26px] text-[#E8C87A] leading-none">{stat.value}</div>
              <div className="text-[11px] font-medium text-[rgba(240,239,233,0.7)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="au d4">
          <button
            className="bg-[#E8C87A] text-[#2A1800] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full"
            onClick={onNext}
          >
            {continueBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LEAD CAPTURE ─────────────────────────────────────────────────────────────

interface LeadCaptureProps {
  dict: FunnelDict;
  questionCount: number;
  showPrice: boolean;
  onSubmit: (data: LeadData) => Promise<void>;
}

function LeadCapture({ dict, questionCount, showPrice, onSubmit }: LeadCaptureProps) {
  const [formValues, setFormValues] = useState<LeadData>({ name: "", email: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const countdown = useCountdown();
  const { lead } = dict;

  const handleSubmit = async () => {
    if (!formValues.name.trim() || !formValues.email.trim()) return;
    setIsLoading(true);
    await onSubmit(formValues);
  };

  return (
    <div className={`${SCREEN} bg-[#0a0a0a]`}>
      <FunnelLogo />
      <FunnelBar done={questionCount} total={questionCount} />

      <div className={`${CARD} flex flex-col gap-7`}>

        <div className="au d1">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[rgba(240,239,233,0.65)]">
            {lead.stepLabel}
          </span>
        </div>

        <div className="au d2">
          <h2 className="font-heading text-[clamp(22px,4vw,32px)] font-normal leading-[1.2] text-[#f0efe9]">
            {lead.headline}<br />
            <em className="text-[#E8C87A]">{lead.headlineAccent}</em>
          </h2>
        </div>

        <div className="au d2 flex flex-col gap-2.5">
          {lead.bullets.map((item, index) => (
            <div key={index} className="flex gap-2.5 items-start">
              <span className="text-[#E8C87A] text-[13px] flex-shrink-0 mt-px">✓</span>
              <span className="text-[13px] text-[rgba(240,239,233,0.7)] leading-[1.55]">{item}</span>
            </div>
          ))}
        </div>

        {showPrice && (
          <div className="au d3 bg-[rgba(232,200,122,0.07)] border border-[rgba(232,200,122,0.22)] rounded-[10px] px-[18px] py-3.5 flex gap-3 items-center">
            <span className="text-lg">⚡</span>
            <div>
              <p className="text-[12.5px] text-[rgba(240,239,233,0.7)] leading-[1.6]">
                {lead.offer.prefix}{" "}
                <strong className="text-[#E8C87A]">{lead.offer.price}</strong>{" "}
                {lead.offer.originalLabel}{" "}
                <span className="line-through opacity-50">{lead.offer.originalPrice}</span>
              </p>
              {countdown && (
                <p className="text-[11px] font-medium text-[rgba(232,200,122,0.6)] mt-0.5">
                  {lead.offer.countdown} {countdown.h}:{countdown.m}:{countdown.s}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="h-px bg-[rgba(232,200,122,0.12)]" />

        <div className="au d3 flex flex-col gap-[22px]">
          {(["name", "email", "phone"] as const).map((key) => (
            <div key={key}>
              <label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-[rgba(240,239,233,0.7)] mb-1">
                {lead.fields[key].label}
              </label>
              <input
                type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                placeholder={lead.fields[key].placeholder}
                value={formValues[key]}
                onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
                className="bg-transparent border-none border-b border-[rgba(232,200,122,0.2)] text-[#f0efe9] font-body text-[15px] py-3 w-full outline-none transition-[border-color] duration-200 focus:border-b-[rgba(232,200,122,0.6)] placeholder:text-[rgba(240,239,233,0.22)] placeholder:text-[13px]"
              />
            </div>
          ))}
        </div>

        <div className="au d4 flex flex-col gap-2">
          <button
            className="bg-[#E8C87A] text-[#2A1800] border-none px-7 py-[15px] font-body font-bold text-xs tracking-[0.07em] uppercase rounded-[9px] cursor-pointer hover:opacity-90 transition-opacity w-full disabled:opacity-30 disabled:cursor-default flex items-center justify-center gap-2"
            onClick={handleSubmit}
            disabled={!formValues.name.trim() || !formValues.email.trim() || isLoading}
          >
            {isLoading && (
              <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {isLoading ? lead.ctaLoading : lead.cta}
          </button>
          <p className="text-[11px] font-medium text-[rgba(240,239,233,0.7)] text-center">
            {lead.security}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── THANK YOU ────────────────────────────────────────────────────────────────

interface ThankYouProps {
  dict: FunnelDict;
  questionCount: number;
  result: FunnelResult;
  name: string;
}

function ThankYou({ dict, questionCount, result, name }: ThankYouProps) {
  const { thanks } = dict;

  return (
    <div className={`${SCREEN} bg-[#0a0a0a]`}>
      <FunnelLogo />
      <FunnelBar done={questionCount} total={questionCount} />

      <div className={`${CARD} flex flex-col gap-6 text-center items-center`}>

        <div className="au d1">
          <div className="w-[46px] h-[46px] rounded-full border border-[rgba(232,200,122,0.3)] flex items-center justify-center text-[17px] text-[#E8C87A]">
            ✓
          </div>
        </div>

        <div className="au d2 flex flex-col gap-2.5">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#E8C87A]">
            {result.tag}
          </span>
          <h2 className="font-heading text-[clamp(20px,4vw,30px)] font-normal leading-[1.2] text-[#f0efe9]">
            {name ? `${thanks.greeting}, ${name}.` : `${thanks.greeting}.`}<br />
            <em className="text-[#E8C87A]">{thanks.headlineAccent}</em>
          </h2>
        </div>

        <div className="au d3">
          <p className="text-[14.5px] leading-[1.75] text-[rgba(240,239,233,0.7)] max-w-[400px]">
            {result.body}
          </p>
        </div>

        <div className="au d3 bg-[rgba(232,200,122,0.04)] border border-[rgba(232,200,122,0.12)] rounded-[12px] p-[20px_22px] w-full text-left">
          <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[rgba(240,239,233,0.65)] mb-3.5">
            {thanks.nextStepsLabel}
          </p>
          {([
            { icon: "👤", text: thanks.nextSteps[0] },
            { icon: "✉️", text: thanks.nextSteps[1] },
            { icon: "💬", text: thanks.nextSteps[2] },
          ] as const).map(({ icon, text }, index) => (
            <div key={index} className={`flex gap-3 items-start${index < 2 ? " mb-2.5" : ""}`}>
              <span className="text-[13px] flex-shrink-0 mt-px">{icon}</span>
              <span className="text-[13px] text-[rgba(240,239,233,0.7)] leading-[1.55]">{text}</span>
            </div>
          ))}
        </div>

        <div className="au d4">
          <p className="text-[11px] font-medium text-[rgba(240,239,233,0.65)]">
            {thanks.curious}{" "}
            <a
              href="https://kasoria.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#E8C87A] underline underline-offset-2"
            >
              kasoria.com →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────

type Phase = "landing" | "quiz" | "lead" | "thanks";

export interface WebsiteCheckFunnelProps {
  dict: FunnelDict;
  variant?: "a" | "b";
  lang?: "de" | "en";
}

export function WebsiteCheckFunnel({ dict, variant: variantProp, lang = "de" }: WebsiteCheckFunnelProps) {
  const posthog = usePostHog();
  const [variant] = useState<"a" | "b">(() => variantProp ?? (Math.random() < 0.5 ? "a" : "b"));

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("v") !== variant) {
      url.searchParams.set("v", variant);
      history.replaceState(null, "", url.toString());
    }
  }, [variant]);

  const showPrice = variant !== "b";
  const slides = buildSlides(dict);
  const questionCount = slides.filter((s) => s.type === "q").length;

  const [phase, setPhase]           = useState<Phase>("landing");
  const [slideIndex, setSlideIndex] = useState(0);
  const [qDone, setQDone]           = useState(0);
  const [answers, setAnswers]       = useState<Answers>({});
  const [leadName, setLeadName]     = useState("");

  const sharedProps = { funnel: "website-check", variant, lang };

  const advance = () => {
    const next = slideIndex + 1;
    if (next >= slides.length) {
      posthog?.capture("funnel_lead_view", sharedProps);
      setPhase("lead");
    } else {
      setSlideIndex(next);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    const currentSlide = slides[slideIndex] as QuestionSlideData;
    posthog?.capture("funnel_question_answered", {
      ...sharedProps,
      question_index: currentSlide.qKey,
      answer_index: selectedIndex,
    });
    setAnswers((prev) => ({ ...prev, [currentSlide.qKey]: selectedIndex }));
    setQDone((n) => n + 1);
    advance();
  };

  const handleLead = async (data: LeadData): Promise<void> => {
    setLeadName(data.name);
    const resolvedAnswers = dict.quiz.questions.map((question, index) => ({
      q: question.q,
      a: answers[index] !== undefined ? question.opts[answers[index]] : "–",
    }));

    const eventId = `lead_${crypto.randomUUID()}`;
    const readCookie = (name: string) => {
      const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
      return match ? decodeURIComponent(match[1]) : null;
    };
    const fbp = readCookie("_fbp");
    const fbc = readCookie("_fbc");

    posthog?.capture("funnel_lead_submitted", { ...sharedProps, email: data.email });
    window.fbq?.("track", "Lead", {}, { eventID: eventId });

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, answers, resolvedAnswers, variant, funnel: "website-check", lang, eventId, fbp, fbc }),
        keepalive: true,
      });
    } catch {
      // Silent fail — lead sees thank-you regardless
    }
    posthog?.capture("funnel_completed", sharedProps);
    setPhase("thanks");
  };

  if (phase === "landing") {
    return (
      <Landing
        dict={dict}
        lang={lang}
        onStart={() => {
          posthog?.capture("funnel_started", sharedProps);
          setPhase("quiz");
        }}
      />
    );
  }

  if (phase === "quiz") {
    const currentSlide = slides[slideIndex];

    if (currentSlide.type === "q") {
      return (
        <QuestionSlide
          key={slideIndex}
          slide={currentSlide}
          qDone={qDone}
          questionCount={questionCount}
          dict={dict}
          onAnswer={handleAnswer}
        />
      );
    }

    if (currentSlide.trustFn === "trust1") {
      return (
        <TestimonialSlide
          key={slideIndex}
          content={resolveTrust1(answers, dict)}
          qDone={qDone}
          questionCount={questionCount}
          continueBtn={dict.quiz.continueBtn}
          onNext={advance}
        />
      );
    }

    if (currentSlide.trustFn === "trust2") {
      return (
        <StatsSlide
          key={slideIndex}
          content={resolveTrust2(answers, dict)}
          qDone={qDone}
          questionCount={questionCount}
          continueBtn={dict.quiz.continueBtn}
          onNext={advance}
        />
      );
    }
  }

  if (phase === "lead") {
    return (
      <LeadCapture
        dict={dict}
        questionCount={questionCount}
        showPrice={showPrice}
        onSubmit={handleLead}
      />
    );
  }

  return (
    <ThankYou
      dict={dict}
      questionCount={questionCount}
      result={resolveResult(answers, dict)}
      name={leadName}
    />
  );
}
