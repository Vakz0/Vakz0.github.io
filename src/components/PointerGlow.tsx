"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const SIZE = 760;

/**
 * Halo vert qui suit le curseur sur l'ensemble du site.
 *
 * Le dégradé est peint une fois dans un calque de taille fixe que l'on déplace
 * par transformation : animer la position d'un dégradé plein écran forcerait le
 * navigateur à le repeindre à chaque image.
 */
export function PointerGlow() {
  const reduce = useReducedMotion();
  const hasMoved = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });
  const springOpacity = useSpring(opacity, { stiffness: 60, damping: 22 });

  useEffect(() => {
    if (reduce) return;

    function handleMove(event: PointerEvent) {
      const nextX = event.clientX - SIZE / 2;
      const nextY = event.clientY - SIZE / 2;

      // Au premier mouvement, on se téléporte : sinon le ressort traverserait
      // l'écran depuis l'origine sous les yeux du visiteur.
      if (!hasMoved.current) {
        hasMoved.current = true;
        springX.jump(nextX);
        springY.jump(nextY);
      }

      x.set(nextX);
      y.set(nextY);
      opacity.set(1);
    }

    function handleLeave() {
      opacity.set(0);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduce, x, y, opacity, springX, springY]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x: springX,
        y: springY,
        opacity: springOpacity,
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, rgba(61, 220, 151, 0.11), rgba(61, 220, 151, 0.04) 45%, transparent 70%)",
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 will-change-transform"
    />
  );
}
