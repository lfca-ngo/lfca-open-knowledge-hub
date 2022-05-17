require('./styles.less')

import {
  MinusOutlined,
  PlusOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons'
import { Button, Form, Input, Rate, Select } from 'antd'
import { useState } from 'react'

import { ContentfulServiceProviderFields } from '../../services/contentful'
import { RemovableInput } from '../RemovableInput'

const { Option } = Select
const { TextArea } = Input

interface ReviewFormProps {
  serviceProviders: ContentfulServiceProviderFields[]
}

const AddButton = ({ add }: { add: () => void }) => (
  <Button icon={<PlusOutlined />} onClick={() => add()} type="dashed">
    Add argument
  </Button>
)

export const ReviewForm = ({ serviceProviders }: ReviewFormProps) => {
  const [providerId, setProviderId] = useState('')
  const argumentsValidator = (_: any, names: string[]) => {
    if (names.length > 5) {
      return Promise.reject(new Error('Max 5 arguments'))
    }
  }

  return (
    <Form
      className="review-form"
      layout="vertical"
      onFinish={(v) => console.log(v)}
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
          <div className="panel-title">Write a review</div>
          <Form.Item label="How would you rate your overall experience?">
            <Rate allowHalf />
          </Form.Item>
          <Form.Item label="Describe your experience">
            <TextArea
              placeholder="The service was great, but it was a bit pricy..."
              rows={4}
            />
          </Form.Item>

          <Form.Item className="item-sm" label="Pros">
            <Form.List name="pros" rules={[{ validator: argumentsValidator }]}>
              {(fields, { add, remove }, { errors }) => (
                <>
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
                  <Form.Item>
                    <AddButton add={add} />
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item className="item-sm" label="Cons">
            <Form.List name="cons" rules={[{ validator: argumentsValidator }]}>
              {(fields, { add, remove }, { errors }) => (
                <>
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
                  <Form.Item>
                    <AddButton add={add} />
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item label="Price per year (anonymous)">
            <Input
              addonAfter={<span className="currency">€</span>}
              placeholder="500"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </div>
      )}
    </Form>
  )
}
