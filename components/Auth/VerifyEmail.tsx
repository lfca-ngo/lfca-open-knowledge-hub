import { LoadingOutlined } from '@ant-design/icons'
import { applyActionCode } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { useFirebase } from '../../hooks/firebase'

export const VerifyEmail = ({ actionCode }: { actionCode: string }) => {
  const [error, setError] = useState('')
  const [validCode, setValidCode] = useState(false)
  const [verifiedCode, setVerifiedCode] = useState(false)

  const { auth } = useFirebase()

  const verifyCode = () => {
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

  useEffect(() => {
    if (actionCode) {
      verifyCode()
    }
  }, [actionCode])

  let component = null
  if (!verifiedCode) {
    component = <LoadingOutlined />
  } else if (verifiedCode && validCode) {
    component = (
      <div className="VerifyEmail">
        <h1>Your email has been verified</h1>
        <p>You can now sign in with your new account</p>
      </div>
    )
  } else if (verifiedCode && !validCode) {
    component = (
      <div className="VerifyEmail">
        <h1>Try verifying your email again</h1>
        <p className="error">{error}</p>
      </div>
    )
  }

  return component
}
