# Adding a Funnel

## 1. Create the page

`src/app/your-funnel/page.tsx`

```tsx
import type { Metadata } from "next";
import { YourFunnel } from "@/components/funnel/YourFunnel";

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

export default async function YourFunnelPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  return <YourFunnel variant={v === "b" ? "b" : "a"} />;
}
```

## 2. Create the funnel component

`src/components/funnel/YourFunnel.tsx`

```tsx
"use client";
import { FunnelLogo } from "./FunnelLogo";
import { FunnelBar } from "./FunnelBar";

export function YourFunnel({ variant = "a" }: { variant?: "a" | "b" }) {
  // your slides, state, logic
}
```

Use `FunnelLogo` and `FunnelBar` in every screen. Submit leads like this:

```ts
await fetch("/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, phone, answers, variant, funnel: "your-funnel" }),
});
```

## 3. A/B testing

- Variant A: `check.kasoria.com/your-funnel`
- Variant B: `check.kasoria.com/your-funnel?v=b`

Use the `variant` prop to toggle e.g. price visibility, CTA copy, or slide order.

## Design tokens (dark funnel aesthetic)

| Token | Value |
|---|---|
| Canvas | `#0a0a0a` (near-black — voltage dark) |
| Canvas warm | `#0f0f0d` (trust slides) |
| Text primary | `#f0efe9` |
| Text muted | `rgba(240,239,233,0.5)` |
| Gold accent | `#E8C87A` (brand gold — buttons, highlights, stars, borders) |
| Button | `bg-[#E8C87A] text-[#2A1800] rounded-[9px]` |
| Option (unselected) | `border border-[rgba(232,200,122,0.18)]` |
| Option (selected) | `bg-[#E8C87A] text-[#2A1800]` |
| Surface / card | `bg-[rgba(232,200,122,0.04)] border border-[rgba(232,200,122,0.12)]` |
| Fonts | `font-heading` (DM Serif Display) / `font-body` (Sora) |

## Slide animations

Wrap each element with `className="au d1"` through `"au d5"` for staggered fade-up on mount.
Each screen should be a separate component so React remounts it (and reruns the animation) on `key={slideIndex}`.

## i18n (multi-language funnels)

Each funnel has a `FunnelDict`-shaped TypeScript object in `src/locales/`. No runtime deps.

### Adding a new locale

1. Create `src/locales/xx.ts` exporting `export const xx = { ... } satisfies FunnelDict`
2. Create `src/app/xx/your-funnel/page.tsx` importing `{ xx }` and passing `dict={xx}`
3. Create `src/app/xx/page.tsx` redirecting to `/xx/your-funnel`

### Page pattern with dict

```tsx
import { de } from "@/locales/de";

export default async function Page({ searchParams }) {
  const { v } = await searchParams;
  return <YourFunnel dict={de} variant={v === "b" ? "b" : "a"} />;
}
```

### Component pattern

```tsx
import type { FunnelDict } from "@/locales/types";

export function YourFunnel({ dict, variant = "a" }: { dict: FunnelDict; variant?: "a" | "b" }) {
  // All strings from dict.* — no hardcoded copy
}
```

### Answer storage

Store the selected **index** (0-based), not the option string:

```ts
// ✓ language-independent
answers[1] === 0  // user picked first option in question 1

// ✗ breaks when you add a second language
answers[1].includes("keine Website")
```

### URL structure

- German (default): `/website-check`, `/other-funnel`
- English: `/en/website-check`, `/en/other-funnel`
- A/B: append `?v=b` to either URL
