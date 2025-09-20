/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Add resolve fallback for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }

    return config
  },
  experimental: {
    optimizeCss: true, // still experimental but fine
    // ❌ remove serverActions (already enabled by default)
    // ❌ remove serverComponentsExternalPackages unless you actually need it
  },
  images: {
    unoptimized: true,
  },
  modularizeImports: {
    '@/components': {
      transform: '@/components/{{member}}',
    },
  },
}

export default nextConfig
