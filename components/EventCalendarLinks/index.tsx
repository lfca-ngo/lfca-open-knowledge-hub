import Icon from '@ant-design/icons'
import { Button, Space } from 'antd'
import React, { useMemo } from 'react'

import { EVENTS, useAnalytics } from '../../hooks/segment'
import { useUser } from '../../hooks/user'
import { EventFragment } from '../../services/lfca-backend'
import { generateCalendarLinks } from '../../utils/generate-calendar-links'
import { Google } from './Google'
import IcsIcon from './icons/ics.svg'

interface EventCalendarLinksProps {
  event: EventFragment
}

export const EventCalendarLinks = ({ event }: EventCalendarLinksProps) => {
  const analytics = useAnalytics()

  const { isAdmin } = useUser()

  const { icsLink } = useMemo(() => generateCalendarLinks(event), [event])

  const navigateToUrl = (url: string) => {
    // track event
    analytics.track(EVENTS.RSVP_ADD_TO_CAL, { url })
    // open url
    window.open(url, '_blank')
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {isAdmin ? <Google event={event} /> : null}

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
