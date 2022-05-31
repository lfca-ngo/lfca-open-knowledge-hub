import { LoadingOutlined } from '@ant-design/icons'
import { Alert, Button, message } from 'antd'
import { applyActionCode, checkActionCode } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { useFirebase } from '../../hooks/firebase'
import { useRequestPasswordResetMutation } from '../../services/lfca-backend'

export const RecoverEmail = ({ actionCode }: { actionCode: string }) => {
  const [error, setError] = useState('')
  const [restoredEmail, setRestoredEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [validCode, setValidCode] = useState(false)
  const [verifiedCode, setVerifiedCode] = useState(false)

  const [{ fetching }, requestPasswordReset] = useRequestPasswordResetMutation()

  const { auth } = useFirebase()

  const verifyCode = () => {
    // Confirm the action code is valid.
    checkActionCode(auth, actionCode).then(
      (info: any) => {
        // Get the restored email address.
        const restoredEmail = info['data']['email']
        // Revert to the old email.
        applyActionCode(auth, actionCode).then(() => {
          // Account email reverted to restoredEmail
          setRestoredEmail(restoredEmail)
          setVerifiedCode(true)
          setValidCode(true)
        })
      },
      (error) => {
        // Invalid code.
        setError(error.message)
        setVerifiedCode(true)
        setValidCode(false)
      }
    )
  }

  const sendReset = () => {
    // You might also want to give the user the option to reset their password
    // in case the account was compromised:
    requestPasswordReset({
      input: {
        email: restoredEmail,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else setResetSent(true)
    })
  }

  useEffect(() => {
    if (actionCode) {
      verifyCode()
    }
  }, [actionCode])

  let component = null
  if (!verifiedCode) {
    component = <LoadingOutlined />
  } else if (resetSent) {
    component = (
      <div className="RecoverEmail">
        <h1>Check your email</h1>
        <p>
          Follow the instructions sent to <span>{restoredEmail}</span> to
          recover your password.
        </p>
      </div>
    )
  } else if (verifiedCode && validCode) {
    component = (
      <div className="RecoverEmail">
        <h1>Updated email address</h1>
        <p>
          Your sign-in email address has been changed back to{' '}
          <span>{restoredEmail}</span>
        </p>
        <p>
          If you did not change your sign-in email, it is possible someone is
          trying to access your account and you should
          <Button loading={fetching} onClick={sendReset} type="primary">
            Change your password right away
          </Button>
        </p>
      </div>
    )
  } else if (verifiedCode && !validCode) {
    component = (
      <div className="RecoverEmail">
        <h1>Unable to update your email address</h1>
        <Alert
          description={error}
          message={`There was a problem changing your sign-in email back.`}
          showIcon
          type="error"
        />
      </div>
    )
  }

  return component
}
