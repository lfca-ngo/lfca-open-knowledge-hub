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
  size,
}: {
  count: string
  label: string
  icon: React.ReactNode
  color: string
  size: any
}) => {
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

export const ActionStats = ({ size }: { size?: any }) => {
  return (
    <div className={classNames('action-stats', size)}>
      <LogoGroup data={FAKE_LOGOS} label="did that" size={size} />
      <ActionStat
        color="wine"
        count={'121'}
        icon={<LikeOutlined />}
        label="messages"
        size={size}
      />
      <ActionStat
        color="blue"
        count={'3'}
        icon={<PaperClipOutlined />}
        label="documents"
        size={size}
      />
    </div>
  )
}

export const ActionCard = ({
  action,
  actionText,
  onClick,
}: {
  action: any
  actionText: string
  onClick?: any
}) => {
  return (
    <Card bordered={false} className="action-card" onClick={onClick}>
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
        <Button type="primary">{actionText}</Button>
      </div>
    </Card>
  )
}

// the next/link component allows us to prefetch the action pages
// speeding up the experience for the user, alternatively an onclick
// handler is used to trigger an action
export const ActionCardWrapper = (props: any) => {
  if (props.href) {
    return (
      <Link href={props.href}>
        <a className="action-card-wrapper">
          <ActionCard {...props} />
        </a>
      </Link>
    )
  } else return <ActionCard {...props} />
}
