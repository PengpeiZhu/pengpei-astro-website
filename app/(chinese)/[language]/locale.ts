import { notFound } from "next/navigation";
import { locales } from "../../../lib/locales";

export type ChineseRoute = { params: Promise<{ language: string }> };

export async function chineseLocale(params: ChineseRoute["params"]) {
  const { language } = await params;
  const locale = locales.find(locale => locale.lang !== "en" && locale.path === `/${language}/`);
  if (!locale || locale.lang === "en") notFound();
  return locale.lang;
}
