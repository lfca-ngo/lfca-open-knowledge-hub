import Icon from '@ant-design/icons'
import { Button, Space } from 'antd'
import { CalendarEvent, google, ics, office365, outlook } from 'calendar-link'
import React, { useMemo } from 'react'

import { EventFragment } from '../../services/lfca-backend'
import { parseMarkdownContent } from '../MarkdownContent'
import GmailIcon from './icons/gmail.svg'
import IcsIcon from './icons/ics.svg'
import Office365Icon from './icons/office365.svg'
import OutlookIcon from './icons/outlook.svg'

interface EventCalendarLinksProps {
  event: EventFragment
}

function generateHTMLDescription(
  description?: string | null,
  videoConferenceUrl?: string | null
) {
  if (!description && !videoConferenceUrl) return undefined

  return `<html>${parseMarkdownContent(description || '')}${
    videoConferenceUrl
      ? `<p>Join event: <a href="${videoConferenceUrl}">${videoConferenceUrl}</a></p>`
      : ''
  }</html>`.replace(/(\r\n|\n|\r)/gm, '')
}

export const EventCalendarLinks = ({ event }: EventCalendarLinksProps) => {
  const parsedEvent = useMemo<CalendarEvent>(
    () => ({
      description: generateHTMLDescription(
        event.description,
        event.videoConferenceUrl
      ),
      end: event.end,
      start: event.start,
      title: event.title,
    }),
    [event]
  )

  const navigateToUrl = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button
        block
        icon={<Icon component={GmailIcon} />}
        onClick={() => navigateToUrl(google(parsedEvent))}
      >
        Add to Google Calendar
      </Button>
      <Button
        block
        icon={<Icon component={OutlookIcon} />}
        onClick={() => navigateToUrl(outlook(parsedEvent))}
      >
        Add to Outlook
      </Button>
      <Button
        block
        icon={<Icon component={Office365Icon} />}
        onClick={() => navigateToUrl(office365(parsedEvent))}
      >
        Add to Office365
      </Button>
      <Button
        block
        icon={<Icon component={IcsIcon} />}
        onClick={() => navigateToUrl(ics(parsedEvent))}
      >
        Download .ics file
      </Button>
    </Space>
  )
}
