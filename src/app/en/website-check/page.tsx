import type { Metadata } from "next";
import { WebsiteCheckFunnel } from "@/components/funnel/WebsiteCheckFunnel";
import { en } from "@/locales/en";

export const metadata: Metadata = {
  title: "Free Website Check",
  description: "5 quick questions — find out why your website isn't bringing in customers.",
};

interface PageProps {
  searchParams: Promise<{ v?: string }>;
}

export default async function EnWebsiteCheckPage({ searchParams }: PageProps) {
  const { v } = await searchParams;
  const variant = v === "a" ? "a" : v === "b" ? "b" : undefined;

  return <WebsiteCheckFunnel dict={en} variant={variant} lang="en" />;
}
