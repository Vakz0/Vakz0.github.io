"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { PointerEvent } from "react";
import { MagneticLink } from "./MagneticLink";
import type { Dictionary } from "@/content/i18n";
import type { Locale } from "@/content/site";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduce = useReducedMotion();

  // Halo suivant le pointeur : il éclaire la zone lue, il ne décore pas.
  // L'opacité part de zéro pour qu'aucun halo ne traîne dans un coin au chargement.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glow = useMotionValue(0);
  const glowOpacity = useSpring(glow, { stiffness: 140, damping: 28 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${pointerX}px ${pointerY}px, rgba(61, 220, 151, 0.08), transparent 72%)`;

  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
    glow.set(1);
  }

  function fadeGlow() {
    glow.set(0);
  }

  const words = `${dict.hero.headlineTop} ${dict.hero.headlineBottom}`.split(" ");
  const breakAfter = dict.hero.headlineTop.split(" ").length - 1;

  const enter = (index: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.55,
            delay: 0.06 * index,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section
      onPointerMove={trackPointer}
      onPointerLeave={fadeGlow}
      className="relative isolate grid min-h-[calc(100dvh-68px)] grid-cols-1 items-center gap-10 pt-14 pb-16 lg:grid-cols-12 lg:gap-14 lg:pt-20"
    >
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ background: spotlight, opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 -z-10"
        />
      )}

      <div className="lg:col-span-7">
        <motion.p
          {...enter(0)}
          className="mb-5 font-mono text-[12px] uppercase tracking-[0.18em] text-accent"
        >
          {dict.hero.eyebrow}
        </motion.p>

        <h1 className="text-[2.4rem] font-medium leading-[1.06] tracking-[-0.03em] sm:text-6xl lg:text-[3.5rem]">
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <motion.span {...enter(index + 1)} className="inline-block">
                {word}
              </motion.span>
              {/* Le retour forcé disparaît sous sm : l'espace doit rester. */}
              {index === breakAfter ? <br className="hidden sm:block" /> : null}
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        <motion.p
          {...enter(words.length + 1)}
          className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-fg-soft"
        >
          {dict.hero.subtext}
        </motion.p>

        <motion.div
          {...enter(words.length + 2)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <MagneticLink
            href={`/${locale}/projects/`}
            className="inline-block rounded-base bg-accent px-6 py-3 text-[15px] font-medium text-canvas transition-colors hover:bg-accent-dim active:translate-y-px"
          >
            {dict.hero.primaryCta}
          </MagneticLink>
          <Link
            href="#contact"
            className="inline-block rounded-base border border-line px-6 py-3 text-[15px] font-medium text-fg transition-colors hover:border-line-strong"
          >
            {dict.hero.secondaryCta}
          </Link>
        </motion.div>
      </div>

      <motion.div
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              transition: {
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1] as const,
              },
            })}
        className="lg:col-span-5"
      >
        <div className="relative aspect-square overflow-hidden rounded-base border border-line bg-canvas-alt">
          <Image
            src="https://picsum.photos/seed/reseau-nuit-longue-exposition/1000/1000"
            alt={dict.hero.portraitAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover grayscale-[0.65] contrast-[1.05] brightness-[0.75]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-accent/10 mix-blend-color"
          />
        </div>
      </motion.div>
    </section>
  );
}
