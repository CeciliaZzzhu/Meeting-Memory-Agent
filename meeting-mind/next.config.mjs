/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Adjust this to match your GitHub repository name
  basePath: '/Meeting-Memory-Agent',
  assetPrefix: '/Meeting-Memory-Agent',
  trailingSlash: true,
}

export default nextConfig;
