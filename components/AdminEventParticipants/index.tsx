require('./styles.less')

import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, List, message } from 'antd'
import { useState } from 'react'

import {
  useEventParticipationRequestsQuery,
  useUpdateEventParticipationRequestMutation,
} from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'

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

  const [{ data, fetching: fetchingRequests }] =
    useEventParticipationRequestsQuery({
      pause: !event?.id,
      variables: {
        input: {
          eventId: event?.id || '',
        },
      },
    })

  const [, updateEventParticipationRequest] =
    useUpdateEventParticipationRequestMutation()

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

  return (
    <div className="admin-event-participants">
      <h1>{event?.title}</h1>
      <List
        dataSource={data?.eventParticipationRequests || []}
        itemLayout="horizontal"
        loading={fetchingRequests}
        renderItem={(request) => (
          <List.Item
            actions={
              request.status === 'PENDING'
                ? [
                    <Button
                      key="approve"
                      loading={updatingRequestId === request.id}
                      onClick={() => handleUpdate(request.id, true)}
                      type="primary"
                    >
                      Approve
                    </Button>,
                  ]
                : request.status === 'APPROVED'
                ? [
                    <Button
                      key="un-approve"
                      loading={updatingRequestId === request.id}
                      onClick={() => handleUpdate(request.id, false)}
                      type="primary"
                    >
                      Approve
                    </Button>,
                  ]
                : undefined
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
