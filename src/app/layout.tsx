import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://check.kasoria.com"),
  title: {
    default: "Kasoria Check",
    template: "%s · Kasoria",
  },
  description: "Kostenloser Website-Check für Selbstständige und kleine Unternehmen.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${sora.variable} ${dmSerif.variable}`}>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
