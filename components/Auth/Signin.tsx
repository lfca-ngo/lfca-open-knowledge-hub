import { Alert, Button, Form, Input, Space } from 'antd'
import { FirebaseError } from 'firebase/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useFirebase } from '../../hooks/firebase'
import { PW_FORGOT, ROOT } from '../../utils/routes'

export const Signin = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { login } = useFirebase()

  const router = useRouter()

  const handleSignIn = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    setLoading(true)
    try {
      await login(email, password)
      // check if the current path contains a next query param
      // and use that as the redirect
      const next = `${router.query.next}` || ROOT
      router.replace(next)
    } catch (e) {
      if (e instanceof FirebaseError) {
        setErrorMessage(e.message)
      } else {
        setErrorMessage('Unknown error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Sign in</h1>
      <Form layout="vertical" onFinish={handleSignIn}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ message: 'Please input your email!', required: true }]}
        >
          <Input placeholder="name@company.de" type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ message: 'Please input a password!', required: true }]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>

        {errorMessage && <Alert message={errorMessage} showIcon type="error" />}
        <Form.Item>
          <Button block htmlType="submit" loading={loading} type="primary">
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <Space>
        <Link href={PW_FORGOT}>Forgot password?</Link>
      </Space>
    </div>
  )
}
