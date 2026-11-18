import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { assetPath, siteUrl } from "../lib/site-path";
import { locales, localeByLanguage, type Locale } from "../lib/locales";
import "./globals.css";

const siteName = "Pengpei Zhu 朱芃佩";
const descriptions: Record<Locale, string> = {
  en: "Pengpei Zhu, PhD researcher at the Cosmic Dawn Center, DTU Space. Research on galaxy quenching, neutral gas flows and chemical enrichment.",
  "zh-Hans": "朱芃佩是丹麦技术大学太空研究所宇宙黎明中心的博士生，研究星系淬火、中性气体流动与化学增丰。",
  "zh-Hant": "朱芃佩是丹麥科技大學太空研究所宇宙黎明中心的博士生，研究星系淬熄、中性氣體流動與化學增豐。",
};

export function siteMetadata(locale: Locale): Metadata {
  const canonical = siteUrl(localeByLanguage(locale).path);
  return {
    title: siteName,
    description: descriptions[locale],
    metadataBase: new URL(siteUrl("/")),
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map(({ lang, path }) => [lang, siteUrl(path)])),
        "x-default": siteUrl("/"),
      },
    },
    verification: { google: "suCxd3VIgaO4ljOKOrlc3no38YuMrZLmtxNxr3_P5jo" },
    openGraph: {
      title: siteName, siteName, description: descriptions[locale], url: canonical,
      images: [siteUrl("/portrait-pengpei-zhu.jpg")], type: "website",
    },
    icons: { icon: { url: assetPath("/favicon.png"), type: "image/png", sizes: "96x96" } },
  };
}

export function SiteLayout({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl("/") };
  return (
    <html lang={locale}>
      <body style={{ "--hero-image": `url("${assetPath("/photography/hero-milky-way.jpeg")}")` } as CSSProperties}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
