import { Button, Tooltip } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

import { ContentfulActionFields } from '../../services/contentful'
import styles from './styles.module.less'

interface ActionCardMiniProps {
  action: ContentfulActionFields
  bordered: boolean
}

export const ActionCardMini = ({
  action,
  bordered = true,
}: ActionCardMiniProps) => {
  return (
    <Link href={`/action/${action.actionId}`}>
      <Tooltip title={action.title}>
        <Button
          className={styles['action-card-mini']}
          type={bordered ? 'default' : 'link'}
        >
          <div className="hero-wrapper">
            <Image
              alt={action.actionId}
              layout="fill"
              objectFit="cover"
              src={action.heroImage.url}
            />
          </div>

          <div className="text">{action.title}</div>
        </Button>
      </Tooltip>
    </Link>
  )
}
