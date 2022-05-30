import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { Signup } from '../components/Auth/'
import { OneColLayout } from '../components/Layout'

const SignUp: NextPage = () => {
  const router = useRouter()
  const { companyId, email, companyName } = router.query

  return (
    <OneColLayout>
      {companyId && email && companyName ? (
        <Signup
          initialValues={{
            companyId: companyId as string,
            companyName: companyName as string,
            email: email as string,
          }}
        />
      ) : (
        <div>
          <h1>Invalid invite</h1>
          <p>
            Your invite link is not valid. Please reach out to{' '}
            <a href="mailto:info@lfca.earth">info@lfca.earth</a>{' '}
          </p>
        </div>
      )}
    </OneColLayout>
  )
}

export default SignUp
