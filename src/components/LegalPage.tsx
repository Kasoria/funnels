import Link from "next/link";
import { FunnelLogo } from "@/components/funnel/FunnelLogo";

interface LegalPageProps {
  lang: "de" | "en";
  page: "impressum" | "datenschutz";
  children: React.ReactNode;
}

const labels = {
  de: {
    back: "← Zurück zum Website-Check",
    backHref: "/website-check",
    switchLabel: "English",
    impressumHref: "/impressum",
    datenschutzHref: "/datenschutz",
    impressumLabel: "Impressum",
    datenschutzLabel: "Datenschutz",
  },
  en: {
    back: "← Back to Website Check",
    backHref: "/en/website-check",
    switchLabel: "Deutsch",
    impressumHref: "/en/impressum",
    datenschutzHref: "/en/datenschutz",
    impressumLabel: "Legal Notice",
    datenschutzLabel: "Privacy Policy",
  },
};

const switchHrefs: Record<"de" | "en", Record<"impressum" | "datenschutz", string>> = {
  de: { impressum: "/en/impressum", datenschutz: "/en/datenschutz" },
  en: { impressum: "/impressum", datenschutz: "/datenschutz" },
};

export function LegalPage({ lang, page, children }: LegalPageProps) {
  const t = labels[lang];
  const switchHref = switchHrefs[lang][page];
  const oppositeLang = lang === "de" ? "en" : "de";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0efe9] font-body">
      <div className="max-w-[680px] mx-auto px-6 py-10">
        <FunnelLogo />

        <div className="flex items-center justify-between mt-8 mb-10">
          <Link
            href={t.backHref}
            className="text-[12px] text-[rgba(240,239,233,0.5)] hover:text-[#f0efe9] transition-colors"
          >
            {t.back}
          </Link>
          <Link
            href={switchHref}
            className="text-[11px] text-[rgba(240,239,233,0.4)] hover:text-[rgba(240,239,233,0.7)] transition-colors"
          >
            {labels[oppositeLang][`${page === "impressum" ? "impressumLabel" : "datenschutzLabel"}`]}
          </Link>
        </div>

        <article className="prose-legal">{children}</article>

        <footer className="mt-16 pt-6 border-t border-[rgba(240,239,233,0.08)] flex gap-5 text-[11px] text-[rgba(240,239,233,0.4)]">
          <Link href={t.impressumHref} className="hover:text-[rgba(240,239,233,0.7)] transition-colors">
            {t.impressumLabel}
          </Link>
          <Link href={t.datenschutzHref} className="hover:text-[rgba(240,239,233,0.7)] transition-colors">
            {t.datenschutzLabel}
          </Link>
          <span className="ml-auto">© 2026 Kasoria</span>
        </footer>
      </div>
    </div>
  );
}
