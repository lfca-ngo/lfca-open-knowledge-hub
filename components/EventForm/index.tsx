import { StopOutlined } from '@ant-design/icons'
import { Button, Form, message, Popconfirm, Space } from 'antd'
import { Moment } from 'moment'
import { useEffect } from 'react'
import { Descendant } from 'slate'

import {
  CreateEventInput,
  EventCategory,
  EventFragment,
  UpdateEventInput,
  useCreateEventMutation,
  useUpdateEventMutation,
} from '../../services/lfca-backend'
import { convertFormValues } from './convert-form-values'
import { FormItems } from './FormItems'
import { parseInitialValues } from './parse-initial-values'

export type FormValues = Omit<
  UpdateEventInput,
  'description' | 'end' | 'eventId' | 'start'
> & {
  description?: Descendant[]
  startEnd: [Moment, Moment]
}

export interface EventFormProps {
  initialValues?: EventFragment
  onCreated?: () => void
  onUpdated?: () => void
}

export const EventForm = ({
  initialValues,
  onCreated,
  onUpdated,
}: EventFormProps) => {
  const [{ fetching: isCreatingEvent }, createEvent] = useCreateEventMutation()
  const [{ fetching: isUpdatingEvent }, updateEvent] = useUpdateEventMutation()
  const [form] = Form.useForm()

  const handleSubmit = (allValues: FormValues) => {
    const convertedValues = convertFormValues(allValues)

    if (initialValues && 'id' in initialValues) {
      // Updating an existing event
      updateEvent({
        input: {
          eventId: initialValues.id,
          ...convertedValues,
        },
      }).then(({ error }) => {
        if (error) message.error(error.message)
        else message.success('Event updated')
        onUpdated?.()
      })
    } else {
      createEvent({
        input: {
          category: EventCategory.MASTERMIND_GROUP,
          ...convertedValues,
        } as CreateEventInput,
      }).then(({ error }) => {
        if (error) message.error(error.message)
        else {
          message.success('Event created')
          onCreated?.()
        }
      })
    }
  }

  const handleCancel = () => {
    if (!initialValues?.id) return
    updateEvent({
      input: {
        eventId: initialValues.id,
        isCancelled: true,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Event cancelled')
      onUpdated?.()
    })
  }

  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(parseInitialValues(initialValues))
  }, [initialValues, form])

  return (
    <>
      <h1>{initialValues ? 'Update' : 'Create'} Group</h1>

      <Form
        form={form}
        initialValues={parseInitialValues(initialValues)}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <FormItems form={form} />

        <Form.Item>
          <Space>
            <Button
              htmlType="submit"
              loading={isCreatingEvent || isUpdatingEvent}
              type="primary"
            >
              Save
            </Button>

            {initialValues?.id ? (
              <Popconfirm
                cancelText="No"
                okText="Yes"
                onConfirm={handleCancel}
                title="Are you sure to cancel this event?"
              >
                <Button
                  danger
                  icon={<StopOutlined />}
                  loading={isUpdatingEvent}
                >
                  Cancel
                </Button>
              </Popconfirm>
            ) : null}
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
