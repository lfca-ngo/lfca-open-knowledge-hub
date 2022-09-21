/* eslint-disable @typescript-eslint/no-var-requires */
const withAntdLess = require('next-plugin-antd-less')
const rootCategories = require('./next-fetch-during-build/root-categories')

module.exports = async () => {
  // the next config file (node script) is executed during build time
  // fetch global data that needs to be accessible throughout the app
  // here and make it accessible in a simple json structure
  await rootCategories.fetchAndSaveByKey('_category-tree-data')

  return withAntdLess({
    images: {
      domains: ['images.ctfassets.net', 'res.cloudinary.com'],
    },

    lessVarsFilePath: './styles/variables.less',

    nextjs: {
      localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
    },

    async redirects() {
      return process.env.MAINTENANCE
        ? [
            {
              destination: '/maintenance',
              permanent: false,
              source: '/((?!maintenance).*)',
            },
          ]
        : [
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

    webpack(config) {
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
  })
}
