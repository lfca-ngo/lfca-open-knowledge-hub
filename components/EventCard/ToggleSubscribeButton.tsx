import { CloseCircleOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, ButtonProps, message, Popover } from 'antd'
import { SyntheticEvent } from 'react'

import {
  EventFragment,
  EventParticipantStatus,
  useAddEventParticipantMutation,
  useRemoveEventParticipantMutation,
} from '../../services/lfca-backend'

export interface ToggleSubscribeButtonProps {
  buttonProps?: ButtonProps
  event: EventFragment
}

export const ToggleSubscribeButton = ({
  buttonProps,
  event,
}: ToggleSubscribeButtonProps) => {
  const isNotRequested = event.participationStatus === null
  const isPending =
    event.participationStatus === EventParticipantStatus.AWAITING_ADMIN_APPROVAL

  const [{ fetching: deleting }, removeEventParticipant] =
    useRemoveEventParticipantMutation()
  const [{ fetching: subscribing }, addEventParticipant] =
    useAddEventParticipantMutation()

  const handleJoin = async () => {
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

  const changeEventSubscription = (e: SyntheticEvent) => {
    e.stopPropagation()

    if (isNotRequested) {
      handleJoin()
    } else {
      handleDelete()
    }
  }

  const popoverContent = () => {
    if (isPending) return 'Your application is pending'
    if (buttonProps?.disabled)
      return 'You can only join one group. Unsubscribe from your group first.'
    else return null
  }

  return (
    <Popover content={popoverContent()}>
      <Button
        icon={isNotRequested ? <UserAddOutlined /> : <CloseCircleOutlined />}
        key="unsubscribe"
        loading={subscribing || deleting}
        onClick={changeEventSubscription}
        type={isNotRequested ? 'primary' : 'default'}
        {...buttonProps}
      >
        {isNotRequested ? 'Join' : 'Unsubscribe'}
      </Button>
    </Popover>
  )
}
