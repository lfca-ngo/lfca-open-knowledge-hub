import { Button, Form, Input, InputNumber, Select } from 'antd'

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
  countries: Country[]
  initialValues?: UserFragment
  isLoading?: boolean
  onCreate: (values: CreateUserInput) => void
  onUpdate: (values: UpdateUserInput) => void
  type: 'create' | 'update'
}

export const UserForm = ({
  countries,
  initialValues,
  isLoading = false,
  onCreate,
  onUpdate,
  type,
}: UserFormProps) => {
  const handleSubmit = (allValues: CreateUserInput | UpdateUserInput) => {
    if (type === 'create') onCreate(allValues as CreateUserInput)
    else onUpdate(allValues as UpdateUserInput)
  }

  return (
    <Form
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
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
          {countries.map((country) => (
            <Option key={country.countryCode} value={country.countryCode}>
              {country.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Company Id"
        name="companyId"
        rules={[{ message: 'Please add a companyId', required: false }]}
      >
        <Input placeholder="-Mdas211masud" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ message: 'Please add an email', required: true }]}
      >
        <Input placeholder="greta@thunbergvc.earth" type="email" />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ message: 'Please add a phone number', required: false }]}
      >
        <Input placeholder="+49 160 1234567" />
      </Form.Item>
      <Form.Item
        label="First name"
        name="firstName"
        rules={[{ message: 'Please add a first name', required: true }]}
      >
        <Input placeholder="Greta" />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastName"
        rules={[{ message: 'Please add a last name', required: true }]}
      >
        <Input placeholder="Thunberg" />
      </Form.Item>
      <Form.Item
        label="Picture"
        name="picture"
        rules={[{ message: 'Please add a picture', required: false }]}
      >
        <ImageUpload customPreset={CLOUDINARY_PRESETS.profilePictures} />
      </Form.Item>
      <Form.Item
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
      <Form.Item
        label="Sort weight"
        name="sortWeight"
        rules={[{ message: 'Please add sort weight', required: false }]}
      >
        <InputNumber max={100} min={0} placeholder={'50'} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isLoading} type="primary">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
