import {
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Popover,
  Select,
  Space,
} from 'antd'

import { CompanySubscriptionType } from '../../services/lfca-backend'
import { isVentureCapitalCompany } from '../../utils'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { ImageUpload } from '../FileUpload/ImageUpload'
import { ImageUploadMulti } from '../FileUpload/ImageUploadMulti'
import { FormList } from '../FormList'
import { RemovableSelect } from '../RemovableSelect'
import { CompanyFormProps, FormValues } from '.'
import { COMPANY_MODELS, COMPANY_TAGS } from './consts'

const { useWatch } = Form

const { TextArea } = Input
const { Option } = Select

interface FormItemsProps
  extends Pick<CompanyFormProps, 'countries' | 'filterByKeys' | 'programs'> {
  form: FormInstance
}

export const FormItems = ({
  countries,
  filterByKeys,
  form,
  programs,
}: FormItemsProps) => {
  const selectedTags = useWatch('companyTags', form)
  const isVC = isVentureCapitalCompany(selectedTags)

  const formItems: { [key in keyof FormValues]: React.ReactNode } = {
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
    companyTags: (
      <FormList
        addButtonIcon={<PlusOutlined />}
        addButtonText="Add Tag"
        key="companyTags"
        label="Industry/sector tags"
        maxItems={4}
        name="companyTags"
        renderInput={({ onRemove }) => (
          <RemovableSelect
            onRemove={onRemove}
            options={[
              // Ensure, that after picking a model, there can no be any other tags
              // and we can have a maximum of 2 tags
              ...(form
                .getFieldValue('companyTags')
                ?.some((val: string) => COMPANY_MODELS.includes(val)) ||
              (form.getFieldValue('companyTags') || []).length > 2
                ? []
                : COMPANY_TAGS),
              // Ensure that the first tag is never a model
              ...((form.getFieldValue('companyTags') || []).length > 1
                ? COMPANY_MODELS
                : []),
            ]
              .filter(
                (tag) =>
                  !(form.getFieldValue('companyTags') || []).includes(tag)
              )
              .map((t) => ({ value: t }))}
          />
        )}
      />
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
    fundSize: (
      <Form.Item
        key="fundSize"
        label="Fund size (in M)"
        name="fundSize"
        rules={[
          {
            message: 'Please enter the fund size!',
            required: isVC,
          },
        ]}
      >
        <InputNumber
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="100"
          type="number"
        />
      </Form.Item>
    ),
    internalDescription: (
      <Form.Item
        key="internalDescription"
        label="Internal description"
        name="internalDescription"
      >
        <TextArea
          placeholder="Short info about what the company is doing"
          rows={4}
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
    subscriptionType: (
      <Form.Item
        key="subscriptionType"
        label="Subscription"
        name="subscriptionType"
        rules={[{ message: 'Please select a membership', required: true }]}
      >
        <Select placeholder="Please select a membership type">
          {Object.keys(CompanySubscriptionType).map((type) => (
            <Option key={type} value={type}>
              {type}
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
        rules={[{ message: 'Please enter a website!', required: true }]}
      >
        <Input placeholder="https://company.de/" type="url" />
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
