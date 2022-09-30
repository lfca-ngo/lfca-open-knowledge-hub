import { Form, Input, InputNumber, Select } from 'antd'

import { ROLES } from '../../utils'
import { CompanyIdSearchInput } from '../CompanyIdSearchInput'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { ImageUpload } from '../FileUpload/ImageUpload'
import { FormValues, UserFormProps } from './'

const { Option } = Select

interface FormItemsProps
  extends Pick<UserFormProps, 'countries' | 'filterByKeys'> {
  onNavigateToCompany?: (companyId: string) => void
}

export const FormItems = ({
  countries,
  filterByKeys,
  onNavigateToCompany,
}: FormItemsProps) => {
  const formItems: { [key in keyof FormValues]: React.ReactNode } = {
    companyId: (
      <Form.Item
        key="companyId"
        label="Company Id"
        name="companyId"
        rules={[{ message: 'Please add a companyId', required: true }]}
      >
        <CompanyIdSearchInput onNavigateToCompany={onNavigateToCompany} />
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
    <>
      {Object.keys(formItems)
        .filter((item) =>
          filterByKeys ? filterByKeys?.includes(item as keyof FormValues) : true
        )
        .map((key) => formItems[key as keyof FormValues])}
    </>
  )
}
