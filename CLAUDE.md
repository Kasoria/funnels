@AGENTS.md

# kasoria_check (check.kasoria.com)

Funnel-only site — no navigation, no navbar, no footer. Each page is a standalone conversion funnel.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS 4** (CSS-based config via `@theme` in `globals.css`)
- No component library — all UI is hand-built with Tailwind utility classes

## Project structure

```
src/
  app/
    layout.tsx              # Root layout — fonts, html/body, no nav
    globals.css             # Tailwind v4 @theme + global animations
    page.tsx                # Redirects to /website-check
    website-check/
      page.tsx              # German funnel (A/B via ?v=a|b)
    en/
      page.tsx              # Redirects to /en/website-check
      website-check/
        page.tsx            # English funnel (A/B via ?v=a|b)
    api/
      leads/route.ts        # POST /api/leads — stores/emails lead data
  components/
    funnel/
      WebsiteCheckFunnel.tsx  # Full quiz funnel client component (dict prop)
      FunnelBar.tsx           # Top progress bar
      FunnelLogo.tsx          # KASORIA wordmark
  locales/
    types.ts                # FunnelDict interface
    de.ts                   # German strings + € prices
    en.ts                   # English strings + $ prices
```

## Funnel pattern

Each funnel lives at `/funnel-name/page.tsx` and renders a single client component.
Pass A/B variant via `?v=b` in the URL — default is `"a"`.

## Adding a new funnel

1. Create `src/app/new-funnel/page.tsx`
2. Create `src/components/funnel/NewFunnelComponent.tsx`
3. Add the new client component, import shared `FunnelBar` / `FunnelLogo`
4. Wire the lead submit to `POST /api/leads` with `funnel: "new-funnel"`

## Design system

Same brand palette as kasoria_website but with a dark funnel aesthetic.

- **Canvas dark**: `#0a0a0a` (near-black, voltage dark) / warm variant `#0f0f0d` (trust slides)
- **Text primary**: `#f0efe9`
- **Text muted**: `rgba(240,239,233,0.5)`
- **Accent gold**: `#ffd864` / `#E8C87A`
- **Fonts**: Sora (body, `--font-sora`) + DM Serif Display (headings, `--font-dm-serif`)
- **Button primary**: `bg-[#f0efe9] text-[#0a0a0a]` with `rounded-[9px]`
- **Answer options**: `border border-white/[0.11]` → selected: `bg-[#f0efe9] text-[#0a0a0a]`

## Leads API

`POST /api/leads` accepts `{ name, email, phone?, answers, variant, funnel }`.
Set `SMTP_*` env vars to enable email notification. Logs to console in dev.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — eslint

Do not run dev/start commands — the user handles that.
