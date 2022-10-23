import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  ReloadOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Dropdown, Menu, message } from 'antd'
import { useState } from 'react'

import {
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
  usePlanCompanyActionMutation,
} from '../../services/lfca-backend'
import { actionHasReviews } from '../../utils'
import { CompleteActionForm } from '../CompleteActionForm'

interface StatusButtonProps {
  action: CompanyActionListItemFragment
  canExpire?: boolean
}

export const StatusButton = ({
  action,
  canExpire = false,
}: StatusButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const isCompleted = !!action.completedAt
  const isPlanned = !!action.plannedAt

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

  const menu = (
    <Menu
      items={[
        {
          key: '0',
          label: 'Backlog',
          onClick: () => handleComplete(false),
        },
        {
          key: '1',
          label: 'Plan',
          onClick: handlePlan,
        },
        {
          key: '2',
          label: 'Complete',
          onClick: () => handleComplete(true),
        },
        {
          disabled: true,
          key: '3',
          label: 'In progress',
        },
      ]}
      // onClick={handleMenuClick}
    />
  )

  return (
    <>
      <Dropdown overlay={menu}>
        <Button block size="large" type="primary">
          Test
        </Button>
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
