import { Alert, Button, Form, Input, message } from 'antd'
import NextLink from 'next/link'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useFirebase } from '../../hooks/firebase'
import { useRegisterUserMutation } from '../../services/lfca-backend'
import { getErrorMessage } from '../../utils'
import {
  SIGN_IN,
  ONBOARDING_LEADER,
  ONBOARDING_OFFICER,
} from '../../utils/routes'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { ImageUpload } from '../FileUpload/ImageUpload'
import { useRouter } from 'next/router'

export const Signup = ({ email }: { email: string }) => {
  const [success, setSuccess] = useState(false)
  const [{ fetching }, registerUser] = useRegisterUserMutation()
  const { login } = useFirebase()
  const router = useRouter()

  const [form] = Form.useForm()

  const handleSignUp = async ({
    email,
    firstName,
    lastName,
    password,
    picture,
  }: {
    email: string
    firstName: string
    lastName: string
    password: string
    picture: string
  }) => {
    try {
      const { data } = await registerUser({
        input: {
          email,
          firstName,
          lastName,
          password,
          picture,
        },
      })
      await login(email, password)
      console.log('data', data)
      // forward based on user role
      if (data?.registerUser.roles.includes('LEADER')) {
        router.push(ONBOARDING_LEADER)
      } else {
        router.push(ONBOARDING_OFFICER)
      }
    } catch (err) {
      message.error(getErrorMessage(err))
    }
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
            key="picture"
            label="Picture"
            name="picture"
            rules={[{ message: 'Please add a picture', required: true }]}
          >
            <ImageUpload customPreset={CLOUDINARY_PRESETS.profilePictures} />
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
