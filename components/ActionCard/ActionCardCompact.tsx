import {
  CheckCircleFilled,
  CheckOutlined,
  CloseOutlined,
  InfoOutlined,
} from '@ant-design/icons'
import { Badge, Button, Card, message, Popover, Space } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'

import {
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
} from '../../services/lfca-backend'
import { ActionStats } from '../ActionStats'
import { ActionCardProps } from '.'
import styles from './styles.module.less'

export const ActionCardCompact = ({
  action,
  mode = 'default',
  onCtaClick,
  onSavePosition,
  onToggleInfo,
  renderAsLink = false,
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
    <Card
      bordered={false}
      className={classNames(styles['action-card-compact'])}
    >
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
          {onToggleInfo && (
            <Popover content="Learn more">
              <Button
                icon={<InfoOutlined />}
                onClick={() => onToggleInfo(action, action.contentId)}
              />
            </Popover>
          )}

          <Popover
            content={`Mark as ${action.completedAt ? 'undone' : 'done'}`}
          >
            <Button
              icon={action.completedAt ? <CloseOutlined /> : <CheckOutlined />}
              loading={isCompleting}
              onClick={handleSelect}
              type={action.completedAt ? 'default' : 'primary'}
            />
          </Popover>
        </Space>
      </div>
    </Card>
  )
}
