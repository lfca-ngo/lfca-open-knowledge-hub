require('./styles.less')

import {
  CheckCircleFilled,
  InfoOutlined,
  LikeOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import { Avatar, AvatarProps, Button, Card, List, Popover, Space } from 'antd'
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
        icon={<LikeOutlined />}
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

export interface ActionCardProps {
  action: CompanyActionListItemFragment
  ctaText?: string
  loading?: boolean
  onCtaClick?: (action: CompanyActionListItemFragment) => void
  onSavePosition?: () => void
  onUnselect?: (action: CompanyActionListItemFragment) => void
  renderAsLink?: boolean
  showInfoBox?: boolean
  unselectText?: string
}

export const ActionCard = ({
  action,
  ctaText = 'View',
  loading = false,
  onCtaClick,
  onSavePosition,
  onUnselect,
  showInfoBox = false,
  unselectText,
}: ActionCardProps) => {
  const handleClick = () => {
    if (action.completedAt) {
      onUnselect?.(action)
    } else {
      onCtaClick?.(action)
      // since we are using next/link for navigation,
      // we need to manually save the position using a
      // separate handler that is called independently
      onSavePosition?.()
    }
  }

  return (
    <Card bordered={false} className="action-card">
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
        <Space>
          {showInfoBox && (
            <Popover
              content={
                <List
                  className="info-list-sm"
                  dataSource={action.requirements}
                  header={<h4>How to</h4>}
                  renderItem={(item) => (
                    <List.Item>
                      <CheckCircleFilled className="yellow" /> {item.title}
                    </List.Item>
                  )}
                  size="small"
                />
              }
              overlayClassName="popover-lg"
              placement="left"
            >
              <Button icon={<InfoOutlined />} shape="circle" size="small" />
            </Popover>
          )}
          <Button
            loading={loading}
            onClick={handleClick}
            type={action.completedAt ? 'default' : 'primary'}
          >
            {action.completedAt ? unselectText : ctaText}
          </Button>
        </Space>
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
        <a className="action-card-wrapper" onClick={props.onSavePosition}>
          <ActionCard {...props} />
        </a>
      </Link>
    )
  } else {
    return <ActionCard {...props} />
  }
}
