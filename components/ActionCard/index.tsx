import { CheckCircleFilled } from '@ant-design/icons'
import { Badge, Button, Card, message, Space } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import {
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
} from '../../services/lfca-backend'
import { ActionStats } from '../ActionStats'
import styles from './styles.module.less'

export interface ActionCardProps {
  action: CompanyActionListItemFragment
  selectText?: string
  onCtaClick?: (action: CompanyActionListItemFragment) => void
  onSavePosition?: () => void
  renderAsLink?: boolean
  mode?: 'default' | 'compact'
  unselectText?: string
}

export const ActionCard = ({
  action,
  mode = 'default',
  onCtaClick,
  onSavePosition,
  renderAsLink = false,
  selectText = 'View',
  unselectText = 'Unselect',
}: ActionCardProps) => {
  const [{ fetching: isCompleting }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  const handleUnselect = (action: CompanyActionListItemFragment) => {
    completeCompanyAction({
      input: {
        actionContentId: action.contentId,
        isCompleted: false,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Marked action as incomplete')
    })
  }

  const handleSelect = () => {
    if (!renderAsLink && action.completedAt) {
      handleUnselect(action)
    } else {
      // the card can be either used in the list to navigate
      // to a detail page > renderAsLink = true or in the
      // onboarding to trigger direct actions
      onCtaClick?.(action)
      // since we are using next/link for navigation,
      // we need to manually save the position using a
      // separate handler that is called independently
      onSavePosition?.()
    }
  }

  return (
    <Card bordered={false} className={classNames(styles['action-card'], mode)}>
      <div className="hero">
        <Badge
          count={
            action.completedAt ? (
              <CheckCircleFilled className="success" />
            ) : null
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
          <Button
            loading={isCompleting}
            onClick={handleSelect}
            type={action.completedAt ? 'default' : 'primary'}
          >
            {action.completedAt ? unselectText : selectText}
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
        <a
          className={styles['action-card-wrapper']}
          onClick={props.onSavePosition}
        >
          <ActionCard {...props} />
        </a>
      </Link>
    )
  } else {
    return <ActionCard {...props} />
  }
}
