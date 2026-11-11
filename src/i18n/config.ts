export const locales = ["es", "en", "de", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Idiomas con traducción editable (todo menos el español base). */
export const translatedLocales = ["en", "de", "fr"] as const;
export type TranslatedLocale = (typeof translatedLocales)[number];

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
  de: "Deutsch",
  fr: "Français",
};

/** Nombres en español para el panel de admin. */
export const adminLocaleLabels: Record<Locale, string> = {
  es: "Español",
  en: "Inglés",
  de: "Alemán",
  fr: "Francés",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
