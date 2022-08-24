require('./styles.less')

import { CheckOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, List, message, Popconfirm } from 'antd'
import { useState } from 'react'

import {
  EventParticipationStatus,
  useCreateEventParticipationRequestMutation,
  useDeleteEventParticipationRequestMutation,
  useEventParticipationRequestsQuery,
  useUpdateEventParticipationRequestMutation,
} from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'
import { UserIdSearchInput } from '../UserIdSearchInput'

interface AdminEventParticipantsProps {
  event?: EventFragment
  onClose: () => void
}

export const AdminEventParticipants = ({
  event,
}: AdminEventParticipantsProps) => {
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(
    null
  )
  const [deletingRequestId, setDeletingRequestId] = useState<string | null>(
    null
  )

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
  const [, updateEventParticipationRequest] =
    useUpdateEventParticipationRequestMutation()
  const [, deleteEventParticipationRequest] =
    useDeleteEventParticipationRequestMutation()

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

  const handleUpdate = async (
    eventParticipationRequestId: string,
    approved: boolean
  ) => {
    setUpdatingRequestId(eventParticipationRequestId)
    const res = await updateEventParticipationRequest({
      input: {
        approved,
        eventParticipationRequestId,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    }

    setUpdatingRequestId(null)
  }

  const handleDelete = async (eventParticipationRequestId: string) => {
    setDeletingRequestId(eventParticipationRequestId)
    const res = await deleteEventParticipationRequest({
      input: {
        eventParticipationRequestId,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    }

    setDeletingRequestId(null)
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
          <List.Item
            actions={
              request.status === EventParticipationStatus.PENDING
                ? [
                    <Popconfirm
                      cancelText="No"
                      key="delete"
                      okText="Yes"
                      onConfirm={() => handleDelete(request.id)}
                      title="Are you sure to delete this request?"
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        loading={deletingRequestId === request.id}
                        type="ghost"
                      />
                    </Popconfirm>,
                    <Button
                      icon={<CheckOutlined />}
                      key="approve"
                      loading={updatingRequestId === request.id}
                      onClick={() => handleUpdate(request.id, true)}
                      type="primary"
                    />,
                  ]
                : [
                    <Popconfirm
                      cancelText="No"
                      key="delete"
                      okText="Yes"
                      onConfirm={() => handleDelete(request.id)}
                      title="Are you sure to delete this request?"
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        loading={deletingRequestId === request.id}
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
        )}
      />
    </div>
  )
}
