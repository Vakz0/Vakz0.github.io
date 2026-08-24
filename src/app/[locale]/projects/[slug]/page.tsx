import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/i18n";
import { PROJECTS, getProject } from "@/content/projects";
import { LOCALES, type Locale } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const copy = project.copy[locale as Locale];
  return {
    title: `${copy.title} · ${getDictionary(locale as Locale).meta.title}`,
    description: copy.summary,
    alternates: { canonical: `/${locale}/projects/${slug}/` },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const project = getProject(slug);

  if (!project) notFound();

  const copy = project.copy[typed];
  const status =
    project.status === "in-progress"
      ? dict.projects.statusInProgress
      : dict.projects.statusPublished;

  const sections = [
    { label: dict.detail.question, body: copy.question },
    { label: dict.detail.data, body: copy.data },
    { label: dict.detail.method, body: copy.method },
  ];

  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 pt-12 pb-20 lg:px-10 lg:pt-16">
      <Link
        href={`/${typed}/projects/`}
        className="group inline-flex items-center gap-2 font-mono text-[13px] text-fg-soft transition-colors hover:text-accent"
      >
        <ArrowLeft
          aria-hidden
          size={15}
          weight="bold"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        {dict.projects.backToList}
      </Link>

      <Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-wider">
          <span className="rounded-base border border-accent/40 px-2.5 py-1 text-accent">
            {status}
          </span>
          <span className="text-fg-soft">{project.year}</span>
        </div>

        <h1 className="mt-5 max-w-[20ch] text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem]">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed text-fg-soft">
          {copy.summary}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-base border border-line bg-canvas-alt">
          <Image
            src={project.image}
            alt={project.imageAlt[typed]}
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale-[0.6] brightness-[0.75]"
          />
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Métadonnées à gauche, récit à droite. */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-[92px]">
            <dl className="divide-y divide-line border-y border-line">
              <div className="py-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-soft">
                  {dict.detail.tools}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed">
                  {project.tools.join(", ")}
                </dd>
              </div>
              <div className="py-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-soft">
                  {dict.detail.sources}
                </dt>
                <dd className="mt-2 space-y-2">
                  {project.sources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 text-[15px] text-fg transition-colors hover:text-accent"
                    >
                      {source.label}
                      <ArrowUpRight
                        aria-hidden
                        size={13}
                        weight="bold"
                        className="text-fg-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ))}
                </dd>
              </div>
              {project.repo ? (
                <div className="py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-soft">
                    {dict.detail.repo}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-fg transition-colors hover:text-accent"
                    >
                      GitHub
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </aside>

        <article className="lg:col-span-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <Reveal key={section.label} delay={index * 0.05}>
                <h2 className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
                  {section.label}
                </h2>
                <p className="mt-4 max-w-[68ch] text-[17px] leading-relaxed text-fg-soft">
                  {section.body}
                </p>
              </Reveal>
            ))}

            <Reveal>
              <h2 className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
                {dict.detail.findings}
              </h2>
              {copy.findings.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {copy.findings.map((finding) => (
                    <li
                      key={finding.slice(0, 32)}
                      className="max-w-[68ch] border-l border-line pl-4 text-[17px] leading-relaxed text-fg-soft"
                    >
                      {finding}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 max-w-[68ch] rounded-base border border-line bg-canvas-alt px-5 py-4 text-[16px] leading-relaxed text-fg-soft">
                  {dict.detail.findingsPending}
                </p>
              )}
            </Reveal>

            <Reveal>
              <h2 className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
                {dict.detail.limits}
              </h2>
              <p className="mt-4 max-w-[68ch] text-[17px] leading-relaxed text-fg-soft">
                {copy.limits}
              </p>
            </Reveal>
          </div>
        </article>
      </div>
    </main>
  );
}
