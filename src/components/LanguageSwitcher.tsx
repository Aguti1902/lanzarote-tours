"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { useLocale } from "@/components/LocaleProvider";

export function LanguageSwitcher({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    const parts = pathname.split("/");
    if (parts[1] && locales.includes(parts[1] as Locale)) {
      parts[1] = next;
    } else {
      parts.splice(1, 0, next);
    }
    const target = parts.join("/") || `/${next}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    router.push(target);
  }

  const light = tone === "light";

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => switchTo(e.target.value as Locale)}
        className={`cursor-pointer appearance-none py-1.5 pr-7 pl-3 text-xs font-bold outline-none ${
          light
            ? "border border-sand-line bg-white text-ink hover:bg-sky-soft"
            : "border border-white/20 bg-white/10 text-white hover:bg-white/15"
        }`}
        aria-label="Language"
      >
        {locales.map((code) => (
          <option key={code} value={code} className="text-ink">
            {localeLabels[code]}
          </option>
        ))}
      </select>
      <span
        className={`pointer-events-none absolute right-2 text-[10px] ${
          light ? "text-ink/50" : "text-white/70"
        }`}
      >
        ▾
      </span>
    </label>
  );
}
