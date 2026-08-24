import { SITE } from "@/content/site";
import type { Dictionary } from "@/content/i18n";

export function Footer({ dict }: { dict: Dictionary }) {
  const links = [
    { label: "GitHub", href: SITE.github },
    { label: "LinkedIn", href: SITE.linkedin },
    { label: dict.contact.email, href: `mailto:${SITE.email}` },
  ];

  return (
    // Fond partiellement transparent pour laisser passer le halo du curseur.
    <footer id="contact" className="mt-auto border-t border-line bg-canvas-alt/70">
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              {dict.contact.heading}
            </p>
            <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-fg-soft">
              {dict.contact.body}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[13px]">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-fg-soft transition-colors hover:text-accent"
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 font-mono text-[12px] text-fg-soft">
          {dict.footer.note}
        </p>
      </div>
    </footer>
  );
}
