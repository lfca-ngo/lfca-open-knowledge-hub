import { CloseCircleOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, ButtonProps, message, Popover } from 'antd'

import {
  EventFragment,
  useCreateEventParticipationRequestMutation,
  useDeleteEventParticipationRequestMutation,
} from '../../services/lfca-backend'

export interface ToggleSubscribeButtonProps {
  buttonProps?: ButtonProps
  event: EventFragment
}

export const ToggleSubscribeButton = ({
  buttonProps,
  event,
}: ToggleSubscribeButtonProps) => {
  const isNotRequested = event.participationRequestStatus === null

  const [{ fetching: deleting }, deleteEventParticipationRequest] =
    useDeleteEventParticipationRequestMutation()
  const [{ fetching: subscribing }, createEventParticipationRequest] =
    useCreateEventParticipationRequestMutation()

  const handleJoin = async () => {
    const res = await createEventParticipationRequest({
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
    const res = await deleteEventParticipationRequest({
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

  const changeEventSubscription = () => {
    if (isNotRequested) {
      handleJoin()
    } else {
      handleDelete()
    }
  }

  return (
    <Popover
      content={
        buttonProps?.disabled
          ? 'You can only join one group. Unsubscribe from your group first.'
          : null
      }
    >
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
