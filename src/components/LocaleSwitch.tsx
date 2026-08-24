"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/content/site";

/** Bascule FR/EN en remplaçant le segment de locale du chemin courant. */
export function LocaleSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const other: Locale = locale === "fr" ? "en" : "fr";

  const segments = pathname.split("/").filter(Boolean);
  if (LOCALES.includes(segments[0] as Locale)) {
    segments[0] = other;
  } else {
    segments.unshift(other);
  }
  const target = `/${segments.join("/")}/`;

  return (
    <Link
      href={target}
      aria-label={label}
      className="font-mono text-[13px] text-fg-soft transition-colors hover:text-accent"
    >
      <span className={locale === "fr" ? "text-fg" : undefined}>FR</span>
      <span className="px-0.5">/</span>
      <span className={locale === "en" ? "text-fg" : undefined}>EN</span>
    </Link>
  );
}
