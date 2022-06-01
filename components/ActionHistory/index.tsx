import { Collapse } from 'antd'

import { useCompanyActionsListQuery } from '../../services/lfca-backend'

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
        },
      },
    },
  })

  return (
    <Collapse accordion className="mini-collapse" ghost>
      {actionsData?.companyActions.map((action) => (
        <Panel header={action.title} key="">
          {action.notes}
        </Panel>
      ))}
    </Collapse>
  )
}
