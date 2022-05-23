import { List } from 'antd'

import { CompanyAction } from '../../services/lfca-backend'

interface ActionHistoryProps {
  actions: CompanyAction[]
}

export const ActionHistory = ({ actions }: ActionHistoryProps) => {
  return (
    <List
      dataSource={actions}
      renderItem={(action) => <List.Item>{action.title}</List.Item>}
    />
  )
}
