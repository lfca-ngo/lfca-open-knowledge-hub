import { MessageOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Avatar, AvatarProps } from 'antd'
import classNames from 'classnames'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { LogoGroup } from '../LogoGroup'
import styles from './styles.module.less'

interface ActionStatProps {
  count: number
  label: string
  icon: AvatarProps['icon']
  color: string
  size: AvatarProps['size']
}

export const ActionStat = ({
  color,
  count,
  icon,
  label,
  size,
}: ActionStatProps) => {
  return (
    <div className={classNames(styles['action-stat'], color)}>
      <div className="icon">
        <Avatar className={color} icon={icon} shape="square" size={size} />
      </div>
      <div className="action-stat-label">
        <span className="count">{count}</span> {label}
      </div>
    </div>
  )
}

interface ActionStatsProps {
  commentAttachmentCount: CompanyActionListItemFragment['commentAttachmentCount']
  commentCount: CompanyActionListItemFragment['commentCount']
  companiesDoingCount: CompanyActionListItemFragment['companiesDoingCount']
  recentCompaniesDoing: CompanyActionListItemFragment['recentCompaniesDoing']

  size?: AvatarProps['size']
}

export const ActionStats = ({
  commentAttachmentCount,
  commentCount,
  companiesDoingCount,
  recentCompaniesDoing,
  size,
}: ActionStatsProps) => {
  return (
    <div className={classNames(styles['action-stats'], size)}>
      <LogoGroup
        data={recentCompaniesDoing}
        label={`${companiesDoingCount} working on this`}
        size={size}
      />
      <ActionStat
        color="wine-inverse"
        count={commentCount}
        icon={<MessageOutlined />}
        label="messages"
        size={size}
      />
      <ActionStat
        color="blue-inverse"
        count={commentAttachmentCount}
        icon={<PaperClipOutlined />}
        label="documents"
        size={size}
      />
    </div>
  )
}
