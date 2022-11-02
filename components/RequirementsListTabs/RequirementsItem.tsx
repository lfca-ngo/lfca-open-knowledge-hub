import { LoadingOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Checkbox, Collapse, message } from 'antd'

import { ContentfulRequirementFields } from '../../services/contentful'
import { useCompleteCompanyActionRequirementMutation } from '../../services/lfca-backend'
import { options } from '../../utils/rich-text-options'

const { Panel } = Collapse

interface MergedRequirementItem extends ContentfulRequirementFields {
  completedAt: string | null
}

export const RequirementsItem = ({
  actionContentId,
  item,
}: {
  actionContentId: string
  item: MergedRequirementItem
}) => {
  const [{ fetching }, completeCompanyActionRequirement] =
    useCompleteCompanyActionRequirementMutation()

  const handleToggle = () => {
    completeCompanyActionRequirement({
      input: {
        actionContentId: actionContentId,
        actionRequirementContentId: item.reqId,
        isCompleted: !!!item.completedAt,
      },
    }).then(({ data, error }) => {
      if (error) {
        message.error(error.message)
      } else if (data?.completeCompanyActionRequirement?.completedAt) {
        message.success(`Marked as complete`)
      } else {
        message.info(`Marked as incomplete`)
      }
    })
  }

  return (
    <Collapse
      className="requirement-collapse mini-collapse"
      collapsible="header"
      ghost
    >
      <Panel
        extra={
          <div className="check-wrapper">
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
          <div className="description">
            {documentToReactComponents(item.howTo, options)}
          </div>
        </div>
      </Panel>
    </Collapse>
  )
}
