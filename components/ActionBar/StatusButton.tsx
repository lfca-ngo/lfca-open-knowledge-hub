import {
  AppstoreAddOutlined,
  CalendarOutlined,
  CheckOutlined,
  EllipsisOutlined,
  // PlayCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Dropdown, Input, Menu, message } from 'antd'
import { MenuItemType } from 'antd/lib/menu/hooks/useItems'
import classNames from 'classnames'
import { useState } from 'react'

import {
  CompanyAction,
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
  usePlanCompanyActionMutation,
} from '../../services/lfca-backend'
import { actionHasReviews } from '../../utils'
import { CompleteActionForm } from '../CompleteActionForm'
import styles from './styles.module.less'

interface StatusButtonProps {
  action: CompanyActionListItemFragment
  canExpire?: boolean
}

export const ACTION_STATES: {
  [key: string]: MenuItemType & {
    color?: 'purple' | 'yellow' | 'red' | 'black' | 'green' | 'blue'
  }
} = {
  BACKLOG: {
    color: 'yellow',
    icon: <AppstoreAddOutlined />,
    key: 'BACKLOG',
    label: 'Backlog',
  },
  // PROCEED: {
  //   color: 'blue',
  //   disabled: true,
  //   icon: <PlayCircleOutlined />,
  //   key: 'PROCEED',
  //   label: 'Started',
  // },
  // eslint-disable-next-line sort-keys
  PLANNED: {
    color: 'purple',
    icon: <CalendarOutlined />,
    key: 'PLANNED',
    label: 'Planned',
  },
  // eslint-disable-next-line sort-keys
  COMPLETE: {
    color: 'green',
    icon: <CheckOutlined />,
    key: 'COMPLETE',
    label: 'Complete',
  },
  RENEW: {
    color: 'red',
    icon: <ReloadOutlined />,
    key: 'RENEW',
    label: 'Renew',
  },
}

export const getActionStatus = (
  action?: CompanyAction | CompanyActionListItemFragment
) => {
  if (!action) return ACTION_STATES.BACKLOG

  const isCompleted = !!action.completedAt
  const isPlanned = !!action.plannedAt

  return isCompleted
    ? ACTION_STATES.COMPLETE
    : isPlanned
    ? ACTION_STATES.PLANNED
    : ACTION_STATES.BACKLOG
}

export const StatusButton = ({
  action,
  canExpire = false,
}: StatusButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const actionStatus = getActionStatus(action)

  const [{ fetching: fetchingPlanCompanyAction }, planCompanyAction] =
    usePlanCompanyActionMutation()
  const [{ fetching: fetchingCompleteCompanyAction }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  const handleComplete = async (isCompleted: boolean) => {
    if (!isCompleted) {
      await completeCompanyAction({
        input: {
          actionContentId: action.contentId,
          isCompleted: false,
        },
      })
    } else {
      setIsOpen(true)
    }
  }

  const handlePlan = async () => {
    planCompanyAction({
      input: {
        actionContentId: action.contentId,
        isPlanned: !action.plannedAt,
      },
    }).then(({ data, error }) => {
      if (error) message.error(error.message)
      else {
        if (data?.planCompanyAction?.plannedAt) {
          message.success('Marked as planned')
        } else {
          message.info('Removed from planned actions')
        }
      }
    })
  }

  const handleClick = async ({ key }: { key: string }) => {
    switch (key) {
      case ACTION_STATES.RENEW.key:
      case ACTION_STATES.COMPLETE.key:
        handleComplete(true)
        break
      case ACTION_STATES.PLANNED.key:
        await handlePlan()
        break
      case ACTION_STATES.BACKLOG.key:
        if (action.plannedAt) await handlePlan()
        await handleComplete(false)
        break
      default:
        return
    }
  }

  const menu = (
    <Menu
      items={Object.keys(ACTION_STATES)
        .filter((key) => !(key === ACTION_STATES.RENEW.key && !canExpire))
        .map((key) => ({
          ...ACTION_STATES[key],
          disabled: key === actionStatus.key,
        }))}
      onClick={handleClick}
    />
  )

  return (
    <>
      <Dropdown overlay={menu}>
        <Input.Group
          className={classNames(actionStatus?.color, styles['status-button'])}
          compact
        >
          <Button
            icon={actionStatus.icon}
            loading={fetchingCompleteCompanyAction || fetchingPlanCompanyAction}
            size="large"
            type="primary"
          >
            {actionStatus.label}
          </Button>
          <Button icon={<EllipsisOutlined />} size="large" type="primary" />
        </Input.Group>
      </Dropdown>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
        <CompleteActionForm
          actionContentId={action.contentId}
          onComplete={() => setIsOpen(false)}
          withReviewForm={actionHasReviews(action)}
        />
      </Drawer>
    </>
  )
}
