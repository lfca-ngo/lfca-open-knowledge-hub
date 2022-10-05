import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Drawer, Popover, Table, Tag } from 'antd'
import { useState } from 'react'

import {
  CompanyActionListItemFragment,
  useCompanyActionsListQuery,
} from '../../services/lfca-backend'
import { toReadibleDate } from '../../utils'
import { ActionsForm } from './ActionsForm'

const { Column } = Table

interface AllActionsListProps {
  selectedCompanyId?: string
  isExpired?: boolean
}

export const ActionsList = ({
  isExpired = false,
  selectedCompanyId,
}: AllActionsListProps) => {
  const [selectedActionId, setSelectedActionId] = useState<string | undefined>()

  const [{ data: searchData, fetching: isFetchingSearch }] =
    useCompanyActionsListQuery({
      pause: !selectedCompanyId,
      variables: {
        input: {
          filter: {
            companyId: selectedCompanyId,
            isExpired,
          },
        },
      },
    })

  const selectedAction = searchData?.companyActions?.find(
    (a) => a.id === selectedActionId
  )

  return (
    <div>
      <Table
        dataSource={searchData?.companyActions?.sort((a, b) =>
          (a?.title || '').localeCompare(b?.title || '')
        )}
        loading={isFetchingSearch}
        pagination={false}
        rowKey={(item) => item.id}
      >
        <Column dataIndex="title" key="title" title="Title" />
        <Column
          dataIndex="completedAt"
          key="completedAt"
          render={(_, record: CompanyActionListItemFragment) =>
            record.completedAt ? (
              <Tag color="green">{toReadibleDate(record.completedAt)}</Tag>
            ) : null
          }
          title="Completed At"
        />
        <Column
          dataIndex="plannedAt"
          key="plannedAt"
          render={(_, record: CompanyActionListItemFragment) =>
            record.plannedAt ? (
              <Tag color="pink">{toReadibleDate(record.plannedAt)}</Tag>
            ) : null
          }
          title="Planned At"
        />
        <Column
          dataIndex="id"
          key="id"
          render={(_, record: CompanyActionListItemFragment) => (
            <Popover title={record.id}>
              <InfoCircleOutlined />
            </Popover>
          )}
          title="Id"
        />
        <Column
          key="action"
          render={(_, record: CompanyActionListItemFragment) =>
            isExpired ? null : (
              <Button
                onClick={() => setSelectedActionId(record.id)}
                type="primary"
              >
                Edit
              </Button>
            )
          }
          title="Action"
        />
      </Table>

      {!!selectedAction && !!selectedCompanyId && (
        <Drawer
          destroyOnClose
          onClose={() => setSelectedActionId(undefined)}
          open={!!selectedAction && !!selectedCompanyId}
        >
          <ActionsForm action={selectedAction} companyId={selectedCompanyId} />
        </Drawer>
      )}
    </div>
  )
}
