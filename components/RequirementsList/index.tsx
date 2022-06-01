require('./styles.less')

import { LoadingOutlined } from '@ant-design/icons'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Checkbox, Collapse, List, message } from 'antd'

import {
  CompanyAction,
  CompanyActionRequirement,
  useCompleteCompanyActionRequirementMutation,
} from '../../services/lfca-backend'

const { Panel } = Collapse

export const RequirementsItem = ({
  actionContentId,
  item,
}: {
  actionContentId: string
  item: CompanyActionRequirement
}) => {
  const [{ fetching }, completeCompanyActionRequirement] =
    useCompleteCompanyActionRequirementMutation()

  const handleToggle = () => {
    completeCompanyActionRequirement({
      input: {
        actionContentId: actionContentId,
        actionRequirementContentId: item.contentId,
        isCompleted: !!!item.completedAt,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
    })
  }

  return (
    <Collapse className="requirement-collapse">
      <Panel
        extra={
          <div>
            {fetching ? (
              <LoadingOutlined />
            ) : (
              <Checkbox checked={!!item.completedAt} onChange={handleToggle} />
            )}
          </div>
        }
        header={item.title}
        key="1"
      >
        <div className="requirement-text">
          <div className="description">{item.description}</div>
        </div>
      </Panel>
    </Collapse>
  )
}

export const RequirementsList = ({
  actionContentId,
  requirements = [],
}: {
  actionContentId: string
  requirements?: CompanyAction['requirements']
}) => {
  return (
    <List
      className="requirements-list"
      dataSource={requirements}
      renderItem={(item) => (
        <List.Item>
          <RequirementsItem actionContentId={actionContentId} item={item} />
        </List.Item>
      )}
    />
  )
}
