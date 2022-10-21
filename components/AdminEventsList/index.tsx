import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Badge, Button, Drawer, message, Space, Table, Tag } from 'antd'
import { useState } from 'react'

import {
  EventCategory,
  EventStatus,
  useCreateEventParticipantExportMutation,
  useEventsQuery,
} from '../../services/lfca-backend'
import { EventFragment } from '../../services/lfca-backend'
import { readableEventStatus } from '../../utils/events'
import { AdminEventParticipants } from '../AdminEventParticipants'
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

  const [{ fetching: isExporting }, exportParticipants] =
    useCreateEventParticipantExportMutation()

  const [{ data, fetching }] = useEventsQuery({
    variables: {
      input: {
        filter: {
          category: EventCategory.MASTERMIND_GROUP,
          includeCancelled: true,
        },
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

  const handleExport = () => {
    exportParticipants({}).then(({ data, error }) => {
      if (error) message.error(error.message)
      const url = data?.createEventParticipantExport
      if (url) {
        window.open(url, '_blank')
      }
    })
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

        <Button
          icon={<DownloadOutlined />}
          loading={isExporting}
          onClick={() => handleExport()}
          type="ghost"
        >
          Export Participants
        </Button>
      </Space>

      <Table
        className="events-table"
        dataSource={data?.events || []}
        loading={fetching}
        pagination={{ pageSize: 20 }}
        rowClassName={(event) =>
          event.status === EventStatus.CANCELLED
            ? 'row-cancelled'
            : event.status === EventStatus.EXPIRED
            ? 'row-expired'
            : 'undefined'
        }
        rowKey={(event) => event.id}
      >
        <Column dataIndex="title" key="title" title="Title" />
        <Column
          key="awaitingAdminApproval"
          render={(_, event: EventFragment) => (
            <Badge
              count={event.participantsAwaitingAdminApprovalCount}
              showZero
            />
          )}
          title="Applications"
        />
        <Column
          key="awaitingUserRSVP"
          render={(_, event: EventFragment) => (
            <Badge count={event.participantsAwaitingUserRSVPCount} showZero />
          )}
          title="Invited"
        />
        <Column
          key="userRSCPDeclined"
          render={(_, event: EventFragment) => (
            <Badge count={event.participantsUserRSVPDeclinedCount} showZero />
          )}
          title="Declined"
        />
        <Column
          key="userRSCPAccepted"
          render={(_, event: EventFragment) => (
            <Badge count={event.participantsUserRSVPAcceptedCount} showZero />
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
                  : event.status === EventStatus.CANCELLED ||
                    event.status === EventStatus.EXPIRED
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
          render={(_, event: EventFragment) =>
            event.status !== EventStatus.CANCELLED &&
            event.status !== EventStatus.EXPIRED ? (
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
            ) : null
          }
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
          <AdminEventParticipants event={selectedEvent} />
        ) : null}
      </Drawer>
    </div>
  )
}
