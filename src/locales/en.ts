import type { FunnelDict } from "./types";

export const en = {
  countdown: {
    days: "Days",
    hours: "Hrs",
    minutes: "Min",
    seconds: "Sec",
    badge: "⚡ Intro offer ends in",
  },

  landing: {
    eyebrow: "Free Website Check · 2 Minutes",
    headline: "Your website is costing you",
    headlineAccent: "customers every day.",
    subtext: "5 quick questions — and we'll personally reach out with a concrete assessment of your situation.",
    steps: [
      "Answer 5 short questions",
      "We analyze your situation",
      "Christian gets back to you personally",
    ],
    cta: "Start the check →",
    security: "🔒 Free · No spam · GDPR compliant",
    footer: "© 2026 Kasoria · kasoria.com",
  },

  quiz: {
    progressLabel: "Question",
    continueBtn: "Continue →",
    websiteUrl: {
      q: "What's your current website URL?",
      placeholder: "https://your-website.com",
      skip: "Skip →",
    },
    questions: [
      {
        q: "What best describes your business?",
        opts: ["Trades & Construction", "Services & Consulting", "Health & Beauty", "Food & Retail", "Other"],
      },
      {
        q: "What's your current website situation?",
        opts: ["I don't have a website yet", "I have one — but it barely brings in leads", "I have one — but I'm not happy with it"],
      },
      {
        q: "What's your biggest online challenge?",
        opts: ["Not enough contact requests", "Barely visible on Google", "Outdated / unprofessional design", "Technical issues & slow load times"],
      },
      {
        q: "How many leads do you currently get per month through your website?",
        opts: ["Barely any or none", "1–3 leads", "4–10 leads", "More than 10"],
      },
      {
        q: "What's your most important goal for the next 6 months?",
        opts: ["Significantly more contact requests", "Better visibility on Google", "A more professional brand presence", "Everything — a complete fresh start"],
      },
      {
        q: "What's your approximate budget for a new website?",
        opts: ["Under $500", "$500 – $1,500", "$1,500 – $4,000", "$4,000 and above"],
      },
    ],
  },

  trust1: [
    {
      bridge: "Many of our clients started from exactly that point.",
      quote: "Extremely happy! We finally come across as professional when pitching for contracts.",
      author: "Vasil Stoyanov",
      company: "SPEDO GmbH · Hamburg",
      context: "Logistics & Courier · previously: no website · project: 11 days",
    },
    {
      bridge: "We hear this a lot — and it's a problem we know how to fix.",
      quote: "I'm absolutely thrilled. The booking tool on my website turned out amazing — and my clients love it too.",
      author: "Michelle Rathjen",
      company: "Jingles Cat Hotel · Lower Saxony",
      context: "Cat boarding · Inquiries now come in automatically",
    },
    {
      bridge: "You're not alone in this.",
      quote: "We're absolutely happy with the result. The website is incredible — and so are our clients.",
      author: "Denitsa Deneva",
      company: "Tattoo Avenue · Neu Wulmstorf",
      context: "Tattoo & Piercing Studio · New design + Local SEO",
    },
  ],

  trust2: [
    {
      bridge: "Not enough leads isn't a traffic problem. It's a conversion problem.",
      headline: "Most websites bleed leads silently.",
      sub: "No clear contact path, no trust signals, no form that actually works. We fix that — not with more ads, but with a better site.",
      stats: [
        { value: "3×",   label: "More leads after relaunch" },
        { value: "< 2s", label: "Load time" },
        { value: "24/7", label: "Automatic lead capture" },
        { value: "7–14", label: "Days to launch" },
      ],
    },
    {
      bridge: "Google visibility isn't luck — it's architecture.",
      headline: "Tech, copy, structure. In that order.",
      sub: "Local SEO works when the site is technically clean and sends the right signals. We build that in from day one.",
      stats: [
        { value: "Page 1", label: "Local Google search" },
        { value: "< 2s",   label: "Core Web Vitals green" },
        { value: "7–14",   label: "Days to launch" },
        { value: "100%",   label: "On-page SEO included" },
      ],
    },
    {
      bridge: "Design decides in seconds — before anyone reads a word.",
      headline: "No template. No compromise.",
      sub: "Every project is tailored specifically to your audience and positioning. You can see it — and your visitors will feel it.",
      stats: [
        { value: "100%", label: "Custom design" },
        { value: "< 2s", label: "Load time" },
        { value: "7–14", label: "Days to launch" },
        { value: "3+",   label: "Live projects" },
      ],
    },
    {
      bridge: "Fast, stable, clean. That's the foundation.",
      headline: "Tech isn't a bonus — it's the baseline.",
      sub: "Performance, GDPR, mobile, SSL, backups — everything runs from day one. You don't have to think about it.",
      stats: [
        { value: "< 2s",  label: "Load time" },
        { value: "100%",  label: "Mobile optimized" },
        { value: "7–14",  label: "Days to launch" },
        { value: "99.9%", label: "Uptime" },
      ],
    },
  ],

  lead: {
    stepLabel: "Last Step",
    headline: "We'll reach out",
    headlineAccent: "personally.",
    bullets: [
      "Christian reviews your answers personally",
      "Free 15-min call — honest, no sales pressure",
      "You get a concrete assessment of your situation",
    ],
    offer: {
      prefix: "Intro offer: Website from",
      price: "$799",
      originalLabel: "instead of",
      originalPrice: "$2,500",
      countdown: "Ends in",
    },
    fields: {
      name:  { label: "Your first name *", placeholder: "Alex" },
      email: { label: "Email *",           placeholder: "alex@company.com" },
      phone: { label: "Phone *",           placeholder: "+1 555 000 0000" },
      websiteUrl: { label: "Your website URL (if you have one)", placeholder: "https://your-website.com" },
    },
    cta: "Request a free call →",
    ctaLoading: "Sending…",
    security: "🔒 No third-party sharing · GDPR compliant",
  },

  thanks: {
    greeting: "Thank you",
    headlineAccent: "We'll be in touch soon.",
    nextStepsLabel: "What happens next",
    nextSteps: [
      "Christian reviews your answers personally",
      "You'll get an email or a call — within 24 hours",
      "Free 15-min call: honest assessment, no fluff",
    ],
    curious: "Curious already?",
  },

  results: [
    {
      tag: "Budget Check",
      headline: "Let's have a quick chat.",
      body: "Our websites start at $799. In a free call we'll figure out what makes sense for your situation.",
    },
    {
      tag: "New Presence",
      headline: "You're ready for a strong start.",
      body: "We'll build you a website in 7–14 days that generates leads from day one.",
    },
    {
      tag: "SEO Potential",
      headline: "Your Google ranking is costing you customers daily.",
      body: "With the right site structure and local SEO, you can measurably win more leads.",
    },
    {
      tag: "Conversion Problem",
      headline: "More traffic won't help — your site needs to convert.",
      body: "The problem is usually a missing contact path. We fix that concretely — in 7–14 days.",
    },
    {
      tag: "Growth Potential",
      headline: "You know more is possible.",
      body: "A professional presence is often the difference between winning a client and losing one.",
    },
  ],
} satisfies FunnelDict;
