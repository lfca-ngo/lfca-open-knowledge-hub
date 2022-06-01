import { List } from 'antd'

import { useCompanyActionsListQuery } from '../../services/lfca-backend'

interface ActionHistoryProps {
  contentId?: string
}

export const ActionHistory = ({ contentId = '' }: ActionHistoryProps) => {
  const [{ data: actionsData }] = useCompanyActionsListQuery({
    pause: !contentId,
    variables: {
      input: {
        filter: {
          actionContentIds: [contentId],
        },
      },
    },
  })
  console.log(contentId, actionsData)
  return (
    <List
      dataSource={actionsData?.companyActions || []}
      renderItem={(action) => <List.Item>{action.title}</List.Item>}
    />
  )
}
