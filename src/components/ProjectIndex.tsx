import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { PROJECTS } from "@/content/projects";
import type { Dictionary } from "@/content/i18n";
import type { Locale } from "@/content/site";

export function ProjectIndex({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {PROJECTS.map((project, index) => {
        const copy = project.copy[locale];
        const status =
          project.status === "in-progress"
            ? dict.projects.statusInProgress
            : dict.projects.statusPublished;

        return (
          <Reveal as="div" key={project.slug} delay={index * 0.08}>
            <Link
              href={`/${locale}/projects/${project.slug}/`}
              className="group grid grid-cols-1 items-center gap-5 py-6 transition-colors hover:bg-canvas-alt sm:grid-cols-12 sm:gap-6"
            >
              <div className="sm:col-span-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-base border border-line">
                  <Image
                    src={project.image}
                    alt={project.imageAlt[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, 16vw"
                    className="object-cover grayscale-[0.7] brightness-[0.7] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
                  />
                </div>
              </div>

              <div className="sm:col-span-5">
                <h3 className="text-xl font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">
                  {copy.title}
                </h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-fg-soft">
                  {copy.question}
                </p>
              </div>

              <p className="font-mono text-[12px] text-fg-soft sm:col-span-3">
                {project.tools.join(" · ")}
              </p>

              <div className="flex items-center gap-2 sm:col-span-2 sm:justify-end">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  {status}
                </span>
                <ArrowUpRight
                  aria-hidden
                  size={16}
                  weight="bold"
                  className="text-fg-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
