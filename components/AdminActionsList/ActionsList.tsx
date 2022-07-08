require('./styles.less')

import { Button, Drawer, Form, Input, message, List } from 'antd'

import { useCompanyActionsListQuery } from '../../services/lfca-backend'

interface AllActionsListProps {
  selectedCompanyId?: string
  isExpired?: boolean
}

export const ActionsList = ({
  isExpired = false,
  selectedCompanyId,
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
        dataSource={searchData?.companyActions}
        renderItem={(item) => <List.Item>{item.contentId}</List.Item>}
      />
    </div>
  )
}
