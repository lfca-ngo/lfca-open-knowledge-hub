import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { OneColLayout } from '../../../components/Layout'
import { useProcessEventRsvpTokenMutation } from '../../../services/lfca-backend'

const EventSignUp: NextPage = () => {
  const { isReady, query } = useRouter()
  const { token } = query

  const [{ data, error, fetching }, processEventRSVPToken] =
    useProcessEventRsvpTokenMutation()

  useEffect(() => {
    if (typeof token === 'string') {
      processEventRSVPToken({
        input: {
          token,
        },
      })
    }
  }, [processEventRSVPToken, token])

  return <OneColLayout>Sign up</OneColLayout>
}

export default EventSignUp
