import type { NextConfig } from "next";

// Site utilisateur GitHub Pages servi à la racine de vakz0.github.io :
// pas de basePath, mais un export statique complet dans ./out.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // L'export statique n'a pas de serveur pour optimiser les images :
  // elles sont pré-converties en WebP par scripts/optimize-images.mjs.
  images: { unoptimized: true },
};

export default nextConfig;
