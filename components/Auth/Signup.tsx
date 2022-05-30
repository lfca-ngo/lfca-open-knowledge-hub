import { Alert, Button, Form, Input } from 'antd'
import NextLink from 'next/link'
import { useState } from 'react'

import { SIGN_IN } from '../../utils/routes'

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage] = useState('')

  const handleSignUp = async () => {
    setLoading(true)

    try {
      // @TODO: Auth logic
      // if (error) throw error;
      setSuccess(true)
    } catch (e) {
      // setErrorMessage(e.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Create account</h1>
      <Form layout="vertical" onFinish={handleSignUp}>
        <Form.Item
          label={'Company'}
          name="company"
          rules={[{ message: 'Please select a company!', required: true }]}
        >
          <Input placeholder="Company Name" />
        </Form.Item>

        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ message: 'Please input your name!', required: true }]}
        >
          <Input placeholder="Greta" />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ message: 'Please input your name!', required: true }]}
        >
          <Input placeholder="Thunberg" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ message: 'Please input your email!', required: true }]}
        >
          <Input placeholder="greta@thunberg.earth" type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ message: 'Please input a password!', required: true }]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>

        {success && (
          <Alert
            message="Please Check Your Email Confirmation :)"
            showIcon
            type="success"
          />
        )}
        {errorMessage && <Alert message={errorMessage} showIcon type="error" />}

        <Form.Item>
          <Button block htmlType="submit" loading={loading} type="primary">
            Register
          </Button>
        </Form.Item>
      </Form>

      <NextLink href={SIGN_IN}>Already registered? Sign in here</NextLink>
    </div>
  )
}
