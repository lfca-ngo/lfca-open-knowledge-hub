import {
  DeleteOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Popover,
  Select,
  Space,
} from 'antd'
import { useEffect } from 'react'

import { useUser } from '../../hooks/user'
import { Country, Program } from '../../services/contentful'
import {
  CompanyFragment,
  CreateCompanyInput,
  UpdateCompanyInput,
} from '../../services/lfca-backend'
import { recursiveRemoveKey } from '../../utils'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { ImageUpload } from '../FileUpload/ImageUpload'
import { ImageUploadMulti } from '../FileUpload/ImageUploadMulti'
import { COMPANY_TAGS } from './consts'

const { TextArea } = Input
const { Option } = Select

interface CompanyFormProps {
  countries?: Country[]
  filterByKeys?: (keyof UpdateCompanyInput)[]
  initialValues?: CompanyFragment
  isLoading?: boolean
  onCreate?: (values: CreateCompanyInput) => void
  onDelete?: () => void
  onUpdate?: (values: UpdateCompanyInput) => void
  programs?: Program[]
  type: 'create' | 'update'
}

export const CompanyForm = ({
  countries,
  filterByKeys,
  initialValues,
  isLoading = false,
  onCreate,
  onDelete,
  onUpdate,
  programs,
  type,
}: CompanyFormProps) => {
  const { isAdmin } = useUser()

  const handleSubmit = (allValues: UpdateCompanyInput) => {
    if (type === 'create') onCreate?.(allValues as CreateCompanyInput)
    else onUpdate?.(allValues as UpdateCompanyInput)
  }

  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const formItems: { [key in keyof UpdateCompanyInput]?: React.ReactNode } = {
    aboutSections: (
      <Form.Item
        key="aboutSections"
        label={
          <Popover
            content={
              <div>
                On your microsite you can share more detailed explanations with
                images about the actions that you are taking. Add sections to
                your site with the form below. Check an{' '}
                <a
                  href="https://wtca.lfca.earth/e/personio"
                  rel="noreferrer"
                  target="_blank"
                >
                  example
                </a>
              </div>
            }
            overlayClassName="popover-sm"
            placement="left"
          >
            About sections <InfoCircleOutlined />
          </Popover>
        }
      >
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
      </Form.Item>
    ),
    campaignFiles: (
      <Form.Item
        key="campaignFiles"
        label="Campaign Files"
        name="campaignFiles"
        rules={[{ message: 'Please add your campaign goals', required: false }]}
      >
        <ImageUploadMulti
          customPreset={CLOUDINARY_PRESETS.companyAboutPictures}
        />
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
    crmId: (
      <Form.Item key="crmId" label="CRM ID" name="crmId">
        <Input placeholder="550" />
      </Form.Item>
    ),
    employeeCount: (
      <Form.Item
        key="employeeCount"
        label="Company size (employees)"
        name="employeeCount"
        rules={[
          { message: 'Please enter the amount of employees!', required: true },
        ]}
      >
        <InputNumber
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="10"
          type="number"
        />
      </Form.Item>
    ),
    logoUrl: (
      <Form.Item
        key="logoUrl"
        label="Logo"
        name="logoUrl"
        rules={[{ message: 'Please add a picture', required: true }]}
      >
        <ImageUpload customPreset={CLOUDINARY_PRESETS.companyLogos} />
      </Form.Item>
    ),
    micrositeSlug: (
      <Form.Item
        key="micrositeSlug"
        label="The URL for the company's microsite"
        name="micrositeSlug"
        rules={[{ message: 'Please enter a slug!', required: true }]}
      >
        <Input placeholder="company-xyz" />
      </Form.Item>
    ),
    name: (
      <Form.Item
        key="name"
        label="Company name (without legal form abbreviation)"
        name="name"
        rules={[{ message: 'Please enter a company name!', required: true }]}
      >
        <Input placeholder="Company XYZ" />
      </Form.Item>
    ),
    programContentId: (
      <Form.Item
        key="programContentId"
        label="Program"
        name="programContentId"
        rules={[{ message: 'Please select a program', required: true }]}
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
          placeholder="Subscribed program"
          showSearch
        >
          {programs?.map((program) => (
            <Option key={program.programId} value={program.programId}>
              {program.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ),
    tags: (
      <Form.Item
        key="companyTags"
        label="Industry/sector tags"
        name="companyTags"
      >
        <Select mode="multiple" placeholder="Type of Company">
          {COMPANY_TAGS.map((tag) => (
            <Option key={tag} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ),
    websiteUrl: (
      <Form.Item
        key="websiteUrl"
        label="Company Website"
        name="websiteUrl"
        rules={[{ message: 'Please enter a website!', required: false }]}
      >
        <Input placeholder="https://company.de/" type="url" />
      </Form.Item>
    ),
  }

  return (
    <Form
      form={form}
      initialValues={
        initialValues
          ? {
              ...initialValues,
              companyTags: initialValues.tags.map((tag) => tag.name),
              programContentId: initialValues.program.contentId,
            }
          : undefined
      }
      layout="vertical"
      onFinish={(
        allValues: UpdateCompanyInput & { companyTags?: string[] }
      ) => {
        const { companyTags, ...rest } = allValues
        const parsed: UpdateCompanyInput = {
          ...rest,
          // The ImageUploadMulti component's value contains `status` and `uid` props for each file,
          // which are not valid for the update mutation and need to be removed
          campaignFiles: rest.campaignFiles?.map((file) => ({
            name: file.name,
            url: file.url,
          })),
          tags: companyTags,
        }

        // The initial data has some `__typename` props which are not vlud as inputs fpr the mutation
        recursiveRemoveKey(parsed, '__typename')
        handleSubmit(parsed)
      }}
    >
      {Object.keys(formItems)
        .filter((item) =>
          filterByKeys
            ? filterByKeys?.includes(item as keyof UpdateCompanyInput)
            : true
        )
        .map((key) => formItems[key as keyof UpdateCompanyInput])}
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
                title="Are you sure to delete this company?"
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
