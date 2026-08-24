"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Attraction du bouton vers le curseur. Les valeurs restent hors du cycle de
 * rendu React : useState rerendrait l'arbre à chaque pixel de souris.
 */
export function MagneticLink({
  href,
  children,
  className,
  strength = 0.28,
}: MagneticLinkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.span>
  );
}
