require('./styles.less')

import { LikeOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Avatar, Button, Card } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { FAKE_LOGOS } from '../ActionsCarousel'
import { LogoGroup } from '../LogoGroup'

export const ActionStat = ({
  color,
  count,
  icon,
  label,
}: {
  count: string
  label: string
  icon: React.ReactNode
  color: string
}) => {
  return (
    <div className={classNames('action-stat', color)}>
      <div className="icon">
        <Avatar icon={icon} size="small" />
      </div>
      <div className="label">
        <span className="count">{count}</span> {label}
      </div>
    </div>
  )
}

export const ActionStats = () => {
  return (
    <div className="action-stats">
      <LogoGroup data={FAKE_LOGOS} label="did that" size="small" />
      <ActionStat
        color="wine"
        count={'121'}
        icon={<LikeOutlined />}
        label="talking about it"
      />
      <ActionStat
        color="blue"
        count={'3'}
        icon={<PaperClipOutlined />}
        label="documents"
      />
    </div>
  )
}

export const ActionCard = ({
  action,
  onClick,
}: {
  action: any
  onClick?: any
}) => {
  return (
    <Card bordered={false} className="action-card">
      <div className="hero">
        <div className="wrapper">
          <Image layout="fill" objectFit="cover" src={action.heroImage.url} />
        </div>
      </div>
      <div className="content">
        <div className="title">
          {action.title}
          <span className="tags"></span>
        </div>
        <ActionStats />
      </div>
      <div className="actions">
        <Link href={`/action/${action.actionId}`}>
          <Button onClick={onClick} type="primary">
            View
          </Button>
        </Link>
      </div>
    </Card>
  )
}
