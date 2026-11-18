import Markdown, { type Components } from "react-markdown";
import { assetPath } from "../lib/site-path";
import type { Locale } from "../lib/locales";
import { inlineSiteSections, readSiteText, type SiteText } from "../lib/site-text";
import Home from "./home";

const proseComponents: Components = {
  a({ href, title, children }) {
    const external = /^https?:\/\//i.test(href ?? "");
    const destination = href?.startsWith("/") && !href.startsWith("//") ? assetPath(href) : href;
    return <a href={destination} title={title} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}</a>;
  },
  h3: ({ children }) => <h3 className="lead">{children}</h3>,
  blockquote: ({ children }) => <blockquote className="project-note">{children}</blockquote>,
};

const inlineComponents: Components = {
  ...proseComponents,
  p: ({ children }) => <>{children}</>,
};

const inlineSections = new Set<string>(inlineSiteSections);

export function SitePage({ locale }: { locale: Locale }) {
  const markdown = readSiteText(locale);
  const copy = Object.fromEntries(Object.entries(markdown).map(([section, content]) => [
    section,
    <Markdown skipHtml components={inlineSections.has(section) ? inlineComponents : proseComponents}>{content}</Markdown>,
  ])) as SiteText;

  return <Home locale={locale} copy={copy} showJobBadge={Boolean(markdown["Job search badge"])} />;
}
