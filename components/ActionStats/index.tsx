require('./styles.less')

import { MessageOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Avatar, AvatarProps } from 'antd'
import classNames from 'classnames'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { LogoGroup } from '../LogoGroup'

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
    <div className={classNames('action-stat', color)}>
      <div className="icon">
        <Avatar className={color} icon={icon} shape="square" size={size} />
      </div>
      <div className="label">
        <span className="count">{count}</span> {label}
      </div>
    </div>
  )
}

interface ActionStatsProps {
  commentAttachmentCount: CompanyActionListItemFragment['commentAttachmentCount']
  commentCount: CompanyActionListItemFragment['commentCount']
  companiesCompletedCount: CompanyActionListItemFragment['companiesCompletedCount']
  recentCompaniesCompleted: CompanyActionListItemFragment['recentCompaniesCompleted']
  size?: AvatarProps['size']
}

export const ActionStats = ({
  commentAttachmentCount,
  commentCount,
  companiesCompletedCount,
  recentCompaniesCompleted,
  size,
}: ActionStatsProps) => {
  return (
    <div className={classNames('action-stats', size)}>
      <LogoGroup
        data={recentCompaniesCompleted}
        label={`${companiesCompletedCount} did this`}
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
