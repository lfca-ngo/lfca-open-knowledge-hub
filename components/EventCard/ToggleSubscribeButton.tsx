import {
  CheckOutlined,
  CloseCircleOutlined,
  StopOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Button, ButtonProps, message, Popover, Space } from 'antd'
import { SyntheticEvent } from 'react'

import {
  EventFragment,
  EventParticipantStatus,
  useAddEventParticipantMutation,
  useRemoveEventParticipantMutation,
  useUpdateEventParticipantStatusMutation,
} from '../../services/lfca-backend'

export interface ToggleSubscribeButtonProps {
  buttonProps?: ButtonProps
  event: EventFragment
}

export const ToggleSubscribeButton = ({
  buttonProps,
  event,
}: ToggleSubscribeButtonProps) => {
  const hasNotJoined =
    event.participationStatus === null ||
    event.participationStatus === EventParticipantStatus.USER_RSVP_DECLINED
  const isPendingAdminApproval =
    event.participationStatus === EventParticipantStatus.AWAITING_ADMIN_APPROVAL
  const isPendingUserRSVP =
    event.participationStatus === EventParticipantStatus.AWAITING_USER_RSVP

  const [{ fetching: deleting }, removeEventParticipant] =
    useRemoveEventParticipantMutation()
  const [{ fetching: subscribing }, addEventParticipant] =
    useAddEventParticipantMutation()
  const [{ fetching: updating }, updateEventParticipantStatus] =
    useUpdateEventParticipantStatusMutation()

  const handleJoin = async () => {
    if (
      event.participationStatus === EventParticipantStatus.USER_RSVP_DECLINED
    ) {
      // Declined is currently rendered for the user as if he is not part of the group at all
      // so if the user want's to re-join, we first remove him.
      await removeEventParticipant({
        input: {
          eventId: event.id,
        },
      })
    }

    const res = await addEventParticipant({
      input: {
        eventId: event.id,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    } else {
      message.success('We will notify you once your spot is confirmed')
    }
  }

  const handleDelete = async () => {
    const res = await removeEventParticipant({
      input: {
        eventId: event.id,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    } else {
      message.success('You have been removed from this group')
    }
  }

  const handleRSVP = async (accept: boolean) => {
    const res = await updateEventParticipantStatus({
      input: {
        eventId: event.id,
        status: accept
          ? EventParticipantStatus.USER_RSVP_ACCEPTED
          : EventParticipantStatus.USER_RSVP_DECLINED,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    } else {
      message.success('Your RSVP has been saved')
    }
  }

  const changeEventSubscription = (e: SyntheticEvent) => {
    e.stopPropagation()

    if (hasNotJoined) {
      handleJoin()
    } else {
      handleDelete()
    }
  }

  const popoverContent = () => {
    if (isPendingAdminApproval) return 'Your application is pending'
    if (isPendingUserRSVP)
      return 'You are invited to join. Let us know if you are coming!'
    if (buttonProps?.disabled)
      return 'You can only join one group. Unsubscribe from your group first.'
    else return null
  }

  return (
    <Popover content={popoverContent()}>
      {isPendingUserRSVP ? (
        <Space>
          <Button
            icon={<StopOutlined />}
            key="decline"
            loading={updating}
            onClick={() => handleRSVP(false)}
            type="default"
          />
          <Button
            icon={<CheckOutlined />}
            key="accept"
            loading={updating}
            onClick={() => handleRSVP(true)}
            type="primary"
          />
        </Space>
      ) : (
        <Button
          icon={hasNotJoined ? <UserAddOutlined /> : <CloseCircleOutlined />}
          key="unsubscribe"
          loading={subscribing || deleting}
          onClick={changeEventSubscription}
          type={hasNotJoined ? 'primary' : 'default'}
          {...buttonProps}
        >
          {hasNotJoined ? 'Join' : 'Unsubscribe'}
        </Button>
      )}
    </Popover>
  )
}
