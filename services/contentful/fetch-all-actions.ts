// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'
import { ContentfulActionFields } from './types'

export const fetchAllActions = async () => {
  const res = await getEntries({
    content_type: 'action',
    include: 1, // Note: relatedActions can cause a circular reference if we include >1 layers
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const actions = JSON.parse(stringifiedData)

  // map actions by actionId
  const byId = actions.reduce(
    (
      acc: Record<string, ContentfulActionFields>,
      action: ContentfulActionFields
    ) => {
      acc[action.actionId] = action
      return acc
    },
    {} as Record<string, ContentfulActionFields>
  )

  return byId
}
