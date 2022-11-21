import { LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useFirebase } from '../../hooks/firebase'
import { ACTIONS } from '../../utils/routes'

export const ResetPassword = ({ actionCode }: { actionCode: string }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [verifiedCode, setVerifiedCode] = useState(false)
  const [validCode, setValidCode] = useState(false)

  const { auth } = useFirebase()

  const handleResetPassword = ({ password }: { password: string }) => {
    setLoading(true)
    // Save the new password.
    confirmPasswordReset(auth, actionCode, password).then(
      () => {
        // Password reset has been confirmed and new password updated.
        setLoading(false)
        setSuccess(true)
      },
      (error) => {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
        setLoading(false)
        setError(error.message)
      }
    )
  }

  useEffect(() => {
    if (actionCode) {
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
  }, [actionCode, auth])

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
        <h1>Reset your password</h1>
        <p>for your Email: {email}</p>

        <Form onFinish={handleResetPassword}>
          <Form.Item name="password">
            <Input placeholder="******" type="password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loading} type="primary">
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
