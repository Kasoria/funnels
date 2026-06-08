export interface TrustTestimonial {
  bridge: string;
  quote: string;
  author: string;
  company: string;
  context: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface TrustStats {
  bridge: string;
  headline: string;
  sub: string;
  stats: readonly [StatItem, StatItem, StatItem, StatItem];
}

export interface FunnelResult {
  tag: string;
  headline: string;
  body: string;
}

export interface FunnelDict {
  countdown: {
    hours: string;
    minutes: string;
    seconds: string;
    badge: string;
  };

  landing: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subtext: string;
    steps: readonly [string, string, string];
    cta: string;
    security: string;
    footer: string;
  };

  quiz: {
    progressLabel: string; // "Frage" / "Question"
    continueBtn: string;
    // 6 questions — order must match qKey 0–5 in the funnel
    questions: readonly [
      { q: string; opts: readonly string[] },
      { q: string; opts: readonly string[] },
      { q: string; opts: readonly string[] },
      { q: string; opts: readonly string[] },
      { q: string; opts: readonly string[] },
      { q: string; opts: readonly string[] },
    ];
  };

  // trust1[0] = no website (Q1 idx 0)
  // trust1[1] = few leads  (Q1 idx 1)
  // trust1[2] = default
  trust1: readonly [TrustTestimonial, TrustTestimonial, TrustTestimonial];

  // trust2[0] = conversion (Q2 idx 0)
  // trust2[1] = seo        (Q2 idx 1)
  // trust2[2] = design     (Q2 idx 2)
  // trust2[3] = tech/default
  trust2: readonly [TrustStats, TrustStats, TrustStats, TrustStats];

  lead: {
    stepLabel: string;
    headline: string;
    headlineAccent: string;
    bullets: readonly [string, string, string];
    offer: {
      prefix: string;
      price: string;
      originalLabel: string;
      originalPrice: string;
      countdown: string;
    };
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
    };
    cta: string;
    ctaLoading: string;
    security: string;
  };

  thanks: {
    greeting: string; // "Danke" / "Thank you" — component appends ", Name." or "."
    headlineAccent: string;
    nextStepsLabel: string;
    nextSteps: readonly [string, string, string];
    curious: string;
  };

  // results[0] = budget  (Q5 idx 0)
  // results[1] = newSite (Q1 idx 0 | Q4 idx 3)
  // results[2] = seo     (Q2 idx 1 | Q4 idx 1)
  // results[3] = conversion (Q3 idx 0 | Q3 idx 1)
  // results[4] = default
  results: readonly [FunnelResult, FunnelResult, FunnelResult, FunnelResult, FunnelResult];
}
