import { PlusOutlined } from '@ant-design/icons'
import { Badge, Button, Drawer, Space, Table, Tag } from 'antd'
import { useState } from 'react'

import { EventStatus, useEventsQuery } from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'
import { EventForm } from '../EventForm'
import styles from './styles.module.less'

const { Column } = Table

export const AdminEventsList = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventFragment | undefined>(
    undefined
  )
  const [isOpen, setIsOpen] = useState(false)

  const [{ data, fetching }] = useEventsQuery({
    variables: {
      input: {
        includeCancelled: true,
      },
    },
  })

  const handleOpen = (event?: EventFragment) => {
    setIsOpen(true)
    setSelectedEvent(event)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedEvent(undefined)
  }

  return (
    <div className={styles['admin-events-list']}>
      <Space>
        <Button
          icon={<PlusOutlined />}
          onClick={() => handleOpen()}
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
                <Button onClick={() => handleOpen(event)} type="primary">
                  Edit
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
        onClose={handleClose}
        open={isOpen}
      >
        <>
          <h1>{selectedEvent ? 'Update' : 'Create'} Event</h1>

          <EventForm
            initialValues={selectedEvent}
            onCreated={handleClose}
            onUpdated={handleClose}
          />
        </>
      </Drawer>
    </div>
  )
}
