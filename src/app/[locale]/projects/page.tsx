import type { Metadata } from "next";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/i18n";
import { LOCALES, type Locale } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return {
    title: `${dict.projects.listTitle} · ${dict.meta.title}`,
    description: dict.projects.listIntro,
    alternates: { canonical: `/${locale}/projects/` },
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  const typed = locale as Locale;
  const dict = getDictionary(typed);

  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 pt-16 pb-20 lg:px-10 lg:pt-24">
      <Reveal>
        <h1 className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
          {dict.projects.listTitle}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-fg-soft">
          {dict.projects.listIntro}
        </p>
      </Reveal>

      <div className="mt-12">
        <ProjectIndex locale={typed} dict={dict} />
      </div>
    </main>
  );
}
