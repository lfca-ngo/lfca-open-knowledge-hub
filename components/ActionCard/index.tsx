import {
  CalendarOutlined,
  CarryOutOutlined,
  CheckCircleFilled,
  InfoCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Button,
  Card,
  List,
  message,
  Popover,
  Space,
  Tooltip,
} from 'antd'
import Image from 'next/image'
import Link from 'next/link'

import {
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
  usePlanCompanyActionMutation,
} from '../../services/lfca-backend'
import { ActionStats } from '../ActionStats'
import styles from './styles.module.less'

const InfoBox = ({
  requirements,
}: {
  requirements: CompanyActionListItemFragment['requirements']
}) => {
  return (
    <Popover
      content={
        <List
          className="info-list-sm"
          dataSource={requirements}
          header={
            <Tooltip
              placement="right"
              title={`You don't need to complete all tips to mark an action as complete`}
            >
              <h4>
                How to
                <QuestionCircleOutlined style={{ marginLeft: '6px' }} />
              </h4>
            </Tooltip>
          }
          renderItem={(item) => (
            <List.Item>
              <CheckCircleFilled className="yellow" /> {item.title}
            </List.Item>
          )}
          size="small"
        />
      }
      overlayClassName="popover-lg"
      placement="left"
    >
      <InfoCircleOutlined />
    </Popover>
  )
}

export interface ActionCardProps {
  action: CompanyActionListItemFragment
  selectText?: string
  onCtaClick?: (action: CompanyActionListItemFragment) => void
  onSavePosition?: () => void
  renderAsLink?: boolean
  showInfoBox?: boolean
  unselectText?: string
}

export const ActionCard = ({
  action,
  onCtaClick,
  onSavePosition,
  renderAsLink = false,
  selectText = 'View',
  showInfoBox = false,
  unselectText = 'Unselect',
}: ActionCardProps) => {
  const [{ fetching: isCompleting }, completeCompanyAction] =
    useCompleteCompanyActionMutation()
  const [{ fetching: isPlanning }, planCompanyAction] =
    usePlanCompanyActionMutation()

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

  const handleTogglePlan = (action: CompanyActionListItemFragment) => {
    planCompanyAction({
      input: {
        actionContentId: action.contentId,
        isPlanned: !!!action.plannedAt,
      },
    }).then(({ data, error }) => {
      if (error) message.error(error.message)
      else
        message.success(
          `Marked action as ${
            data?.planCompanyAction.plannedAt ? 'planned' : 'unplanned'
          }`
        )
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
    <Card bordered={false} className="action-card">
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
        <div className="title">
          {action.title}{' '}
          {showInfoBox && <InfoBox requirements={action.requirements} />}
          <span className="tags"></span>
        </div>
        <ActionStats
          commentAttachmentCount={action.commentAttachmentCount}
          commentCount={action.commentCount}
          companiesDoingCount={action.companiesDoingCount}
          recentCompaniesDoing={action.recentCompaniesDoing}
        />
      </div>
      <div className="actions">
        <Space>
          {!renderAsLink && !action.completedAt && (
            <Tooltip title={`Mark as ${action.plannedAt ? 'un' : ''}planned`}>
              <Button
                ghost={action.plannedAt}
                icon={
                  action.plannedAt ? <CarryOutOutlined /> : <CalendarOutlined />
                }
                loading={isPlanning}
                onClick={() => handleTogglePlan(action)}
              />
            </Tooltip>
          )}

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
        <a className="action-card-wrapper" onClick={props.onSavePosition}>
          <ActionCard {...props} />
        </a>
      </Link>
    )
  } else {
    return <ActionCard {...props} />
  }
}
