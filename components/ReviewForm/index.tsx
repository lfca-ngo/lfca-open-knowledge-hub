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
  useCompanyActionExtendedDetailsQuery,
  useCreateServiceProviderReviewMutation,
  useServiceProvidersQuery,
  useUpdateServiceProviderReviewMutation,
} from '../../services/lfca-backend'
import { FormList } from '../FormList'
import { RemovableInput } from '../RemovableInput'
import { UserIdSearchInput } from '../UserIdSearchInput'

const { Option } = Select
const { TextArea } = Input

interface ReviewFormProps {
  actionContentId?: string
  onFinish?: () => void
  initialValues?: Partial<ServiceProviderReviewFragment>
}

export const ReviewForm = ({
  actionContentId,
  initialValues,
  onFinish,
}: ReviewFormProps) => {
  const { isAdmin } = useUser()

  const [form] = Form.useForm()
  const [providerId, setProviderId] = useState(
    initialValues?.serviceProviderContentId || ''
  )
  const [success, setSuccess] = useState(false)

  // We either fetch ALL service providers (in admin views when no `actionContentId` is provided)
  // or only the service providers attached to a companyAction (`actionContentId` is provided)
  const [{ data: dataServiceProviders, fetching: fetchingServiceProviders }] =
    useServiceProvidersQuery({
      pause: !!actionContentId,
    })

  const [
    {
      data: dataCompanyActionExtendedDetails,
      fetching: fetchingCompanyActionExtendedDetails,
    },
  ] = useCompanyActionExtendedDetailsQuery({
    pause: !actionContentId,
    variables: {
      input: {
        actionContentId: actionContentId || '',
      },
    },
  })

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
    if (!initialValues?.id) {
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
      {!!initialValues?.author && isAdmin && !success ? (
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
              initialValues?.id
                ? 'Updated'
                : 'Thanks, we will approve your review soon!'
            }
            showIcon
            type="success"
          />
        ) : (
          <Select
            disabled={!!initialValues?.serviceProviderContentId}
            loading={
              fetchingServiceProviders || fetchingCompanyActionExtendedDetails
            }
            onSelect={(val: string) => setProviderId(val)}
            placeholder="Select an option..."
            value={providerId}
          >
            <Select.Option key={''}>-- None of those</Select.Option>
            {(actionContentId
              ? dataCompanyActionExtendedDetails?.companyAction
                  .serviceProviderList?.items
              : dataServiceProviders?.serviceProviders
            )?.map((provider) => (
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

          <FormList
            addButtonIcon={<PlusOutlined />}
            addButtonText="Add argument"
            label={
              <Tooltip title="Arguments for the provider">
                {`Pro's`} <QuestionCircleOutlined />
              </Tooltip>
            }
            name="pros"
            renderInput={({ onRemove }) => (
              <RemovableInput
                icon={<PlusCircleFilled className="black" />}
                onRemove={onRemove}
                placeholder="Great UX!"
              />
            )}
          />

          <FormList
            addButtonIcon={<PlusOutlined />}
            addButtonText="Add argument"
            label={
              <Tooltip title="Arguments against the provider">
                {`Con's`} <QuestionCircleOutlined />
              </Tooltip>
            }
            name="cons"
            renderInput={({ onRemove }) => (
              <RemovableInput
                icon={<MinusCircleFilled className="black" />}
                onRemove={onRemove}
                placeholder="Very high pricing"
              />
            )}
          />

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
              {!initialValues?.id ? 'Submit review' : 'Update review'}
            </Button>
          </Form.Item>
        </div>
      )}
    </Form>
  )
}
