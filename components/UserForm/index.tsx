import { Button, Form, Input, Select } from 'antd'

import { ContentfulCountryFields, Country } from '../../services/contentful'
import {
  CreateUserInput,
  UpdateUserInput,
  UserFragment,
} from '../../services/lfca-backend'

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
      <Form.Item label="Country" name="country">
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
      <Form.Item label="First name" name="firstName">
        <Input placeholder="Greta" />
      </Form.Item>
      <Form.Item label="Last name" name="lastName">
        <Input placeholder="Thunberg" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isLoading} type="primary">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
