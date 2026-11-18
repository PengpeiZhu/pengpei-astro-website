import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { assetPath, siteUrl } from "../lib/site-path";
import "./globals.css";

const siteName = "Pengpei Zhu 朱芃佩";
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl("/"),
};

export const metadata: Metadata = {
  title: siteName,
  description: "Pengpei Zhu, PhD researcher at the Cosmic Dawn Center, DTU Space. Research on galaxy quenching, neutral gas flows and chemical enrichment.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100"),
  alternates: { canonical: assetPath("/") },
  verification: { google: "suCxd3VIgaO4ljOKOrlc3no38YuMrZLmtxNxr3_P5jo" },
  openGraph: { title: siteName, siteName, description: "Galaxies, gas & cosmic history. Research, publications and CV.", url: assetPath("/"), images: [assetPath("/portrait-pengpei-zhu.jpg")], type: "website" },
  icons: {
    icon: { url: assetPath("/favicon.png"), type: "image/png", sizes: "96x96" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ "--hero-image": `url("${assetPath("/photography/hero-milky-way.jpeg")}")` } as CSSProperties}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
