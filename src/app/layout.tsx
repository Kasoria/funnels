import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
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
    <html lang="de" className={`${anton.variable} ${archivo.variable}`}>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
