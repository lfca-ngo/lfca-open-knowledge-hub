require('./styles.less')

import {
  InfoCircleOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Rate,
  Select,
  Tooltip,
} from 'antd'
import { useState } from 'react'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import { RemovableInput } from '../RemovableInput'

const { Option } = Select
const { TextArea } = Input

interface ReviewFormProps {
  onComplete?: () => void
  serviceProviders: ContentfulServiceProviderFields[]
}

const LabelWithButton = ({
  add,
  label,
}: {
  add: () => void
  label: string | React.ReactElement
}) => (
  <div className="label-with-button">
    <div className="label">{label}</div>
    <Button
      icon={<PlusOutlined />}
      onClick={() => add()}
      size="small"
      type="dashed"
    >
      Add argument
    </Button>
  </div>
)

export const ReviewForm = ({
  onComplete,
  serviceProviders,
}: ReviewFormProps) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [providerId, setProviderId] = useState('')

  const argumentsValidator = async (_: object, names: string[]) => {
    if (names.length > 5) {
      return Promise.reject(new Error('Max 5 arguments'))
    }
  }

  const handleFinish = () => {
    setLoading(true)

    // TODO: send to server
    setTimeout(() => {
      setProviderId('')
      onComplete?.()
      // show a success message
      form.resetFields()
      message.success(`Thanks, we will review it!`)
      setLoading(false)
    }, 600)
  }

  return (
    <Form
      className="review-form"
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item label="Did you work with a service provider?">
        <Select
          onSelect={(val: string) => setProviderId(val)}
          placeholder="Select an option..."
        >
          {serviceProviders.map((provider) => (
            <Option key={provider.providerId}>{provider.name}</Option>
          ))}
          <Select.Option key={''}>None of those</Select.Option>
        </Select>
      </Form.Item>

      {providerId && (
        <div className="panel">
          <div className="panel-title">
            <Tooltip title="Help other members make the right decision. Tip: you can review anonymously">
              Leave a review <InfoCircleOutlined />
            </Tooltip>
          </div>
          <Form.Item
            label="How would you rate your overall experience?"
            name="rating"
            rules={[{ message: 'Please select an option', required: true }]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip title="Give a quick summary of your experience">
                Describe your experience <QuestionCircleOutlined />
              </Tooltip>
            }
            name="content"
            rules={[{ message: 'Please write a summary!', required: true }]}
          >
            <TextArea
              placeholder="The service was great, but it was a bit pricy..."
              rows={4}
            />
          </Form.Item>

          <Form.Item className="item-sm">
            <Form.List name="pros">
              {(fields, { add, remove }, { errors }) => (
                <>
                  <LabelWithButton
                    add={add}
                    label={
                      <Tooltip title="Arguments for the provider">
                        {`Pro's`} <QuestionCircleOutlined />
                      </Tooltip>
                    }
                  />
                  {fields.map((field) => (
                    <Form.Item key={field.key} required={false}>
                      <Form.Item {...field} noStyle>
                        <RemovableInput
                          icon={<PlusCircleFilled className="black" />}
                          onRemove={() => remove(field.name)}
                          placeholder="Great UX!"
                        />
                      </Form.Item>
                    </Form.Item>
                  ))}
                  <Form.ErrorList errors={errors} />
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item className="item-sm">
            <Form.List name="cons" rules={[{ validator: argumentsValidator }]}>
              {(fields, { add, remove }, { errors }) => (
                <>
                  <LabelWithButton
                    add={add}
                    label={
                      <Tooltip title="Arguments against the provider">
                        {`Con's`} <QuestionCircleOutlined />
                      </Tooltip>
                    }
                  />
                  {fields.map((field) => (
                    <Form.Item key={field.key} required={false}>
                      <Form.Item {...field} noStyle>
                        <RemovableInput
                          icon={<MinusCircleFilled className="black" />}
                          onRemove={() => remove(field.name)}
                          placeholder="Very high pricing"
                        />
                      </Form.Item>
                    </Form.Item>
                  ))}
                  <Form.ErrorList errors={errors} />
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            label={
              <Tooltip title="The price review is always anonymous. We map it with your team size to make it more meaningful.">
                ~Price per year <QuestionCircleOutlined />
              </Tooltip>
            }
            name="pricePerYear"
            rules={[{ required: false }]}
          >
            <InputNumber
              addonAfter={<span className="currency">€</span>}
              placeholder="1200"
            />
          </Form.Item>

          <Form.Item name="isAnonymous" valuePropName="checked">
            <Checkbox>Review anonymously</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" loading={loading} type="primary">
              Submit
            </Button>
          </Form.Item>
        </div>
      )}
    </Form>
  )
}
