import { LoadingOutlined } from '@ant-design/icons'
import { Alert, Button } from 'antd'
import { applyActionCode } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useFirebase } from '../../hooks/firebase'
import { ACTIONS } from '../../utils/routes'

export const VerifyEmail = ({ actionCode }: { actionCode: string }) => {
  const [error, setError] = useState('')
  const [validCode, setValidCode] = useState(false)
  const [verifiedCode, setVerifiedCode] = useState(false)

  const { auth } = useFirebase()

  useEffect(() => {
    if (actionCode) {
      // Try to apply the email verification code.
      applyActionCode(auth, actionCode).then(
        () => {
          // Email address has been verified.
          setVerifiedCode(true)
          setValidCode(true)
        },
        (error) => {
          // Code is invalid or expired. Ask the user to verify their email address
          // again.
          setError(error.message)
          setVerifiedCode(true)
          setValidCode(false)
        }
      )
    }
  }, [actionCode, auth])

  let component = null

  if (!verifiedCode) {
    component = <LoadingOutlined />
  } else if (verifiedCode && validCode) {
    component = (
      <div className="VerifyEmail">
        <h1>Your email has been verified</h1>
        <p>You can now sign in with your new account.</p>
        <Link href={ACTIONS}>
          <Button type="primary">Sign in</Button>
        </Link>
      </div>
    )
  } else if (verifiedCode && !validCode) {
    component = (
      <div className="VerifyEmail">
        <h1>Try verifying your email again</h1>
        <Alert
          description={error}
          message={`There was a problem verifying your email`}
          showIcon
          type="error"
        />
      </div>
    )
  }

  return component
}
