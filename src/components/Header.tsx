import Link from "next/link";
import { LocaleSwitch } from "./LocaleSwitch";
import type { Dictionary } from "@/content/i18n";
import type { Locale } from "@/content/site";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}/`;

  return (
    <header className="sticky top-0 z-50 h-[68px] border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link
          href={home}
          className="font-mono text-[14px] font-medium tracking-tight transition-colors hover:text-accent"
        >
          bastien.guillemin
        </Link>

        <nav className="flex items-center gap-5 font-mono text-[13px] text-fg-soft sm:gap-7">
          <Link
            href={`${home}projects/`}
            className="transition-colors hover:text-accent"
          >
            {dict.nav.projects}
          </Link>
          <Link
            href={`${home}#skills`}
            className="hidden transition-colors hover:text-accent md:inline"
          >
            {dict.nav.skills}
          </Link>
          <Link
            href={`${home}#about`}
            className="hidden transition-colors hover:text-accent md:inline"
          >
            {dict.nav.about}
          </Link>
          <span aria-hidden className="h-3.5 w-px bg-line" />
          <LocaleSwitch locale={locale} label={dict.nav.switchTo} />
        </nav>
      </div>
    </header>
  );
}
