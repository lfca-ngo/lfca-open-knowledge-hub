import { DeleteOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
} from 'antd'
import { useEffect } from 'react'

import { useUser } from '../../hooks/user'
import { Country } from '../../services/contentful'
import { UpdateUserInput, UserFragment } from '../../services/lfca-backend'
import { ROLES } from '../../utils'
import { CompanyIdSearchInput } from '../CompanyIdSearchInput'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { ImageUpload } from '../FileUpload/ImageUpload'

const { Option } = Select

interface UserFormProps {
  countries?: Country[]
  filterByKeys?: (keyof UpdateUserInput)[]
  initialValues?: UserFragment
  isLoading?: boolean
  onDelete?: () => void
  onUpdate?: (values: UpdateUserInput) => void
}

export const UserForm = ({
  countries,
  filterByKeys,
  initialValues,
  isLoading = false,
  onDelete,
  onUpdate,
}: UserFormProps) => {
  const { isAdmin } = useUser()

  const handleSubmit = (allValues: UpdateUserInput) => {
    onUpdate?.(allValues as UpdateUserInput)
  }

  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const formItems: { [key in keyof UpdateUserInput]?: React.ReactNode } = {
    companyId: (
      <Form.Item
        key="companyId"
        label="Company Id"
        name="companyId"
        rules={[{ message: 'Please add a companyId', required: true }]}
      >
        <CompanyIdSearchInput />
      </Form.Item>
    ),
    country: (
      <Form.Item
        key="country"
        label="Country"
        name="country"
        rules={[{ message: 'Please select a country', required: true }]}
      >
        <Select
          filterOption={(input, option) => {
            return (
              `${option?.children}`
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            )
          }}
          optionFilterProp="children"
          placeholder="Please select a country"
          showSearch
        >
          {countries?.map((country) => (
            <Option key={country.countryCode} value={country.countryCode}>
              {country.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ),
    email: (
      <Form.Item
        key="email"
        label="Email"
        name="email"
        rules={[{ message: 'Please add an email', required: true }]}
      >
        <Input placeholder="greta@thunbergvc.earth" type="email" />
      </Form.Item>
    ),
    firstName: (
      <Form.Item
        key="firstName"
        label="First name"
        name="firstName"
        rules={[{ message: 'Please add a first name', required: true }]}
      >
        <Input placeholder="Greta" />
      </Form.Item>
    ),
    lastName: (
      <Form.Item
        key="lastName"
        label="Last name"
        name="lastName"
        rules={[{ message: 'Please add a last name', required: true }]}
      >
        <Input placeholder="Thunberg" />
      </Form.Item>
    ),
    phone: (
      <Form.Item
        key="phone"
        label="Phone"
        name="phone"
        rules={[{ message: 'Please add a phone number', required: false }]}
      >
        <Input placeholder="+49 160 1234567" />
      </Form.Item>
    ),
    picture: (
      <Form.Item
        key="picture"
        label="Picture"
        name="picture"
        rules={[{ message: 'Please add a picture', required: false }]}
      >
        <ImageUpload customPreset={CLOUDINARY_PRESETS.profilePictures} />
      </Form.Item>
    ),
    roles: (
      <Form.Item
        key="roles"
        label="Roles"
        name="roles"
        rules={[{ message: 'Please select at least one role', required: true }]}
      >
        <Select mode="multiple" placeholder="Please select a role">
          {ROLES.map((role) => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ),
    sortWeight: (
      <Form.Item
        key="sortWeight"
        label="Sort weight"
        name="sortWeight"
        rules={[{ message: 'Please add sort weight', required: false }]}
      >
        <InputNumber max={100} min={0} placeholder={'50'} />
      </Form.Item>
    ),
  }

  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleSubmit}
    >
      {Object.keys(formItems)
        .filter((item) =>
          filterByKeys
            ? filterByKeys?.includes(item as keyof UpdateUserInput)
            : true
        )
        .map((key) => formItems[key as keyof UpdateUserInput])}

      <Form.Item>
        <Space>
          <Button htmlType="submit" loading={isLoading} type="primary">
            Save
          </Button>

          {isAdmin ? (
            <>
              <Popconfirm
                cancelText="No"
                okText="Yes"
                onConfirm={onDelete}
                title="Are you sure to delete this user?"
              >
                <Button danger icon={<DeleteOutlined />} loading={isLoading}>
                  Delete
                </Button>
              </Popconfirm>
            </>
          ) : null}
        </Space>
      </Form.Item>
    </Form>
  )
}
