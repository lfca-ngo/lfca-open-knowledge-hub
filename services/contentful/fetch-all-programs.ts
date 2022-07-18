// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { getEntries } from './api'
import { ContentfulProgramFields } from './types'

export type Program = ContentfulProgramFields

export const fetchAllPrograms = async () => {
  const res = await getEntries({
    content_type: 'program',
    include: 1,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res)
  const programs = JSON.parse(stringifiedData) as Program[]

  return programs
}
