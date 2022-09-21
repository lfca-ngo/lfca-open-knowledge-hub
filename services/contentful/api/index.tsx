import * as utils from '../../../next-fetch-during-build/next-contentful'
import { createKey, getData, setData } from './cache'

export const getEntry = async (id: any, query: any) => {
  const cacheKey = createKey({ ...query, id })

  const cachedData = getData(cacheKey)

  if (cachedData) {
    return cachedData
  } else {
    const response = await utils.client.getEntry(id, query)

    const parsed = utils.parseResponse(response)

    setData(cacheKey, parsed)

    return parsed
  }
}

export const getEntries = async (query: any) => {
  const cacheKey = createKey(query)

  const cachedData = getData(cacheKey)

  if (cachedData) {
    return cachedData
  } else {
    const response = await utils.client.getEntries(query)

    const parsed: any = utils.parseResponse({
      fields: { items: response.items },
    })

    setData(cacheKey, parsed.items)

    return parsed.items
  }
}
