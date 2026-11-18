import { locales } from "../../../lib/locales";
import { SiteLayout, siteMetadata } from "../../site-layout";
import { chineseLocale, type ChineseRoute } from "./locale";

const chineseLocales = locales.filter(locale => locale.lang !== "en");

export const dynamicParams = false;

export function generateStaticParams() {
  return chineseLocales.map(locale => ({ language: locale.path.split("/")[1] }));
}

export async function generateMetadata({ params }: ChineseRoute) {
  return siteMetadata(await chineseLocale(params));
}

export default async function ChineseLayout({ children, params }: ChineseRoute & { children: React.ReactNode }) {
  return <SiteLayout locale={await chineseLocale(params)}>{children}</SiteLayout>;
}
