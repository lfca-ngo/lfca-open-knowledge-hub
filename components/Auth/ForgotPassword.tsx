import { Button, Form, Input, message } from 'antd'
import { sendPasswordResetEmail } from 'firebase/auth'
import NextLink from 'next/link'
import React, { useState } from 'react'

import { useFirebase } from '../../hooks/firebase'
import { SIGN_IN } from '../../utils/routes'

export const ForgotPassword = () => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { auth } = useFirebase()

  const handleSubmit = ({ email }: { email: string }) => {
    setLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true)
      })
      .catch((error) => {
        message.error(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <h1>Reset Password</h1>
      {success ? (
        <div>
          Please check your E-Mails. We sent you a link to reset your password.
          If you did not receive an email, please check your spam folder and
          make sure your email address is correct.
        </div>
      ) : (
        <div>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Email" name="email">
              <Input placeholder="info@lfca.earth" />
            </Form.Item>
            <Form.Item>
              <Button block htmlType="submit" loading={loading} type="primary">
                Reset password
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      <NextLink href={SIGN_IN}>Back to login</NextLink>
    </div>
  )
}
