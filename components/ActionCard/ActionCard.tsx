import { Button, Card, Space } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import { ActionStats } from '../ActionStats'
import { ActionCardProps } from '.'
import styles from './styles.module.less'

export const ActionCard = ({
  action,
  mode = 'default',
  onCtaClick,
  onSavePosition,
  selectText = 'View',
}: ActionCardProps) => {
  const handleSelect = () => {
    onSavePosition?.()
    onCtaClick?.(action)
  }

  return (
    <Card bordered={false} className={classNames(styles['action-card'], mode)}>
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
        <div className="title">{action.title}</div>
        <ActionStats
          commentAttachmentCount={0}
          commentCount={0}
          companiesDoingCount={0}
          mode={mode}
          recentCompaniesDoing={[]}
        />
      </div>
      <div className="actions">
        <Space>
          <Button onClick={handleSelect} type={'primary'}>
            {selectText}
          </Button>
        </Space>
      </div>
    </Card>
  )
}
