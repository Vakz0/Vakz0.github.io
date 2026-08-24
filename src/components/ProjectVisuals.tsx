import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import type { Project, ProjectFigure } from "@/content/projects";
import type { Dictionary } from "@/content/i18n";
import type { Locale } from "@/content/site";

const SECTION_ORDER = ["overview", "traffic", "weather", "model"] as const;

export function groupFiguresBySection(figures: ProjectFigure[]) {
  return SECTION_ORDER.map((section) => ({
    section,
    figures: figures.filter((f) => f.section === section),
  })).filter((group) => group.figures.length > 0);
}

export function VisualsCta({
  project,
  locale,
  dict,
  preview,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  preview?: ProjectFigure;
}) {
  if (!project.figures?.length) return null;

  const previewFigure = preview ?? project.figures[0];

  return (
    <Link
      href={`/${locale}/projects/${project.slug}/visualisations/`}
      className="group block overflow-hidden rounded-base border border-accent/30 bg-accent/5 transition-colors hover:border-accent/50 hover:bg-accent/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="relative aspect-[16/10] overflow-hidden bg-white md:col-span-2 md:aspect-auto md:min-h-[220px]">
          <Image
            src={previewFigure.src}
            alt={previewFigure.title[locale]}
            fill
            className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-8">
          <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-accent">
            <ChartLineUp aria-hidden size={16} weight="bold" />
            {dict.visuals.ctaEyebrow}
          </div>
          <h3 className="mt-3 text-xl font-medium tracking-[-0.01em]">
            {dict.visuals.ctaTitle.replace("{n}", String(project.figures.length))}
          </h3>
          <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-fg-soft">
            {project.visuals?.intro[locale] ?? dict.visuals.ctaFallback}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 font-mono text-[13px] text-accent">
            {dict.visuals.ctaButton}
            <ArrowRight
              aria-hidden
              size={15}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function VisualsGallery({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  if (!project.figures?.length) return null;

  const groups = groupFiguresBySection(project.figures);

  return (
    <div className="space-y-16">
      {groups.map(({ section, figures }) => (
        <section key={section}>
          <h2 className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
            {dict.visuals.sections[section]}
          </h2>
          {project.visuals?.sectionIntros?.[section] ? (
            <p className="mt-3 max-w-[68ch] text-[17px] leading-relaxed text-fg-soft">
              {project.visuals.sectionIntros[section]![locale]}
            </p>
          ) : null}
          <div className="mt-8 space-y-12">
            {figures.map((figure, index) => (
              <figure key={figure.src} className="overflow-hidden">
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="font-mono text-[12px] text-fg-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium tracking-[-0.01em]">
                    {figure.title[locale]}
                  </h3>
                </div>
                <div className="overflow-hidden rounded-base border border-line bg-white">
                  <Image
                    src={figure.src}
                    alt={figure.caption[locale]}
                    width={1400}
                    height={788}
                    className="h-auto w-full"
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                </div>
                <figcaption className="mt-4 max-w-[72ch] text-[16px] leading-relaxed text-fg-soft">
                  {figure.caption[locale]}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
