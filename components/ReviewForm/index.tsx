require('./styles.less')

import {
  InfoCircleOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import {
  Alert,
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

import { useUser } from '../../hooks/user'
import {
  ServiceProviderReviewFragment,
  useCreateServiceProviderReviewMutation,
  useServiceProvidersQuery,
  useUpdateServiceProviderReviewMutation,
} from '../../services/lfca-backend'
import { RemovableInput } from '../RemovableInput'
import { UserIdSearchInput } from '../UserIdSearchInput'

const { Option } = Select
const { TextArea } = Input

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
  initialValues,
  onFinish,
}: {
  onFinish?: () => void
  initialValues?: ServiceProviderReviewFragment
}) => {
  const { isAdmin } = useUser()

  const [form] = Form.useForm()
  const [providerId, setProviderId] = useState(
    initialValues?.serviceProviderContentId || ''
  )
  const [success, setSuccess] = useState(false)

  // TODO: UI for loading state
  // TODO: UI for error state
  const [{ data: dataServiceProviders }] = useServiceProvidersQuery()

  // TODO: UI for error state
  const [
    { fetching: fetchingCreateServiceProviderReview },
    createServiceProviderReview,
  ] = useCreateServiceProviderReviewMutation()
  const [
    { fetching: updatingServiceProviderReview },
    updateServiceProviderReview,
  ] = useUpdateServiceProviderReviewMutation()
  const isCreatingOrUpdating =
    fetchingCreateServiceProviderReview || updatingServiceProviderReview

  const argumentsValidator = async (_: object, names?: string[]) => {
    if (names && names.length > 5) {
      return Promise.reject(new Error('Max 5 arguments'))
    }
  }

  const handleFinish = async (props: {
    authorId?: string
    cons?: string[]
    isAnonymous?: boolean
    price?: number
    pros?: string[]
    rating: number
    review: string
  }) => {
    // create call for new reviews
    if (!initialValues) {
      await createServiceProviderReview({
        input: {
          ...props,
          serviceProviderContentId: providerId,
        },
      })
    } else {
      // update call for existing reviews
      await updateServiceProviderReview({
        input: {
          ...props,
          id: initialValues.id,
        },
      })
    }

    setSuccess(true)
    setProviderId('')
    form.resetFields()

    message.success(
      initialValues
        ? `Updated successfully`
        : `Thanks, we will approve your review soon!`
    )

    // callback for parent
    onFinish?.()
  }

  return (
    <Form
      className="review-form"
      form={form}
      initialValues={{
        ...initialValues,
        authorId: initialValues?.author?.id,
      }}
      layout="vertical"
      onFinish={handleFinish}
    >
      {!!initialValues && isAdmin && !success ? (
        <Form.Item label="Author" shouldUpdate>
          {({ getFieldValue }) =>
            getFieldValue('isAnonymous') ? (
              <Input disabled placeholder="Anonymous" />
            ) : (
              <Form.Item name="authorId" noStyle>
                <UserIdSearchInput />
              </Form.Item>
            )
          }
        </Form.Item>
      ) : null}

      <Form.Item label="Did you work with a service provider?">
        {success ? (
          <Alert
            message={
              initialValues
                ? 'Updated'
                : 'Thanks, we will approve your review soon!'
            }
            showIcon
            type="success"
          />
        ) : (
          <Select
            disabled={!!initialValues}
            onSelect={(val: string) => setProviderId(val)}
            placeholder="Select an option..."
            value={providerId}
          >
            <Select.Option key={''}>-- None of those</Select.Option>
            {dataServiceProviders?.serviceProviders.map((provider) => (
              <Option key={provider.id}>{provider.name}</Option>
            ))}
          </Select>
        )}
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
            name="review"
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
            name="price"
            rules={[{ required: false }]}
          >
            <InputNumber
              addonAfter={<span className="currency">€</span>}
              min={0}
              placeholder="1200"
              precision={0}
              step={1}
              type="number"
            />
          </Form.Item>

          <Form.Item name="isAnonymous" valuePropName="checked">
            <Checkbox>Review anonymously</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={isCreatingOrUpdating}
              type="primary"
            >
              {!initialValues ? 'Submit review' : 'Update review'}
            </Button>
          </Form.Item>
        </div>
      )}
    </Form>
  )
}
