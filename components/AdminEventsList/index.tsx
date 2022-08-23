require('./styles.less')

import { Badge, Button, Drawer, Space, Table, Tag } from 'antd'
import { useState } from 'react'

import { useEventsQuery } from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'
import { AdminEventApplications } from '../AdminEventApplicartions'

const { Column } = Table

export const AdminEventsList = () => {
  const [selectedEvent, setSelectedEvent] = useState<
    EventFragment | undefined
  >()

  const [{ data, fetching }] = useEventsQuery()

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
                event.status === 'RUNNING'
                  ? 'success'
                  : event.status === 'EXPIRED'
                  ? 'error'
                  : 'processing'
              }
            >
              {event.status === 'RUNNING'
                ? 'active'
                : event.status === 'EXPIRED'
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
        <AdminEventApplications
          event={selectedEvent}
          onClose={() => setSelectedEvent(undefined)}
        />
      </Drawer>
    </div>
  )
}
