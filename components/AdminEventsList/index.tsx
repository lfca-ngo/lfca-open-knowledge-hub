import { Badge, Button, Drawer, Space, Table, Tag } from 'antd'
import { useState } from 'react'

import { EventStatus, useEventsQuery } from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'
import { AdminEventParticipants } from '../AdminEventParticipants'
import styles from './styles.module.less'

const { Column } = Table

export const AdminEventsList = () => {
  const [selectedEvent, setSelectedEvent] = useState<
    EventFragment | undefined
  >()

  const [{ data, fetching }] = useEventsQuery({
    variables: {
      input: {
        includeExpired: true,
      },
    },
  })

  return (
    <div className="admin-events-list">
      <Table
        className="events-table"
        dataSource={data?.events || []}
        loading={fetching}
        pagination={{ pageSize: 20 }}
        rowClassName={(event) =>
          event.status === 'EXPIRED' ? 'row-expired' : 'undefined'
        }
        rowKey={(event) => event.id}
      >
        <Column dataIndex="title" key="title" title="Title" />
        <Column
          key="applications"
          render={(_, event: EventFragment) => (
            <Badge count={event.participationRequestsPendingCount} showZero />
          )}
          title="Applications"
        />
        <Column
          key="participants"
          render={(_, event: EventFragment) => (
            <Badge count={event.participationRequestsApprovedCount} showZero />
          )}
          title="Participants"
        />
        <Column
          key="status"
          render={(_, event: EventFragment) => (
            <Tag
              color={
                event.status === EventStatus.RUNNING
                  ? 'success'
                  : event.status === EventStatus.EXPIRED
                  ? 'error'
                  : 'processing'
              }
            >
              {event.status === EventStatus.RUNNING
                ? 'active'
                : event.status === EventStatus.EXPIRED
                ? 'expired'
                : 'upcoming'}
            </Tag>
          )}
          title="Status"
        />
        <Column
          key="action"
          render={(_, event: EventFragment) =>
            event.status !== 'EXPIRED' ? (
              <Space size="middle">
                <Button onClick={() => setSelectedEvent(event)} type="primary">
                  Manage participants
                </Button>
              </Space>
            ) : null
          }
          title="Action"
        />
      </Table>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={() => setSelectedEvent(undefined)}
        visible={!!selectedEvent}
      >
        {selectedEvent && (
          <AdminEventParticipants
            event={selectedEvent}
            onClose={() => setSelectedEvent(undefined)}
          />
        )}
      </Drawer>
    </div>
  )
}
