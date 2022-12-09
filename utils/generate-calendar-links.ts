// Inspired by: https://github.com/AnandChowdhary/calendar-link/blob/master/src/index.ts

import moment from 'moment-timezone'

import {
  markdownContentToHtml,
  markdownContentToPlainText,
} from '../components/MarkdownContent'
import { EventFragment } from '../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '.'

export function generateCalendarLinks(event: EventFragment) {
  const plainTextDescription = createPlainTextDescription(
    event.description,
    event.videoConferenceUrl
  )

  const startDateUtcString = dateToUtcString(event.start)
  const endDateUtcString = dateToUtcString(event.end)

  /**
   * ICS
   */
  const calendarChunks = [
    {
      key: 'BEGIN',
      value: 'VCALENDAR',
    },
    {
      key: 'VERSION',
      value: '2.0',
    },
    ...createIcalEventChunks(
      {
        description: plainTextDescription,
        dtEnd: endDateUtcString,
        dtStart: startDateUtcString,
        summary: event.title,
        uid: event.id,
      },
      event.recurrenceRule
        ? [
            {
              key: 'RRULE',
              value: event.recurrenceRule,
            },
          ]
        : undefined
    ),
    ...(
      event.recurrenceOverrides?.map((override) =>
        createIcalEventChunks(
          {
            description: override.description
              ? createPlainTextDescription(
                  override.description,
                  override.videoConferenceUrl || event.videoConferenceUrl
                )
              : plainTextDescription,
            dtEnd: override.end
              ? dateToUtcString(override.end)
              : endDateUtcString,
            dtStart: override.start
              ? dateToUtcString(override.start)
              : startDateUtcString,
            summary: override.title ? override.title : event.title,
            uid: event.id,
          },
          [
            {
              key: 'RECURRENCE-ID',
              value: dateToUtcString(override.id.split('_').pop() as string),
            },
          ]
        )
      ) || []
    ).flat(),
    {
      key: 'END',
      value: 'VCALENDAR',
    },
  ]

  let icsUrl = ''

  calendarChunks.forEach((chunk) => {
    if (chunk.value) {
      icsUrl += `${chunk.key}:${encodeURIComponent(`${chunk.value}\n`)}`
    }
  })

  return {
    icsLink: `data:text/calendar;charset=utf8,${icsUrl}`,
  }
}

function dateToUtcString(dateString: string) {
  const date = new Date(dateString)

  return moment(date).utc().format('YYYYMMDD[T]HHmmss[Z]')
}

export function createPlainTextDescription(
  description?: string | null,
  videoConferenceUrl?: string | null
) {
  return `${markdownContentToPlainText(description || '')}${
    videoConferenceUrl ? `Join the call: ${videoConferenceUrl}` : ''
  }`
    .replace(/,/gm, ',')
    .replace(/;/gm, ';')
    .replace(/\r\n/gm, '\n')
    .replace(/\n/gm, '\\n')
    .replace(/(\\n)[\s\t]+/gm, '\\n')
}

export function createHtmlDescription(
  description?: string | null,
  videoConferenceUrl?: string | null
) {
  return `<html>${markdownContentToHtml(description || '')}${
    videoConferenceUrl
      ? `<p>Join event: <a href="${videoConferenceUrl}">${videoConferenceUrl}</a></p>`
      : ''
  }</html>`.replace(/(\r\n|\n|\r)/gm, '')
}

function createIcalEventChunks(
  props: {
    description: string
    dtEnd: string
    dtStart: string
    summary: string
    uid: string
  },
  additionalChunks?: Record<string, string>[]
) {
  return [
    {
      key: 'BEGIN',
      value: 'VEVENT',
    },
    {
      key: 'UID',
      value: props.uid,
    },
    {
      key: 'DTSTART',
      value: props.dtStart,
    },
    {
      key: 'DTEND',
      value: props.dtEnd,
    },
    {
      key: 'SUMMARY',
      value: props.summary,
    },
    {
      key: 'DESCRIPTION',
      value: props.description,
    },
    {
      key: 'ORGANIZER;CN=LFCA',
      value: `MAILTO:${DEFAULT_SUPPORT_EMAIL}`,
    },
    ...(additionalChunks || []),
    {
      key: 'END',
      value: 'VEVENT',
    },
  ]
}
