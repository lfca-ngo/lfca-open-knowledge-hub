/* eslint-disable @typescript-eslint/no-var-requires */
const nextContentful = require('./next-contentful')
const path = require('path')
const fs = require('fs')

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
    (a, b) => a.pricing[0].price - b.pricing[0].price
  )

  // save employee tiers separately
  const basicTier = subscriptions.find((s) => s.name === 'BASIC')
  const employeeTiers = basicTier?.pricing.map((p) => p?.maxEmployees) || []

  // fetch stuff here
  const CACHE_PATH_SUBSCRIPTIONS = path.join(__dirname, `/data/${key}.json`)
  const CACHE_PATH_EMPLOYEE_TIERS = path.join(
    __dirname,
    `/data/_employee-tiers.json`
  )

  try {
    fs.writeFileSync(
      CACHE_PATH_SUBSCRIPTIONS,
      JSON.stringify(sortedSubscriptions),
      'utf8'
    )
    fs.writeFileSync(
      CACHE_PATH_EMPLOYEE_TIERS,
      JSON.stringify(employeeTiers),
      'utf8'
    )
  } catch (e) {
    // Nothing to do here
  }
}

exports.fetchAndSaveByKey = fetchAndSaveByKey
