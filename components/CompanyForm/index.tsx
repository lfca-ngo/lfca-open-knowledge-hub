import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import { useEffect } from 'react'

import {
  CompanyFragment,
  UpdateCompanyInput,
} from '../../services/lfca-backend'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { ImageUpload } from '../FileUpload/ImageUpload'

// const { Option } = Select
const { TextArea } = Input

interface CompanyFormProps {
  // countries?: Country[]
  filterByKeys?: (keyof CompanyFragment)[]
  initialValues?: CompanyFragment
  isLoading?: boolean
  // onCreate?: (values: CreateCompanyInput) => void
  onUpdate?: (values: UpdateCompanyInput) => void
  // type: 'create' | 'update'
}

export const CompanyForm = ({
  // countries,
  filterByKeys,
  initialValues,
  isLoading = false,
  // onCreate,
  onUpdate,
}: // type,
CompanyFormProps) => {
  const handleSubmit = (allValues: UpdateCompanyInput) => {
    // if (type === 'create') onCreate?.(allValues as CreateUserInput)
    // else
    onUpdate?.(allValues as UpdateCompanyInput)
  }

  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const formItems: { [key in keyof CompanyFragment]?: React.ReactNode } = {
    aboutSections: (
      <Form.List key="aboutSections" name="aboutSections">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space align="start" key={key}>
                <Form.Item
                  {...restField}
                  label="Headline"
                  name={[name, 'heading']}
                  rules={[{ message: 'Missing heading', required: true }]}
                >
                  <Input placeholder="Heading" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Text"
                  name={[name, 'text']}
                  rules={[{ message: 'Missing text', required: true }]}
                >
                  <TextArea placeholder="Text" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Image"
                  name={[name, 'imageUrl']}
                  rules={[{ message: 'Missing image', required: true }]}
                >
                  <ImageUpload
                    customPreset={CLOUDINARY_PRESETS.companyAboutPictures}
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                block
                icon={<PlusOutlined />}
                onClick={() => add()}
                type="dashed"
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    ),
    campaignFiles: (
      <Form.Item
        key="campaignFiles"
        label="Campaign Files"
        name="campaignFiles"
        rules={[{ message: 'Please add your campaign goals', required: false }]}
      >
        something
      </Form.Item>
    ),
    campaignGoals: (
      <Form.Item
        key="campaignGoals"
        label="Campaign Goals"
        name="campaignGoals"
        rules={[{ message: 'Please add your campaign goals', required: false }]}
      >
        <TextArea />
      </Form.Item>
    ),
    campaignGoalSetting: (
      <Form.Item
        key="campaignGoalSetting"
        label="Campaign Goal Setting"
        name="campaignGoalSetting"
        rules={[{ message: 'Please add your campaign goals', required: false }]}
      >
        <TextArea />
      </Form.Item>
    ),
    logoUrl: (
      <Form.Item
        key="logoUrl"
        label="Logo"
        name="logoUrl"
        rules={[{ message: 'Please add a picture', required: false }]}
      >
        <ImageUpload customPreset={CLOUDINARY_PRESETS.companyLogos} />
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
            ? filterByKeys?.includes(item as keyof CompanyFragment)
            : true
        )
        .map((key) => formItems[key as keyof CompanyFragment])}
      <Form.Item>
        <Button htmlType="submit" loading={isLoading} type="primary">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}
