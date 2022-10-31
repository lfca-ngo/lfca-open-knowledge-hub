import { InfoCircleOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Card, Popover, Space } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import { getActionStatus } from '../ActionBar/StatusButton'
import { ActionStats } from '../ActionStats'
import { ActionCardProps } from '.'
import styles from './styles.module.less'

export const ActionCardCompact = ({
  action,
  mode = 'default',
  onToggleInfo,
}: ActionCardProps) => {
  const actionStatus = getActionStatus(action)

  return (
    <Card
      bordered={false}
      className={classNames(styles['action-card-compact'])}
    >
      <div className="hero">
        <Badge
          count={
            actionStatus.key === 'BACKLOG' ? null : (
              <Avatar
                className={actionStatus.color}
                icon={actionStatus.icon}
                shape="square"
                size="small"
              />
            )
          }
          offset={[-6, 6]}
        >
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
        </Badge>
      </div>
      <div className="content">
        <div className="title">{action.title}</div>
        <ActionStats
          commentAttachmentCount={action.commentAttachmentCount}
          commentCount={action.commentCount}
          companiesDoingCount={action.companiesDoingCount}
          mode={mode}
          recentCompaniesDoing={action.recentCompaniesDoing}
        />
      </div>
      <div className="actions">
        <Space>
          {onToggleInfo && (
            <Popover content="View details and change action status">
              <Button
                icon={<InfoCircleOutlined />}
                onClick={() => onToggleInfo(action, action.contentId)}
                type="primary"
              >
                Details
              </Button>
            </Popover>
          )}
        </Space>
      </div>
    </Card>
  )
}
