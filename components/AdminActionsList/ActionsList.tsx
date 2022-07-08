require('./styles.less')

import { Button, Tag, List } from 'antd'

import {
  CompanyActionListItemFragment,
  useCompanyActionsListQuery,
} from '../../services/lfca-backend'

interface AllActionsListProps {
  selectedCompanyId?: string
  setSelectedAction: (action: CompanyActionListItemFragment) => void
  isExpired?: boolean
}

export const ActionsList = ({
  isExpired = false,
  selectedCompanyId,
  setSelectedAction,
}: AllActionsListProps) => {
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

  return (
    <div>
      <List
        dataSource={searchData?.companyActions?.sort((a, b) =>
          (a?.title || '').localeCompare(b?.title || '')
        )}
        loading={isFetchingSearch}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                onClick={() => setSelectedAction(item)}
                type="primary"
              >
                Edit
              </Button>,
            ]}
          >
            {item.title}
            {item.completedAt && <Tag>Completed</Tag>}
            {item.plannedAt && <Tag>Planned</Tag>}
          </List.Item>
        )}
      />
    </div>
  )
}
