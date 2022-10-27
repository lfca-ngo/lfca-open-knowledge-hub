/* eslint-disable @typescript-eslint/no-var-requires */
const companyTags = require('./next-fetch-during-build/company-tags')
const rootCategories = require('./next-fetch-during-build/root-categories')
const subscriptions = require('./next-fetch-during-build/subscriptions')
const withLess = require('next-with-less')
const path = require('path')

const lessFontsFile = path.resolve(__dirname, './styles/fonts.less')
const lessMixinsFile = path.resolve(__dirname, './styles/mixins.less')
const lessVariablesFile = path.resolve(__dirname, './styles/variables.less')

module.exports = async () => {
  // the next config file (node script) is executed during build time
  // fetch global data that needs to be accessible throughout the app
  // here and make it accessible in a simple json structure
  await rootCategories.fetchAndSaveByKey('_category-tree-data')
  await companyTags.fetchAndSaveByKey('_company-tags-data')
  await subscriptions.fetchAndSaveByKey('_subscriptions-data')

  return withLess({
    images: {
      domains: ['images.ctfassets.net', 'res.cloudinary.com'],
    },

    lessLoaderOptions: {
      additionalData: (content) =>
        `${content}\n
        @import '${lessFontsFile}';\n
        @import '${lessMixinsFile}';\n
        @import '${lessVariablesFile}';
      `,
      lessOptions: {
        javascriptEnabled: true,
      },
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
