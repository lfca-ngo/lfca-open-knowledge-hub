const withAntdLess = require('next-plugin-antd-less')
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/actions',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
      },
    }

    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = withPlugins(
  [
    [
      withAntdLess,
      {
        lessVarsFilePath: './styles/variables.less',
      },
    ],
  ],
  nextConfig
)
