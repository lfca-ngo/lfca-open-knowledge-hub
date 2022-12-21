import { List } from 'antd'

import { ContentfulRequirementFields } from '../../services/contentful'
import { RequirementsItem } from './RequirementsItem'
import styles from './styles.module.less'

export const RequirementsList = ({
  actionContentId,
  requirementsContent = [],
}: {
  actionContentId: string
  requirementsContent?: ContentfulRequirementFields[]
}) => {
  return (
    <List
      className={styles['requirements-list']}
      dataSource={requirementsContent}
      renderItem={(item) => (
        <List.Item>
          <RequirementsItem actionContentId={actionContentId} item={item} />
        </List.Item>
      )}
    />
  )
}
