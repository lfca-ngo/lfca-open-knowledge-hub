import { LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ACTIONS } from '../../utils/routes'

import { useFirebase } from '../../hooks/firebase'

export const ResetPassword = ({ actionCode }: { actionCode: string }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [verifiedCode, setVerifiedCode] = useState(false)
  const [validCode, setValidCode] = useState(false)

  const { auth } = useFirebase()

  const verifyCode = () => {
    // Verify the password reset code is valid.
    verifyPasswordResetCode(auth, actionCode).then(
      (email) => {
        // Password reset code is valid.
        setVerifiedCode(true)
        setValidCode(true)
        setEmail(email)
      },
      (error) => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        setError(error.message)
        setVerifiedCode(true)
        setValidCode(false)
      }
    )
  }

  const handleResetPassword = ({ password }: { password: string }) => {
    // Save the new password.
    confirmPasswordReset(auth, actionCode, password).then(
      () => {
        // Password reset has been confirmed and new password updated.
        setSuccess(true)
      },
      (error) => {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
        setError(error.message)
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
  } else if (success) {
    component = (
      <div className="ResetPassword">
        <h1>Password changed</h1>
        <p>You can now sign in with your new password!</p>
        <Link href={ACTIONS}>
          <Button type="primary">Sign in</Button>
        </Link>
      </div>
    )
  } else if (verifiedCode && email) {
    component = (
      <div className="ResetPassword">
        <h1>Reset your password for {email}</h1>

        <Form onFinish={handleResetPassword}>
          <Form.Item name="password">
            <Input placeholder="******" type="password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Reset password
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  } else if (verifiedCode && !validCode) {
    component = (
      <div className="ResetPassword">
        <h1>Try resetting your password again</h1>
        <p className="error">{error}</p>
      </div>
    )
  }

  return component
}
