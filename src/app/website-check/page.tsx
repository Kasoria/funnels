import type { Metadata } from "next";
import { WebsiteCheckFunnel } from "@/components/funnel/WebsiteCheckFunnel";

export const metadata: Metadata = {
  title: "Kostenloser Website-Check",
  description: "5 Fragen – und du weißt, warum deine Website keine Kunden bringt.",
};

interface PageProps {
  searchParams: Promise<{ v?: string }>;
}

export default async function WebsiteCheckPage({ searchParams }: PageProps) {
  const { v } = await searchParams;
  const variant = v === "b" ? "b" : "a";

  return <WebsiteCheckFunnel variant={variant} />;
}
