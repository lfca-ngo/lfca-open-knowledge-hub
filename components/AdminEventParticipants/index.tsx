import { Button, Form, List, message } from 'antd'

import {
  useCreateEventParticipationRequestMutation,
  useEventParticipationRequestsQuery,
} from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'
import { UserIdSearchInput } from '../UserIdSearchInput'
import { AdminEventParticipationRequest } from './AdminEventParticipationRequest'
import styles from './styles.module.less'

interface AdminEventParticipantsProps {
  event: EventFragment
  onClose: () => void
}

export const AdminEventParticipants = ({
  event,
}: AdminEventParticipantsProps) => {
  const [form] = Form.useForm()

  const [{ data, fetching: fetchingRequests }] =
    useEventParticipationRequestsQuery({
      pause: !event?.id,
      variables: {
        input: {
          eventId: event?.id || '',
        },
      },
    })

  const [
    { fetching: fetchingCreateEventParticipationRequest },
    createEventParticipationRequest,
  ] = useCreateEventParticipationRequestMutation()

  const handleCreate = async ({ userId }: { userId?: string }) => {
    if (!event) return
    const res = await createEventParticipationRequest({
      input: {
        approved: true,
        eventId: event.id,
        userId,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    } else {
      form.resetFields()
    }
  }

  return (
    <div className="admin-event-participants">
      <h1>{event?.title}</h1>
      <Form form={form} layout="vertical" onFinish={handleCreate}>
        <Form.Item
          label="Invite a specific user to this event"
          name="userId"
          rules={[{ message: 'Please select a user', required: true }]}
        >
          <UserIdSearchInput />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={fetchingCreateEventParticipationRequest}
            type="primary"
          >
            Invite
          </Button>
        </Form.Item>
      </Form>
      <List
        dataSource={data?.eventParticipationRequests || []}
        itemLayout="horizontal"
        loading={fetchingRequests}
        renderItem={(request) => (
          <AdminEventParticipationRequest event={event} request={request} />
        )}
      />
    </div>
  )
}
