import { Alert, Button, Form, Input, Space } from 'antd'
import Link from 'next/link'
import { useState } from 'react'

import { PW_RESET, SIGN_UP } from '../../utils/routes'

export default function Signin() {
  const [loading, setLoading] = useState(false)
  const [errorMessage] = useState('')

  const handleSignIn = async () => {
    setLoading(true)
    try {
      //  @TODO: Auth logic
      // if (error) throw error;
      // router.push({ pathname: HOME, hash: session?.access_token });
    } catch (e) {
      // console.log(e.message);
      // setErrorMessage(e.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
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
            Anmelden
          </Button>
        </Form.Item>
      </Form>
      <Space>
        <Link href={PW_RESET}>Passwort vergessen</Link>
        <Link href={SIGN_UP}>Noch nicht registriert? Anmelden</Link>
      </Space>
    </div>
  )
}
