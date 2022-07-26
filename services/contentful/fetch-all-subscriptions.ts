// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'
import { ContentfulSubscriptionFields } from './types'

export type Subscription = ContentfulSubscriptionFields

export const fetchAllSubscriptions = async () => {
  const res = await getEntries({
    content_type: 'subscription',
    include: 2,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const subscriptions = JSON.parse(stringifiedData) as Subscription[]

  // sort subscriptions by price
  const sortedSubscriptions = subscriptions.sort(
    (a, b) => a.pricing[0].price - b.pricing[0].price
  )

  return sortedSubscriptions
}
