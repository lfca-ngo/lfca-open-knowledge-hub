import { CheckOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, List, message, Popconfirm, Tooltip } from 'antd'

import {
  EventParticipantStatus,
  EventParticipationFragment,
  useRemoveEventParticipantMutation,
  useUpdateEventParticipationStatusMutation,
} from '../../services/lfca-backend'
import {
  eventParticipationStatusIcon,
  readableEventParticipationStatus,
} from '../../utils/events'

interface AdminEventParticipationItemProps {
  eventId: string
  participation: EventParticipationFragment
}

export const AdminEventParticipationItem = ({
  eventId,
  participation,
}: AdminEventParticipationItemProps) => {
  const [
    { fetching: fetchingUpdateEventParticipationStatus },
    updateEventParticipationStatus,
  ] = useUpdateEventParticipationStatusMutation()
  const [{ fetching: fetchingRemoveEventParticipant }, removeEventParticipant] =
    useRemoveEventParticipantMutation()

  const handleRemove = async () => {
    const res = await removeEventParticipant({
      input: {
        eventId,
        userId: participation.user.id,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    }
  }

  const handleAccept = async () => {
    const res = await updateEventParticipationStatus({
      input: {
        eventId,
        status: EventParticipantStatus.USER_RSVP_ACCEPTED,
        userId: participation.user.id,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    }
  }

  return (
    <List.Item
      actions={[
        <Popconfirm
          cancelText="No"
          key="delete"
          okText="Yes"
          onConfirm={handleRemove}
          title="Are you sure to remove this user from the event?"
        >
          <Button
            icon={<DeleteOutlined />}
            loading={fetchingRemoveEventParticipant}
            size="small"
            type="ghost"
          />
        </Popconfirm>,
        participation.status ===
        EventParticipantStatus.AWAITING_ADMIN_APPROVAL ? (
          <Tooltip>
            <Button
              icon={<CheckOutlined />}
              key="approve"
              loading={fetchingUpdateEventParticipationStatus}
              onClick={handleAccept}
              size="small"
              type="primary"
            />
          </Tooltip>
        ) : (
          <Tooltip
            title={readableEventParticipationStatus(participation.status)}
          >
            <Button
              disabled
              icon={eventParticipationStatusIcon(participation.status)}
              key="status"
              size="small"
              type="default"
            />
          </Tooltip>
        ),
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            icon={!participation.user?.picture && <UserOutlined />}
            size={45}
            src={participation.user?.picture}
            style={{ backgroundColor: '#6A1246' }}
          />
        }
        description={participation.user?.company?.name}
        title={`${participation.user?.firstName} ${participation.user?.lastName}`}
      />
    </List.Item>
  )
}
