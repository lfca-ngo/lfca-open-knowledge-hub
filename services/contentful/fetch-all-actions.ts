// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'
import { ContentfulActionFields } from './types'

export const fetchAllActions = async () => {
  const selectedFields = [
    'title',
    'actionId',
    'requirements',
    'tags',
    'heroImage',
    'impactValue',
    'aboutText',
    'expiresAfterDays',
  ]

  // Note: relatedActions can cause a circular reference if we
  // include >1 layers, so we have to make 2 separate calls and
  // merge them afterwards
  const res = await getEntries({
    content_type: 'action',
    include: 3,
    locale: 'en-US',
    select: selectedFields.map((f) => `fields.${f}`).join(','),
  })

  const stringifiedDataActions = safeJsonStringify(res)
  const actions = JSON.parse(stringifiedDataActions)

  // second call to get related actions
  const selectedFieldsRelatedActions = [
    'title',
    'actionId',
    'relatedActions',
    'heroImage',
  ]

  const relatedActionsRes = await getEntries({
    content_type: 'action',
    include: 1,
    locale: 'en-US',
    select: selectedFieldsRelatedActions.map((f) => `fields.${f}`).join(','),
  })

  const stringifiedDataRelatedActions = safeJsonStringify(relatedActionsRes)
  const relatedActionsData = JSON.parse(stringifiedDataRelatedActions)

  // map actions by actionId
  const byId = actions.reduce(
    (
      acc: Record<string, ContentfulActionFields>,
      action: ContentfulActionFields
    ) => {
      // find the corresponding related actions
      const matchedAction = relatedActionsData.find(
        (a: Pick<ContentfulActionFields, 'relatedActions' | 'actionId'>) =>
          a.actionId === action.actionId
      )

      acc[action.actionId] = {
        ...action,
        relatedActions: matchedAction?.relatedActions || null,
      }
      return acc
    },
    {} as Record<string, ContentfulActionFields>
  )

  return byId
}
