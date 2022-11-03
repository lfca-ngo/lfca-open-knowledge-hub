import type { NextPage } from 'next'
import React from 'react'

import { EventRSVPResult } from '../../../components/EventRSVPResult'
import { OneColLayout } from '../../../components/Layout'
import { withEventToken } from '../../../hooks/useProcessEventToken'

export const WrappedEventRSVPResult = withEventToken(EventRSVPResult)

const EventRsvp: NextPage = () => {
  return (
    <OneColLayout>
      <WrappedEventRSVPResult />
    </OneColLayout>
  )
}

export default EventRsvp
