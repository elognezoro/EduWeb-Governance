/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Phase 1 : on ne bloque pas le build sur le lint (qualité affinée ensuite).
  // Les erreurs TypeScript, elles, restent bloquantes.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
