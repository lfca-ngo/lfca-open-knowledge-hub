// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'
import { ContentfulQuestionnaireFields } from './types'

export const fetchAllQuestionnaires = async () => {
  const res = await getEntries({
    content_type: 'questionnaire',
    include: 3,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const questionnaires = JSON.parse(stringifiedData)

  const byCountryCode = questionnaires?.reduce(
    (
      acc: Record<string, ContentfulQuestionnaireFields>,
      q: ContentfulQuestionnaireFields
    ) => {
      acc[q.countryCode] = q
      return acc
    },
    {}
  ) as Record<string, ContentfulQuestionnaireFields>

  return byCountryCode
}
