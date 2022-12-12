import { GaxiosResponse } from 'gaxios'
import { calendar_v3, google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getErrorMessage } from '../../utils'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_URL
)

const calendar = google.calendar('v3')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  try {
    // Validate if the event has everything we need
    const access_token = req.query?.access_token as string
    if (typeof access_token !== 'string')
      throw new Error('Invalid access_token')

    oauth2Client.setCredentials({ access_token })

    // Get the calendar list
    const result: GaxiosResponse<calendar_v3.Schema$CalendarList> =
      await new Promise((resolve, reject) => {
        calendar.calendarList
          .list({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            auth: oauth2Client,
          })
          .then((r) => resolve(r))
          .catch((e) => reject(e))
      })

    res.status(200).json(
      result.data.items
        ?.filter((c) => c.accessRole === 'owner' || c.accessRole === 'writer')
        .map((c) => ({
          id: c.id,
          name: c.summaryOverride || c.summary,
        }))
    )
  } catch (e) {
    throw new Error(getErrorMessage(e))
  }
}
