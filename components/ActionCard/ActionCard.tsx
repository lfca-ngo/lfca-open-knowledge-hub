import { Button, Card, Space, Tag } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

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
        <div className="tags">
          {action.tags.map((t) => (
            <Tag color="blue" key={t.categoryId}>
              {t.name}
            </Tag>
          ))}
        </div>
        <div className="actions">
          <Space>
            <Button onClick={handleSelect} type={'primary'}>
              {selectText}
            </Button>
          </Space>
        </div>
      </div>
    </Card>
  )
}
