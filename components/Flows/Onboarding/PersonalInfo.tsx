import { InfoCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Popover,
  Row,
  Select,
  Space,
  Tag,
} from 'antd'

import { useFirebase } from '../../../hooks/firebase'
import {
  CreateCompanyInput,
  RegisterUserInput,
  useRegisterUserMutation,
} from '../../../services/lfca-backend'
import { JOB_ROLES_OPTIONS } from '../../../services/lfca-backend/utils/job-roles'
import { PRIVACY_URL, TERMS_OF_SERVICE_URL } from '../../../utils'
import { passwordValidator } from '../../../utils/password-validator'
import { CLOUDINARY_PRESETS } from '../../FileUpload/helper'
import { ImageUpload } from '../../FileUpload/ImageUpload'
import { StepPropsWithSharedState } from './..'

export const PersonalInfo = ({
  onNext,
  onPrev,
  sharedState,
  title,
}: StepPropsWithSharedState) => {
  const { login } = useFirebase()
  const [{ fetching: registeringUser }, registerUser] =
    useRegisterUserMutation()

  const onFinish = async (userInfo: RegisterUserInput) => {
    const companyInfo = {
      ...sharedState?.company,
      subscriptionType: 'FREE',
    } as CreateCompanyInput

    registerUser({
      input: {
        company: {
          country: companyInfo.country,
          employeeCount: companyInfo.employeeCount,
          logoUrl: companyInfo.logoUrl,
          name: companyInfo.name,
          tags: companyInfo.tags,
        },
        email: userInfo.email,
        firstName: userInfo.firstName,
        jobRole: userInfo.jobRole,
        lastName: userInfo.lastName,
        password: userInfo.password,
        picture: userInfo.picture,
      },
    }).then(async ({ error }) => {
      if (error) message.error(error.message)
      else {
        // log user in automatically
        await login(userInfo.email, userInfo.password)
        message.success('Account created. Logging you in...')
        onNext?.()
      }
    })
  }

  const isLoading = registeringUser

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Who are you? 👩🏽‍💻`}</h1>
      <div className="description">
        {`This information will be used to create your personal account on our platform. Tip: You can invite more colleagues later on.`}
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={`What best describes your role${
            sharedState?.company?.name
              ? ` at ${sharedState?.company?.name}`
              : ''
          }?`}
          name="jobRole"
          rules={[{ message: 'Please select a role', required: true }]}
        >
          <Select placeholder="Please select">
            {JOB_ROLES_OPTIONS.map((option) => (
              <Select.Option key={option.key}>{option.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col md={12} xs={24}>
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                { message: 'Please input your first name', required: true },
              ]}
            >
              <Input placeholder="Greta" />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                { message: 'Please input your last name', required: true },
              ]}
            >
              <Input placeholder="Thunberg" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col md={12} xs={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  message: 'The input is not valid E-mail!',
                  type: 'email',
                },
                {
                  message: 'Please input your E-mail!',
                  required: true,
                },
              ]}
            >
              <Input placeholder="greta@thunberg.earth" type="email" />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              label="Password"
              name="password"
              rules={[
                {
                  validator: passwordValidator,
                },
                {
                  message: 'Please input your password',
                  required: true,
                },
              ]}
            >
              <Input placeholder="*********" type="password" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={
            <Popover
              content="Adding a picture makes interactions with other members more personal"
              placement="left"
            >
              Picture <InfoCircleOutlined />
            </Popover>
          }
          name="picture"
          rules={[{ message: 'Please add a picture', required: false }]}
        >
          <ImageUpload customPreset={CLOUDINARY_PRESETS.profilePictures} />
        </Form.Item>

        <Form.Item
          className="flat"
          name="readTerms"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('Please accept our T&C and privacy statement')
                    ),
            },
          ]}
          valuePropName="checked"
        >
          <Checkbox>
            I have read and agree to the{' '}
            <a href={TERMS_OF_SERVICE_URL} rel="noreferrer" target="_blank">
              terms and conditions
            </a>{' '}
            as well as the{' '}
            <a href={PRIVACY_URL} rel="noreferrer" target="_blank">
              data privacy guidelines
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item style={{ marginTop: '24px' }}>
          <Space>
            <Button
              htmlType="submit"
              loading={isLoading}
              size="large"
              type="primary"
            >
              Create Account
            </Button>
            <Button onClick={onPrev} size="large" type="link">
              Back
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export const PersonalInfoSide = () => {
  return null
}
