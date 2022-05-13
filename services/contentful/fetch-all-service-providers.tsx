// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'

export const fetchAllServiceProviders = async () => {
  const res = await getEntries({
    content_type: 'serviceProvider',
    include: 3,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res.items)
  const serviceProviders = JSON.parse(stringifiedData)

  return serviceProviders
}
