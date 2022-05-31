import { Alert, Button, Form, Input, message } from 'antd'
import NextLink from 'next/link'
import React, { useState } from 'react'

import { useRequestPasswordResetMutation } from '../../services/lfca-backend'
import { SIGN_IN } from '../../utils/routes'

export const ForgotPassword = () => {
  const [success, setSuccess] = useState(false)

  const [{ fetching }, requestPasswordReset] = useRequestPasswordResetMutation()

  const handleSubmit = ({ email }: { email: string }) => {
    requestPasswordReset({
      input: {
        email,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else setSuccess(true)
    })
  }

  return (
    <div>
      <h1>Reset Password</h1>
      {success ? (
        <Alert
          description={`We sent you a link to reset your password.
        If you did not receive an email, please check your spam folder and
        make sure your email address is correct.`}
          message={`Check your E-Mails`}
          showIcon
          type="success"
        />
      ) : (
        <div>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Email" name="email">
              <Input placeholder="info@lfca.earth" />
            </Form.Item>
            <Form.Item>
              <Button block htmlType="submit" loading={fetching} type="primary">
                Reset password
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      <div style={{ margin: '20px 0' }}>
        <NextLink href={SIGN_IN}>Back to login</NextLink>
      </div>
    </div>
  )
}
