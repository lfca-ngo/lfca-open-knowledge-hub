import { Alert, Button, Form, Input, message } from 'antd'
import NextLink from 'next/link'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useRegisterUserMutation } from '../../services/lfca-backend'
import { SIGN_IN } from '../../utils/routes'

export const Signup = ({ email }: { email: string }) => {
  const [success, setSuccess] = useState(false)
  const [{ fetching }, registerUser] = useRegisterUserMutation()

  const [form] = Form.useForm()

  const handleSignUp = ({
    email,
    firstName,
    lastName,
    password,
  }: {
    email: string
    firstName: string
    lastName: string
    password: string
  }) => {
    registerUser({
      input: {
        email,
        firstName,
        lastName,
        password,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else setSuccess(true)
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      email,
    })
  }, [email, form])

  if (!success) {
    return (
      <div>
        <h1>Create account</h1>
        <Form
          form={form}
          initialValues={{ email }}
          layout="vertical"
          onFinish={handleSignUp}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ message: 'Please input your email!', required: true }]}
          >
            <Input disabled placeholder="greta@thunberg.earth" type="email" />
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
            label="Password"
            name="password"
            rules={[{ message: 'Please input a password!', required: true }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" loading={fetching} type="primary">
              Register
            </Button>
          </Form.Item>
        </Form>

        <NextLink href={SIGN_IN}>Already registered? Sign in here</NextLink>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Create account</h1>
        <Alert
          description="Your account has been successfully created. You can now sign in."
          message="Account created"
          showIcon
          type="success"
        />
        <Link href={SIGN_IN}>
          <Button block style={{ margin: '30px 0' }} type="primary">
            Sign in
          </Button>
        </Link>
      </div>
    )
  }
}
