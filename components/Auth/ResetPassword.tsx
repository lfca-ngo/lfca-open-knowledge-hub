import { Button, Form, Input } from 'antd'
import NextLink from 'next/link'
import React, { useState } from 'react'

import { SIGN_IN } from '../../utils/routes'

const ResetPassword = () => {
  const [success] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      // @TODO: Auth logic
      // if (res.error) alert(res.error);
    } catch (error) {
      // alert(error.message);
    } finally {
      // setIsAfterSubmit(true);
      setLoading(false)
    }
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
          <Form layout="vertical" onFinish={handleClick}>
            <Form.Item label="Email">
              <Input placeholder="info@lfca.earth" />
            </Form.Item>
            <Form.Item>
              <Button
                block
                loading={loading}
                onClick={handleClick}
                type="primary"
              >
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

export default ResetPassword
