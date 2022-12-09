import Icon from '@ant-design/icons'
import { Button, Space } from 'antd'
import { CalendarEvent, google, office365, outlook } from 'calendar-link'
import React, { useMemo } from 'react'

import { EVENTS, useAnalytics } from '../../hooks/segment'
import { EventFragment } from '../../services/lfca-backend'
import { DEFAULT_SUPPORT_EMAIL } from '../../utils'
import {
  createHtmlDescription,
  generateCalendarLinks,
} from '../../utils/generate-calendar-links'
import GmailIcon from './icons/gmail.svg'
import IcsIcon from './icons/ics.svg'
import Office365Icon from './icons/office365.svg'
import OutlookIcon from './icons/outlook.svg'

interface EventCalendarLinksProps {
  event: EventFragment
}

export const EventCalendarLinks = ({ event }: EventCalendarLinksProps) => {
  const analytics = useAnalytics()

  const parsedEvent = useMemo<CalendarEvent>(
    () => ({
      description: createHtmlDescription(
        event.description,
        event.videoConferenceUrl
      ),
      end: event.end,
      organizer: {
        email: DEFAULT_SUPPORT_EMAIL,
        name: 'LFCA',
      },
      rRule: event.recurrenceRule ?? undefined,
      start: event.start,
      title: event.title,
    }),
    [event]
  )

  const { icsLink } = useMemo(() => generateCalendarLinks(event), [event])

  const navigateToUrl = (url: string) => {
    // track event
    analytics.track(EVENTS.RSVP_ADD_TO_CAL, { url })
    // open url
    window.open(url, '_blank')
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button
        block
        icon={<Icon component={GmailIcon} />}
        onClick={() => navigateToUrl(google(parsedEvent))}
        size="large"
      >
        Add to Google Calendar
      </Button>
      {!parsedEvent.rRule && (
        <>
          <Button
            block
            icon={<Icon component={OutlookIcon} />}
            onClick={() => navigateToUrl(outlook(parsedEvent))}
            size="large"
          >
            Add to Outlook
          </Button>
          <Button
            block
            icon={<Icon component={Office365Icon} />}
            onClick={() => navigateToUrl(office365(parsedEvent))}
            size="large"
          >
            Add to Office365
          </Button>
        </>
      )}
      <Button
        block
        icon={<Icon component={IcsIcon} />}
        onClick={() => navigateToUrl(icsLink)}
        size="large"
      >
        Download iCal file
      </Button>
    </Space>
  )
}
