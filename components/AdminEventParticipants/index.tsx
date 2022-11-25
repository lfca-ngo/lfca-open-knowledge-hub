import { CollapseProps, Divider, List } from 'antd'
import { Collapse } from 'antd'
import React from 'react'

import {
  EventFragment,
  useEventParticipantsQuery,
} from '../../services/lfca-backend'
import { AdminEventParticipantItem } from './AdminEventParticipantItem'
import { InviteParticipantForm } from './InviteParticipantForm'
import { MessageParticipantsForm } from './MessageParticipantsForm'

const { Panel } = Collapse

interface ParticipantsListProps {
  event: EventFragment
}

export const AdminEventParticipants = ({ event }: ParticipantsListProps) => {
  const [openPanel, setOpenPanel] =
    React.useState<CollapseProps['activeKey']>(undefined)

  const [{ data, fetching: fetchingParticipants }] = useEventParticipantsQuery({
    pause: !event.id,
    variables: {
      input: {
        eventId: event.id,
      },
    },
  })

  return (
    <>
      <div>
        <h1>{event?.title}</h1>
        <Collapse accordion activeKey={openPanel} onChange={setOpenPanel}>
          <Panel header="Invite users" key="1">
            <InviteParticipantForm
              eventId={event.id}
              existingParticipants={data?.eventParticipants}
            />
          </Panel>
          <Panel header="Send message to participants" key="2">
            <MessageParticipantsForm
              eventId={event.id}
              onSuccess={() => setOpenPanel(undefined)}
            />
          </Panel>
        </Collapse>

        <Divider orientation="left" orientationMargin={0}>
          Participants
        </Divider>

        <List
          dataSource={data?.eventParticipants || []}
          itemLayout="horizontal"
          loading={fetchingParticipants}
          renderItem={(participant) => (
            <AdminEventParticipantItem
              eventId={event.id}
              participant={participant}
            />
          )}
        />
      </div>
    </>
  )
}
