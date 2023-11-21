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
  output: 'standalone',

  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: 'node-loader',
    })

    return config
  },
}

module.exports = nextConfig
