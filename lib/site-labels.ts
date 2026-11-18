import type { Locale } from "./locales";
import labels from "./site-labels.json";

const translations: Record<string, Record<Exclude<Locale, "en">, string>> = labels;

export function translator(locale: Locale) {
  return (text: string) => locale === "en" ? text : translations[text]?.[locale] ?? text;
}
