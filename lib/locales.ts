export const locales = [
  { lang: "en", path: "/", label: "English" },
  { lang: "zh-Hans", path: "/zh-hans/", label: "简体中文" },
  { lang: "zh-Hant", path: "/zh-hant/", label: "繁體中文" },
] as const;

export type Locale = (typeof locales)[number]["lang"];

export function localeByLanguage(language: Locale) {
  return locales.find(locale => locale.lang === language)!;
}

export function formatDate(
  locale: Locale, iso: string, english: string, options: Intl.DateTimeFormatOptions,
) {
  if (locale === "en") return english;
  return new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(new Date(iso));
}
