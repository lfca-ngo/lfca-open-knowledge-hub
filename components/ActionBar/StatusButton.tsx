import {
  AppstoreAddOutlined,
  CalendarOutlined,
  CheckOutlined,
  EllipsisOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Dropdown, Input, Menu, message } from 'antd'
import { MenuItemType } from 'antd/lib/menu/hooks/useItems'
import { useState } from 'react'

import {
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

const BTN_STATES: { [key: string]: MenuItemType } = {
  BACKLOG: {
    icon: <AppstoreAddOutlined />,
    key: 'BACKLOG',
    label: 'Backlog',
  },
  COMPLETE: {
    icon: <CheckOutlined />,
    key: 'COMPLETE',
    label: 'Complete',
  },
  PLANNED: {
    icon: <CalendarOutlined />,
    key: 'PLANNED',
    label: 'Planned',
  },
  RENEW: {
    icon: <ReloadOutlined />,
    key: 'RENEW',
    label: 'Renew',
  },
}

export const StatusButton = ({
  action,
  canExpire = false,
}: StatusButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const isCompleted = !!action.completedAt
  const isPlanned = !!action.plannedAt

  const actionStatus = isCompleted
    ? BTN_STATES.COMPLETE
    : isPlanned
    ? BTN_STATES.PLANNED
    : BTN_STATES.BACKLOG

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
      case BTN_STATES.RENEW.key:
      case BTN_STATES.COMPLETE.key:
        handleComplete(true)
        break
      case BTN_STATES.PLANNED.key:
        await handlePlan()
        break
      case BTN_STATES.BACKLOG.key:
        await handleComplete(false)
        break
      default:
        return
    }
  }

  const menu = (
    <Menu
      items={Object.keys(BTN_STATES).map((key) => ({
        ...BTN_STATES[key],
        disabled: key === 'RENEW' && !canExpire,
      }))}
      onClick={handleClick}
    />
  )

  return (
    <>
      <Dropdown overlay={menu}>
        <Input.Group className={styles['status-button']} compact>
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
