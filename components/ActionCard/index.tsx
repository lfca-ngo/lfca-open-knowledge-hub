require('./styles.less')

import {
  CheckOutlined,
  LikeOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { LogoGroup } from '../LogoGroup'
import { FAKE_LOGOS } from '../ActionsCarousel'

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
        <Avatar icon={icon} />
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
      <ActionStat
        color="purple"
        count={'821'}
        icon={<CheckOutlined />}
        label="did that"
      />
      <ActionStat
        color="orange"
        count={'121'}
        icon={<LikeOutlined />}
        label="talking about it"
      />
      <ActionStat
        color="green"
        count={'3'}
        icon={<PaperClipOutlined />}
        label="documents"
      />
    </div>
  )
}

export const ActionCard = ({ action, onClick }: { action: any, onClick?: any }) => {
  return (
    <Card className="action-card" hoverable>
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
        <div className="others">
          <LogoGroup data={FAKE_LOGOS} />
        </div>
        <Link href={`/action/${action.actionId}`}>
          <Button onClick={onClick} type="primary">View</Button>
        </Link>
      </div>
    </Card>
  )
}
