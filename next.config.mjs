/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js'
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/compsoft-communications/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/compsoft-communications' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/compsoft-communications' : '',
  }
}

export default nextConfig
