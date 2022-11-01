import { Avatar, Badge, Button, Card, message, Space } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import {
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
} from '../../services/lfca-backend'
import { getActionStatus } from '../ActionBar/StatusButton'
import { ActionStats } from '../ActionStats'
import { ActionCardProps } from '.'
import styles from './styles.module.less'

export const ActionCard = ({
  action,
  mode = 'default',
  onCtaClick,
  onSavePosition,
  renderAsLink = false,
  selectText = 'View',
  unselectText = 'Unselect',
}: ActionCardProps) => {
  const actionStatus = getActionStatus(action)
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