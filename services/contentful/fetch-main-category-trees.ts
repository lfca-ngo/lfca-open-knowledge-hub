// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'

export const fetchMainCategoryTrees = async () => {
  const res = await getEntries({
    content_type: 'categoryTree',
    'fields.isMainCategory': true,
    include: 4,
    locale: 'en-US',
    order: '-fields.sortWeight',
  })

  const stringifiedData = safeJsonStringify(res)
  const mainCategoryTrees = JSON.parse(stringifiedData)

  return mainCategoryTrees
}
