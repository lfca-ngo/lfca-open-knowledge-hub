import { CheckOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, List, message, Popconfirm } from 'antd'

import {
  EventParticipationRequestFragment,
  EventParticipationStatus,
  useDeleteEventParticipationRequestMutation,
  UserFragment,
  useUpdateEventParticipationRequestMutation,
} from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'

interface AdminEventParticipationRequestProps {
  event: EventFragment
  request: Pick<EventParticipationRequestFragment, 'status'> & {
    user?: UserFragment | null
  }
}

export const AdminEventParticipationRequest = ({
  event,
  request,
}: AdminEventParticipationRequestProps) => {
  const [{ fetching: updating }, updateEventParticipationRequest] =
    useUpdateEventParticipationRequestMutation()
  const [{ fetching: deleting }, deleteEventParticipationRequest] =
    useDeleteEventParticipationRequestMutation()

  const handleUpdate = async (
    eventParticipationRequestUserId: string,
    approved: boolean
  ) => {
    const res = await updateEventParticipationRequest({
      input: {
        approved,
        eventId: event.id,
        userId: eventParticipationRequestUserId,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    }
  }

  const handleDelete = async (eventParticipationRequestUserId: string) => {
    const res = await deleteEventParticipationRequest({
      input: {
        eventId: event.id,
        userId: eventParticipationRequestUserId,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    }
  }

  return (
    <List.Item
      actions={
        request.status === EventParticipationStatus.PENDING
          ? [
              <Popconfirm
                cancelText="No"
                key="delete"
                okText="Yes"
                onConfirm={() =>
                  request.user?.id
                    ? handleDelete(request.user?.id)
                    : message.error('missing user id')
                }
                title="Are you sure to delete this request?"
              >
                <Button
                  icon={<DeleteOutlined />}
                  loading={deleting}
                  type="ghost"
                />
              </Popconfirm>,
              <Button
                icon={<CheckOutlined />}
                key="approve"
                loading={updating}
                onClick={() =>
                  request.user?.id
                    ? handleUpdate(request.user?.id, true)
                    : message.error('missing user id')
                }
                type="primary"
              />,
            ]
          : [
              <Popconfirm
                cancelText="No"
                key="delete"
                okText="Yes"
                onConfirm={() =>
                  request.user?.id
                    ? handleDelete(request.user?.id)
                    : message.error('missing user id')
                }
                title="Are you sure to delete this request?"
              >
                <Button
                  icon={<DeleteOutlined />}
                  loading={deleting}
                  type="ghost"
                />
              </Popconfirm>,
            ]
      }
    >
      <List.Item.Meta
        avatar={
          <Avatar
            icon={!request.user?.picture && <UserOutlined />}
            size={45}
            src={request.user?.picture}
            style={{ backgroundColor: '#6A1246' }}
          />
        }
        description={request.user?.company?.name}
        title={`${request.user?.firstName} ${request.user?.lastName} (${request.user?.email})`}
      />
    </List.Item>
  )
}
