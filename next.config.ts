import type { NextConfig } from "next";

// Site utilisateur GitHub Pages servi à la racine de vakz0.github.io :
// pas de basePath, mais un export statique complet dans ./out.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // L'export statique n'a pas de serveur pour optimiser les images.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
