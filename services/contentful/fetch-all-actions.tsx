// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'

export const ALL_ACTIONS = 'All Actions'

const addAtIndexByImpactValue = (acc: any, action: any, tagName: any) => {
  const index = acc.byTags[tagName].findIndex(
    (item: any) => item.impactValue <= action.impactValue
  )

  if (index === -1) acc.byTags[tagName].push(action)
  else acc.byTags[tagName].splice(index, 0, action)

  return acc
}

export const fetchAllActions = async () => {
  const res = await getEntries({
    content_type: 'action',
    include: 3,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const actions = JSON.parse(stringifiedData)

  // group by tags
  const formattedActions = actions.reduce(
    (acc: any, action: any) => {
      if (!action.tags) return acc // skip if no tags

      // for each tag, add to the tag's group
      action.tags.forEach((tag: any) => {
        const tagName = tag?.name
        if (!acc.byTags[tagName]) acc.byTags[tagName] = []

        // sort by impact value (descending)
        // add item either before or after the other items with the same impact value
        acc = addAtIndexByImpactValue(acc, action, tagName)
      })
      // add every action to the 'All Actions' group
      acc.byTags[ALL_ACTIONS] = acc.byTags[ALL_ACTIONS] || []
      acc = addAtIndexByImpactValue(acc, action, ALL_ACTIONS)

      // make every action accessible in map by its id
      acc.byId[action.actionId] = action

      return acc
    },
    { byId: {}, byTags: { [ALL_ACTIONS]: [] } }
  )

  return formattedActions
}
