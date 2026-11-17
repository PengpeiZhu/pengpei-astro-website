import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site-path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/interactive/uvj-sed-lab.html", "/interactive/sandage-sfh.html"].map(path => ({
    url: siteUrl(path),
  }));
}
