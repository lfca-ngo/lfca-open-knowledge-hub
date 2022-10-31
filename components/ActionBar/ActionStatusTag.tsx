import { HeartOutlined, StarOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import classNames from 'classnames'

import { ActionStatusProps } from './StatusButton'
import styles from './styles.module.less'

export const ActionStatusTag = ({
  actionStatus,
  isRecommended,
  isRequired,
}: {
  actionStatus: ActionStatusProps
  isRecommended?: boolean
  isRequired?: boolean
}) => {
  let label = actionStatus.label
  let icon = actionStatus.icon

  if (isRecommended) {
    label = 'Recommended'
    icon = <HeartOutlined />
  }

  if (isRequired) {
    label = 'Required'
    icon = <StarOutlined />
  }

  return (
    <Tag
      className={classNames(styles['action-status-tag'], actionStatus.color)}
      icon={icon}
    >
      {label}
    </Tag>
  )
}
