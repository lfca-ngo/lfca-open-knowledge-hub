require('./styles.less')

import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  ReloadOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Button, Drawer, message, Space } from 'antd'
import React, { useState } from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import {
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
  usePlanCompanyActionMutation,
} from '../../services/lfca-backend'
import { actionHasReviews } from '../../utils'
import { CompleteActionForm } from '../CompleteActionForm'
import { PaywallPopover } from '../PayWall/PaywallPopover'

interface ActionBarProps {
  action: CompanyActionListItemFragment
  actionDetails: ContentfulActionFields
}

export const ActionBar = ({ action, actionDetails }: ActionBarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const isCompleted = !!action.completedAt
  const isPlanned = !!action.plannedAt
  const canExpire = !!actionDetails.expiresAfterDays

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

  return (
    <div className="actions-bar">
      <Space direction="vertical" style={{ width: '100%' }}>
        {canExpire && isCompleted ? (
          <Button
            block
            icon={<ReloadOutlined />}
            loading={fetchingCompleteCompanyAction}
            onClick={() => handleComplete(true)}
            size="large"
            type="primary"
          >
            Renew
          </Button>
        ) : null}
        <Button
          block
          ghost={isCompleted}
          icon={isCompleted ? <CloseOutlined /> : <CheckOutlined />}
          loading={fetchingCompleteCompanyAction}
          onClick={() => handleComplete(!isCompleted)}
          size="large"
          type={isCompleted ? 'default' : 'primary'}
        >
          {isCompleted ? 'Mark as incomplete' : 'Mark as done'}
        </Button>
        {!isCompleted && (
          <PaywallPopover>
            <Button
              block
              ghost
              icon={isPlanned ? <UndoOutlined /> : <CalendarOutlined />}
              loading={fetchingPlanCompanyAction}
              onClick={handlePlan}
              size="large"
            >
              {isPlanned ? 'Mark as unplanned' : 'Mark as planned'}
            </Button>
          </PaywallPopover>
        )}
      </Space>

      <Drawer
        className="drawer-md"
        destroyOnClose
        onClose={() => setIsOpen(false)}
        visible={isOpen}
      >
        <CompleteActionForm
          actionContentId={action.contentId}
          onComplete={() => setIsOpen(false)}
          withReviewForm={actionHasReviews(action)}
        />
      </Drawer>
    </div>
  )
}
