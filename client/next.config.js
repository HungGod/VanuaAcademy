/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for SSG
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig


