import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import remarkParse from "remark-parse";
import { unified } from "unified";

export const inlineSiteSections = [
  "Opening label",
  "Opening headline",
  "Opening introduction",
  "Colour credit",
  "Profile role",
  "Profile affiliation",
  "Job search badge",
  "About heading",
  "Archery photo caption",
  "Stellar metallicities title",
  "Neutral gas flows title",
  "Post-starburst galaxies title",
  "Spectra and open catalogues title",
  "Gas recycling figure caption",
  "Escape velocity figure caption",
  "SQuIGGLE figure caption",
  "Publications introduction",
  "Publication links note",
  "CV introduction",
  "Contact introduction",
  "Visitors introduction",
] as const;

const siteSections = [
  ...inlineSiteSections,
  "About me",
  "Research introduction",
  "Stellar metallicities",
  "Neutral gas flows",
  "Post-starburst galaxies",
  "Spectra and open catalogues",
  "Interactive projects introduction",
  "Astrophotos introduction",
] as const;

export type SiteSection = (typeof siteSections)[number];
export type SiteText = Record<SiteSection, ReactNode>;

export function readSiteText(file: string | URL = join(process.cwd(), "SITE-TEXT.md")) {
  const markdown = readFileSync(file, "utf8");
  const tree = unified().use(remarkParse).parse(markdown);
  const headings = tree.children.filter(node => node.type === "heading").filter(node => node.depth === 2);
  const sections = new Map<string, string>();

  for (const [index, heading] of headings.entries()) {
    const [label] = heading.children;
    if (heading.children.length !== 1 || label.type !== "text") continue;
    if (sections.has(label.value)) throw new Error(`Repeated section in SITE-TEXT.md: ${label.value}`);
    const start = heading.position?.end.offset;
    const end = headings[index + 1]?.position?.start.offset ?? markdown.length;
    sections.set(label.value, markdown.slice(start, end).trim());
  }

  const entries = siteSections.map(name => {
    const content = sections.get(name);
    if (content === undefined) throw new Error(`Missing section in SITE-TEXT.md: ${name}`);
    return [name, content] as const;
  });
  return Object.fromEntries(entries) as Record<SiteSection, string>;
}
