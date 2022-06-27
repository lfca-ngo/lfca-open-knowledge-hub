import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { Signup } from '../components/Auth/'
import { OneColLayout } from '../components/Layout'
import { SUPPORT_EMAIL_LINK } from '../utils'

const SignUp: NextPage = () => {
  const router = useRouter()
  const { email } = router.query

  if (!router.isReady) return null

  return (
    <OneColLayout>
      {email ? (
        <Signup email={email as string} />
      ) : (
        <div>
          <h1>Invalid invite</h1>
          <p>
            Your invite link is not valid. Please reach out to{' '}
            {SUPPORT_EMAIL_LINK}, so we can create a new invite link for you.
          </p>
        </div>
      )}
    </OneColLayout>
  )
}

export default SignUp
