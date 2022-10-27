import { Collapse } from 'antd'

import { useCompanyActionsListQuery } from '../../services/lfca-backend'
import { HistoryItem } from './HistoryItem'

const { Panel } = Collapse

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
          isCompleted: true,
          isExpired: true,
        },
      },
    },
  })

  if ((actionsData?.companyActions?.length || 0) < 1)
    return (
      <div>
        No history data available. This action has not yet been completed.
      </div>
    )

  return (
    <Collapse accordion className="mini-collapse" ghost>
      {actionsData?.companyActions.map((action) => (
        <Panel header={action.title} key="">
          <HistoryItem action={action} />
        </Panel>
      ))}
    </Collapse>
  )
}
