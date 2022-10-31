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

export const fetchContentCollectionById = async (id: string) => {
  const res = await getEntries({
    content_type: 'contentCollection',
    'fields.collectionId': id,
    include: 3,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const contentCollection = JSON.parse(stringifiedData)
  const firstCollection = contentCollection[0]

  return firstCollection
}
