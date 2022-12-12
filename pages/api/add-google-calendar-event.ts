import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

import { EventFragment } from '../../services/lfca-backend'
import { getErrorMessage } from '../../utils'
import { createHtmlDescription } from '../../utils/generate-calendar-links'

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_URL
)

const calendar = google.calendar('v3')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  try {
    // Validate if the event has everything we need
    const event: EventFragment = req.body?.event
    if (!event || !event.id || !event.start || !event.end || !event.title)
      throw new Error('Invalid event')

    const access_token: string = req.body?.access_token
    if (typeof access_token !== 'string')
      throw new Error('Invalid access_token')

    const calendar_id: string | undefined = req.body?.calendar_id

    oauth2Client.setCredentials({ access_token })

    // Import the main event
    await new Promise((resolve, reject) => {
      calendar.events
        .import({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          auth: oauth2Client,
          calendarId: calendar_id || 'primary',
          requestBody: {
            description: event.description
              ? createHtmlDescription(
                  event.description,
                  event.videoConferenceUrl
                )
              : undefined,
            end: {
              dateTime: event.end,
              timeZone: 'Europe/Berlin',
            },
            iCalUID: event.id,
            recurrence: event.recurrenceRule
              ? [`RRULE:${event.recurrenceRule}`]
              : undefined,
            start: {
              dateTime: event.start,
              timeZone: 'Europe/Berlin',
            },
            summary: event.title,
          },
        })
        .then((r) => resolve(r))
        .catch((e) => reject(e))
    })

    // Import all ovverrides
    for (const override of event.recurrenceOverrides || []) {
      await new Promise((resolve, reject) => {
        calendar.events
          .import({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            auth: oauth2Client,
            calendarId: calendar_id || 'primary',
            requestBody: {
              description:
                override.description || event.description
                  ? createHtmlDescription(
                      override.description || event.description,
                      override.videoConferenceUrl || event.videoConferenceUrl
                    )
                  : undefined,
              end: {
                dateTime: override.end || event.end,
                timeZone: 'Europe/Berlin',
              },
              iCalUID: event.id,
              originalStartTime: {
                dateTime: override.id.split('_').pop() as string,
                timeZone: 'Europe/Berlin',
              },
              start: {
                dateTime: override.start || event.start,
                timeZone: 'Europe/Berlin',
              },
              summary: override.title || event.title,
            },
          })
          .then((r) => resolve(r))
          .catch((e) => reject(e))
      })
    }

    res.status(200).json({ success: true })
  } catch (e) {
    throw new Error(getErrorMessage(e))
  }
}
