require('./styles.less')

import {
  CalendarOutlined,
  CarryOutOutlined,
  CheckCircleFilled,
  InfoCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Button, Card, List, Popover, Space, Tooltip } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ActionStats } from '../ActionStats'

const InfoBox = ({
  requirements,
}: {
  requirements: CompanyActionListItemFragment['requirements']
}) => {
  return (
    <Popover
      content={
        <List
          className="info-list-sm"
          dataSource={requirements}
          header={
            <Tooltip
              placement="right"
              title={`You don't need to complete all tips to mark an action as complete`}
            >
              <h4>
                How to
                <QuestionCircleOutlined style={{ marginLeft: '6px' }} />
              </h4>
            </Tooltip>
          }
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
      <InfoCircleOutlined />
    </Popover>
  )
}

export interface ActionCardProps {
  action: CompanyActionListItemFragment
  ctaText?: string
  loading?: boolean
  onCtaClick?: (action: CompanyActionListItemFragment) => void
  onSavePosition?: () => void
  onUnselect?: (action: CompanyActionListItemFragment) => void
  onTogglePlan?: (action: CompanyActionListItemFragment) => void
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
  onTogglePlan,
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
          {action.title}{' '}
          {showInfoBox && <InfoBox requirements={action.requirements} />}
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
          {onTogglePlan && (
            <Tooltip title={`Mark as ${action.plannedAt ? 'un' : ''}planned`}>
              <Button
                ghost={action.plannedAt}
                icon={
                  action.plannedAt ? <CarryOutOutlined /> : <CalendarOutlined />
                }
                onClick={() => onTogglePlan(action)}
              />
            </Tooltip>
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
