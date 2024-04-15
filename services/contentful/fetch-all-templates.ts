// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'
import { ContentfulSourceFields } from './types'

export type Source = ContentfulSourceFields

export const fetchAllTemplates = async () => {
  const res = await getEntries({
    content_type: 'source',
    'fields.tags[in]': 'Template',
    include: 2,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const templates = JSON.parse(stringifiedData) as Source[]

  return templates
}
