import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { VisualsGallery } from "@/components/ProjectVisuals";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/i18n";
import { PROJECTS, getProject } from "@/content/projects";
import { LOCALES, type Locale } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    PROJECTS.filter((p) => p.figures?.length).map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]/visualisations">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project?.figures?.length) return {};

  const copy = project.copy[locale as Locale];
  const dict = getDictionary(locale as Locale);
  return {
    title: `${dict.visuals.pageTitle} · ${copy.title}`,
    description: project.visuals?.intro[locale as Locale] ?? copy.summary,
    alternates: {
      canonical: `/${locale}/projects/${slug}/visualisations/`,
    },
  };
}

export default async function ProjectVisualisationsPage({
  params,
}: PageProps<"/[locale]/projects/[slug]/visualisations">) {
  const { locale, slug } = await params;
  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const project = getProject(slug);

  if (!project?.figures?.length) notFound();

  const copy = project.copy[typed];

  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 pt-12 pb-20 lg:px-10 lg:pt-16">
      <Link
        href={`/${typed}/projects/${slug}/`}
        className="group inline-flex items-center gap-2 font-mono text-[13px] text-fg-soft transition-colors hover:text-accent"
      >
        <ArrowLeft
          aria-hidden
          size={15}
          weight="bold"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        {dict.visuals.backToProject}
      </Link>

      <Reveal>
        <p className="mt-8 font-mono text-[12px] uppercase tracking-wider text-accent">
          {dict.visuals.pageEyebrow}
        </p>
        <h1 className="mt-3 max-w-[22ch] text-3xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
          {dict.visuals.pageTitle}
        </h1>
        <p className="mt-2 text-[15px] text-fg-soft">{copy.title}</p>
        <p className="mt-6 max-w-[68ch] text-[18px] leading-relaxed text-fg-soft">
          {project.visuals?.intro[typed]}
        </p>
      </Reveal>

      {project.highlights ? (
        <Reveal delay={0.05} className="mt-10">
          <ProjectHighlights highlights={project.highlights} locale={typed} />
        </Reveal>
      ) : null}

      {copy.answer ? (
        <Reveal delay={0.08} className="mt-10">
          <p className="rounded-base border border-accent/30 bg-accent/5 px-5 py-4 text-[17px] leading-relaxed text-fg">
            {copy.answer}
          </p>
        </Reveal>
      ) : null}

      <div className="mt-16">
        <VisualsGallery project={project} locale={typed} dict={dict} />
      </div>

      <Reveal className="mt-16 border-t border-line pt-10">
        <Link
          href={`/${typed}/projects/${slug}/`}
          className="group inline-flex items-center gap-2 font-mono text-[13px] text-accent"
        >
          <ArrowLeft
            aria-hidden
            size={15}
            weight="bold"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          {dict.visuals.backToProject}
        </Link>
      </Reveal>
    </main>
  );
}
