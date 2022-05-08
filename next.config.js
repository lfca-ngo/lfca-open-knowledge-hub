const withAntdLess = require('next-plugin-antd-less')
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  webpack: (config) => {
    // config.module.rules.push({
    //   issuer: /\.[jt]sx?$/,
    //   test: /\.svg$/i,
    //   use: ['@svgr/webpack'],
    // })
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
