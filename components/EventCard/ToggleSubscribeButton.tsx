import {
  CheckOutlined,
  CloseCircleOutlined,
  StopOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Button, ButtonProps, Form, Input, message, Popover, Space } from 'antd'
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

  const handleAccept = async () => {
    const res = await updateEventParticipantStatus({
      input: {
        eventId: event.id,
        status: EventParticipantStatus.USER_RSVP_ACCEPTED,
      },
    })

    if (res.error) {
      message.error(res.error.message)
    } else {
      message.success('Your RSVP has been saved')
    }
  }

  const handleDeclineWithNotes = async ({ notes }: { notes?: string }) => {
    const res = await updateEventParticipantStatus({
      input: {
        eventId: event.id,
        notes,
        status: EventParticipantStatus.USER_RSVP_DECLINED,
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

  return isPendingUserRSVP ? (
    <Space
      direction={buttonProps?.block ? 'vertical' : 'horizontal'}
      style={buttonProps?.block ? { width: '100%' } : undefined}
    >
      <Popover
        content={
          <Form layout="vertical" onFinish={handleDeclineWithNotes}>
            <Form.Item
              key="notes"
              label="Let us know why you can not join"
              name="notes"
            >
              <Input.TextArea placeholder="e.g. time does not fit my calendar" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                loading={updating}
                size={buttonProps?.size}
                type="primary"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        }
        trigger="click"
      >
        <Button
          block={buttonProps?.block}
          icon={<StopOutlined />}
          key="decline"
          loading={updating}
          size={buttonProps?.size}
          type="default"
        >
          {buttonProps?.block ? 'Cancel invitation' : ''}
        </Button>
      </Popover>
      <Popover content={!buttonProps?.block ? 'Confirm invitation' : ''}>
        <Button
          block={buttonProps?.block}
          icon={<CheckOutlined />}
          key="accept"
          loading={updating}
          onClick={() => handleAccept()}
          size={buttonProps?.size}
          type="primary"
        >
          {buttonProps?.block ? 'Confirm invitation' : ''}
        </Button>
      </Popover>
    </Space>
  ) : (
    <Popover content={popoverContent()}>
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
    </Popover>
  )
}
