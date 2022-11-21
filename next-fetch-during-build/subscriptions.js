/* eslint-disable @typescript-eslint/no-var-requires */
const nextContentful = require('./next-contentful')
const fs = require('fs')
const { CACHE_PATH } = require('./next-contentful')

const fetchAndSaveByKey = async (key) => {
  // we could fetch the category tree here
  const response = await nextContentful.client.getEntries({
    content_type: 'subscription',
    include: 2,
    locale: 'en-US',
  })

  const data = nextContentful.parseResponse({
    fields: { items: response.items },
  })
  const subscriptions = data.items

  // sort them
  const sortedSubscriptions = subscriptions.sort(
    (a, b) => b.pricing[0].price - a.pricing[0].price
  )

  // save employee tiers separately
  const basicTier = subscriptions.find((s) => s.name === 'BASIC')
  const employeeTiers = basicTier?.pricing.map((p) => p?.maxEmployees) || []

  // fetch stuff here
  try {
    fs.writeFileSync(
      `${CACHE_PATH}/${key}.json`,
      JSON.stringify(sortedSubscriptions),
      'utf8'
    )
    fs.writeFileSync(
      `${CACHE_PATH}/_employee-tiers.json`,
      JSON.stringify(employeeTiers),
      'utf8'
    )
  } catch (e) {
    // Nothing to do here
  }
}

exports.fetchAndSaveByKey = fetchAndSaveByKey
