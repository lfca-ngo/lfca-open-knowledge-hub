import type { NextPage } from 'next'
import React from 'react'

import { EventDetails } from '../../../components/EventDetails'
import { OneColLayout } from '../../../components/Layout'
import { withEventToken } from '../../../hooks/useProcessEventToken'

export const WrappedEventDetails = withEventToken(EventDetails)

const Event: NextPage = () => {
  return (
    <OneColLayout>
      <WrappedEventDetails />
    </OneColLayout>
  )
}

export default Event
