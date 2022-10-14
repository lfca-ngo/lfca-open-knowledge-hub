import { StopOutlined } from '@ant-design/icons'
import { Button, Form, message, Popconfirm, Space } from 'antd'
import { Moment } from 'moment'
import { useEffect } from 'react'

import {
  CreateEventInput,
  EventFragment,
  UpdateEventInput,
  useCreateEventMutation,
  useUpdateEventMutation,
} from '../../services/lfca-backend'
import { convertFormValues } from './convert-form-values'
import { FormItems } from './FormItems'
import { parseInitialValues } from './parse-initial-values'

export type FormValues = Omit<UpdateEventInput, 'end' | 'eventId' | 'start'> & {
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
        input: convertedValues as CreateEventInput,
      }).then(({ error }) => {
        if (error) message.error(error.message)
        else {
          message.success('Event created')
          onCreated?.()
        }
      })
    }
  }

  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(parseInitialValues(initialValues))
  }, [initialValues, form])

  return (
    <>
      <h1>{initialValues ? 'Update' : 'Create'} Event</h1>

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

            {initialValues?.id === 'update' ? (
              <Popconfirm
                cancelText="No"
                okText="Yes"
                onConfirm={() => alert('TODO')}
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
