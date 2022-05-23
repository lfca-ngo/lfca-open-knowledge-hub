require('./styles.less')

import { LikeOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Avatar, AvatarProps, Button, Card } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

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
        <Avatar icon={icon} size={size} />
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
        color="wine"
        count={commentCount}
        icon={<LikeOutlined />}
        label="messages"
        size={size}
      />
      <ActionStat
        color="blue"
        count={commentAttachmentCount}
        icon={<PaperClipOutlined />}
        label="documents"
        size={size}
      />
    </div>
  )
}

export interface ActionCardProps {
  action: CompanyActionListItemFragment
  ctaText?: string
  onCtaClick?: (action: CompanyActionListItemFragment) => void
  onSavePosition?: () => void
  renderAsLink?: boolean
}

export const ActionCard = ({
  action,
  ctaText = 'View',
  onCtaClick,
  onSavePosition,
}: ActionCardProps) => {
  const handleClick = () => {
    onCtaClick?.(action)
    // since we are using next/link for navigation,
    // we need to manually save the position using a
    // separate handler that is called independently
    onSavePosition?.()
  }

  return (
    <Card bordered={false} className="action-card" onClick={handleClick}>
      <div className="hero">
        <div className="wrapper">
          {action.heroImage?.url ? (
            <Image
              alt={action.title || ''}
              layout="fill"
              objectFit="cover"
              src={action.heroImage.url}
            />
          ) : null}
        </div>
      </div>
      <div className="content">
        <div className="title">
          {action.title}
          <span className="tags"></span>
        </div>
        <ActionStats
          commentAttachmentCount={action.commentAttachmentCount}
          commentCount={action.commentCount}
          companiesCompletedCount={action.companiesCompletedCount}
          recentCompaniesCompleted={action.recentCompaniesCompleted}
        />
      </div>
      <div className="actions">
        <Button type="primary">{ctaText}</Button>
      </div>
    </Card>
  )
}

// the next/link component allows us to prefetch the action pages
// speeding up the experience for the user, alternatively an onclick
// handler is used to trigger an action
export const ActionCardWrapper = (props: ActionCardProps) => {
  if (props.renderAsLink) {
    return (
      <Link href={`/action/${props.action.contentId}`}>
        <a className="action-card-wrapper">
          <ActionCard {...props} />
        </a>
      </Link>
    )
  } else {
    return <ActionCard {...props} />
  }
}
