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
import {
  CreateUserInput,
  UpdateUserInput,
  UserFragment,
} from '../../services/lfca-backend'
import { ROLES } from '../../utils'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { ImageUpload } from '../FileUpload/ImageUpload'

const { Option } = Select

interface UserFormProps {
  countries?: Country[]
  filterByKeys?: (keyof UserFragment)[]
  initialValues?: UserFragment
  isLoading?: boolean
  onCreate?: (values: CreateUserInput) => void
  onDelete?: () => void
  onUpdate?: (values: UpdateUserInput) => void
  type: 'create' | 'update'
}

export const UserForm = ({
  countries,
  filterByKeys,
  initialValues,
  isLoading = false,
  onCreate,
  onDelete,
  onUpdate,
  type,
}: UserFormProps) => {
  const { isAdmin } = useUser()

  const handleSubmit = (allValues: CreateUserInput | UpdateUserInput) => {
    if (type === 'create') onCreate?.(allValues as CreateUserInput)
    else onUpdate?.(allValues as UpdateUserInput)
  }

  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const formItems: { [key in keyof UserFragment]?: React.ReactNode } = {
    companyId: (
      <Form.Item
        key="companyId"
        label="Company Id"
        name="companyId"
        rules={[{ message: 'Please add a companyId', required: false }]}
      >
        <Input placeholder="-Mdas211masud" />
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
            ? filterByKeys?.includes(item as keyof UserFragment)
            : true
        )
        .map((key) => formItems[key as keyof UserFragment])}

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
                <Button loading={isLoading} type="danger">
                  Delete
                </Button>
              </Popconfirm>{' '}
            </>
          ) : null}
        </Space>
      </Form.Item>
    </Form>
  )
}
