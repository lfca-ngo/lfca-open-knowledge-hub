import * as contentful from 'contentful'

import { isDev } from '../../../utils'

const accessToken = process.env.CF_ACCESS_TOKEN || ''
const previewAccessToken = process.env.CF_PREVIEW_ACCESS_TOKEN || ''
const spaceId = process.env.CF_SPACE_ID || ''

export const client = contentful.createClient({
  accessToken: isDev ? previewAccessToken : accessToken,
  host: isDev ? 'preview.contentful.com' : 'cdn.contentful.com',
  space: spaceId,
})
