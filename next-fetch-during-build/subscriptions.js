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

  // fetch stuff here
  const CACHE_PATH = path.join(__dirname, `/data/${key}.json`)
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(subscriptions), 'utf8')
  } catch (e) {
    // Nothing to do here
  }
}

exports.fetchAndSaveByKey = fetchAndSaveByKey
