require('./styles.less')

import { LoadingOutlined } from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Checkbox, Collapse, List, message } from 'antd'
import { ContentfulRequirementFields } from '../../services/contentful'
import { useMemo } from 'react'

import {
  CompanyAction,
  useCompleteCompanyActionRequirementMutation,
} from '../../services/lfca-backend'

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
        skipValueCheck: true,
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
            {documentToReactComponents(item.howTo)}
          </div>
        </div>
      </Panel>
    </Collapse>
  )
}

export const RequirementsList = ({
  actionContentId,
  requirements = [],
  requirementsContent = [],
}: {
  actionContentId: string
  requirements?: CompanyAction['requirements']
  requirementsContent?: ContentfulRequirementFields[]
}) => {
  const requirementsList = useMemo(() => {
    if (!requirementsContent) return []

    return requirementsContent.map((item) => {
      const matchedEntry = requirements?.find((r) => r.contentId === item.reqId)
      return {
        ...item,
        completedAt: matchedEntry?.completedAt,
      }
    })
  }, [requirements, requirementsContent]) as MergedRequirementItem[]

  return (
    <List
      className="requirements-list"
      dataSource={requirementsList}
      renderItem={(item) => (
        <List.Item>
          <RequirementsItem actionContentId={actionContentId} item={item} />
        </List.Item>
      )}
    />
  )
}
