import type { MetadataRoute } from "next";
import { locales } from "../lib/locales";
import { siteUrl } from "../lib/site-path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...locales.map(locale => locale.path), "/interactive/uvj-sed-lab.html", "/interactive/sandage-sfh.html"].map(path => ({
    url: siteUrl(path),
  }));
}
