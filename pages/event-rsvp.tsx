import type { NextPage } from 'next'
import React from 'react'

import EventBackgroundImage from '../../public/img/event-bg-image.png'
import { EventRSVPResult } from '../components/EventRSVPResult'
import { OneColLayout } from '../components/Layout'
import { withEventToken } from '../hooks/useProcessEventToken'

const WrappedEventRsvpResult = withEventToken(EventRSVPResult)

/**
 * IMPORTANT: Page will be deprecated in
 * favor of the new events/ pages
 */

const EventRsvp: NextPage = () => {
  return (
    <OneColLayout backgroundImage={EventBackgroundImage}>
      <WrappedEventRsvpResult />
    </OneColLayout>
  )
}

export default EventRsvp
