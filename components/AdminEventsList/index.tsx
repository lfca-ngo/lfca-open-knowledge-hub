import { PlusOutlined } from '@ant-design/icons'
import { Badge, Button, Drawer, Space, Table, Tag } from 'antd'
import { useState } from 'react'

import { EventStatus, useEventsQuery } from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'
import { readableEventStatus } from '../../utils/events'
import { AdminEventParticipations } from '../AdminEventParticipations'
import { EventForm } from '../EventForm'
import styles from './styles.module.less'

const { Column } = Table

export const AdminEventsList = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventFragment | undefined>(
    undefined
  )
  const [isDrawerOpen, setIsDrawerOpen] = useState<
    'event' | 'participants' | null
  >(null)

  const [{ data, fetching }] = useEventsQuery({
    variables: {
      input: {
        includeCancelled: true,
      },
    },
  })

  const handleOpenDrawer = (
    type: 'event' | 'participants',
    event?: EventFragment
  ) => {
    setIsDrawerOpen(type)
    setSelectedEvent(event)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(null)
    setSelectedEvent(undefined)
  }

  return (
    <div className={styles['admin-events-list']}>
      <Space>
        <Button
          icon={<PlusOutlined />}
          onClick={() => handleOpenDrawer('event')}
          type="primary"
        >
          Create new group
        </Button>
      </Space>

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
          key="awaitingAdminApproval"
          render={(_, event: EventFragment) => (
            <Badge
              count={event.participationsAwaitingAdminApprovalCount}
              showZero
            />
          )}
          title="Applications"
        />
        <Column
          key="awaitingUserRSVP"
          render={(_, event: EventFragment) => (
            <Badge count={event.participationsAwaitingUserRSVPCount} showZero />
          )}
          title="Invited"
        />
        <Column
          key="userRSCPDeclined"
          render={(_, event: EventFragment) => (
            <Badge count={event.participationsUserRSVPDeclinedCount} showZero />
          )}
          title="Declined"
        />
        <Column
          key="userRSCPAccepted"
          render={(_, event: EventFragment) => (
            <Badge count={event.participationsUserRSVPAcceptedCount} showZero />
          )}
          title="Accepted"
        />
        <Column
          key="status"
          render={(_, event: EventFragment) => (
            <Tag
              color={
                event.status === EventStatus.RUNNING
                  ? 'success'
                  : event.status === EventStatus.EXPIRED ||
                    event.status === EventStatus.CANCELLED
                  ? 'error'
                  : 'processing'
              }
            >
              {readableEventStatus(event.status)}
            </Tag>
          )}
          title="Status"
        />
        <Column
          key="action"
          render={(_, event: EventFragment) => (
            <Space size="middle">
              <Button
                onClick={() => handleOpenDrawer('participants', event)}
                type="default"
              >
                Manage Participants
              </Button>

              <Button
                onClick={() => handleOpenDrawer('event', event)}
                type="primary"
              >
                Edit
              </Button>
            </Space>
          )}
          title="Action"
        />
      </Table>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={handleCloseDrawer}
        open={isDrawerOpen !== null}
      >
        {isDrawerOpen === 'event' ? (
          <EventForm
            initialValues={selectedEvent}
            onCreated={handleCloseDrawer}
            onUpdated={handleCloseDrawer}
          />
        ) : isDrawerOpen === 'participants' && selectedEvent ? (
          <AdminEventParticipations event={selectedEvent} />
        ) : null}
      </Drawer>
    </div>
  )
}
