import type { Metadata } from "next";
import { WebsiteCheckFunnel } from "@/components/funnel/WebsiteCheckFunnel";
import { de } from "@/locales/de";

export const metadata: Metadata = {
  title: "Kostenloser Website-Check",
  description: "5 Fragen – und du weißt, warum deine Website keine Kunden bringt.",
};

interface PageProps {
  searchParams: Promise<{ v?: string }>;
}

export default async function WebsiteCheckPage({ searchParams }: PageProps) {
  const { v } = await searchParams;
  const variant = v === "a" ? "a" : v === "b" ? "b" : undefined;

  return <WebsiteCheckFunnel dict={de} variant={variant} lang="de" />;
}
