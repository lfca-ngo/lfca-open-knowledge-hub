import { List } from 'antd'
import { useMemo } from 'react'

import { ContentfulRequirementFields } from '../../services/contentful'
import { CompanyAction } from '../../services/lfca-backend'
import { RequirementsItem } from './RequirementsItem'
import styles from './styles.module.less'

interface MergedRequirementItem extends ContentfulRequirementFields {
  completedAt: string | null
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
      className={styles['requirements-list']}
      dataSource={requirementsList}
      renderItem={(item) => (
        <List.Item>
          <RequirementsItem actionContentId={actionContentId} item={item} />
        </List.Item>
      )}
    />
  )
}
