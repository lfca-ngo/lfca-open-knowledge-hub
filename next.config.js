/* eslint-disable @typescript-eslint/no-var-requires */
const withAntdLess = require('next-plugin-antd-less')
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  images: {
    domains: ['images.ctfassets.net', 'res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        destination: '/actions',
        permanent: true,
        source: '/',
      },
      {
        destination: '/renew-personal-pledge',
        permanent: true,
        source: '/pledge-renewal',
      },
      {
        destination: '/signup',
        permanent: true,
        source: '/registration',
      },
    ]
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        os: false,
        path: false,
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
