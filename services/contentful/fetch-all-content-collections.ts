// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'

export const fetchAllContentCollections = async () => {
  const res = await getEntries({
    content_type: 'contentCollection',
    include: 3,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const contentCollection = JSON.parse(stringifiedData)

  return contentCollection
}
