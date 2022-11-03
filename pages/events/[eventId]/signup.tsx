import type { NextPage } from 'next'
import React from 'react'

import { EventSignUp } from '../../../components/EventSignUp'
import { OneColLayout } from '../../../components/Layout'
import { withEventToken } from '../../../hooks/useProcessEventToken'

export const WrappedEventSignUp = withEventToken(EventSignUp)

const EventSignUpPage: NextPage = () => {
  return (
    <OneColLayout>
      <WrappedEventSignUp />
    </OneColLayout>
  )
}

export default EventSignUpPage
