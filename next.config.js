/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO remove if not in develop mode
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3005/:path*',
      },
    ]
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
