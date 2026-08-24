import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/Hero";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/i18n";
import type { Locale } from "@/content/site";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const typed = locale as Locale;
  const dict = getDictionary(typed);

  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
      <Hero locale={typed} dict={dict} />

      <section id="projects" className="border-t border-line py-16 lg:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              {dict.projects.heading}
            </h2>
            <p className="font-mono text-[13px] text-fg-soft">
              {dict.projects.count}
            </p>
          </div>
          <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-fg-soft">
            {dict.projects.intro}
          </p>
        </Reveal>

        <div className="mt-10">
          <ProjectIndex locale={typed} dict={dict} />
        </div>
      </section>

      <section id="skills" className="border-t border-line py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              {dict.skills.heading}
            </h2>
            <p className="mt-4 max-w-[40ch] text-[16px] leading-relaxed text-fg-soft">
              {dict.skills.intro}
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
              {dict.skills.groups.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.07}>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-fg-soft">
                    {group.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-line py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              {dict.about.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <div className="space-y-5 text-[17px] leading-relaxed text-fg-soft">
              {dict.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={`/${typed}/projects/`}
              className="group mt-8 inline-flex items-center gap-2 font-mono text-[13px] text-accent"
            >
              {dict.projects.listTitle}
              <ArrowRight
                aria-hidden
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
