import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Button, message, Space } from 'antd'

import {
  CompanyActionListItemFragment,
  useCompleteCompanyActionMutation,
  usePlanCompanyActionMutation,
} from '../../services/lfca-backend'

interface ActionsFormProps {
  action?: CompanyActionListItemFragment
  companyId: string
}

export const ActionsForm = ({ action, companyId }: ActionsFormProps) => {
  const [{ fetching: isPlanning }, planCompanyAction] =
    usePlanCompanyActionMutation()
  const [{ fetching: isCompleting }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  if (!action) return <div>No action selected</div>

  const handleComplete = () => {
    completeCompanyAction({
      input: {
        actionContentId: action.contentId,
        companyId: companyId,
        isCompleted: !!!action.completedAt,
      },
    }).then(({ data, error }) => {
      if (error) message.error(error.message)
      else {
        if (data?.completeCompanyAction?.completedAt) {
          message.success('Marked as completed')
        } else {
          message.info('Removed from completed actions')
        }
      }
    })
  }

  const handlePlan = () => {
    planCompanyAction({
      input: {
        actionContentId: action.contentId,
        companyId: companyId,
        isPlanned: !action?.plannedAt,
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
    <div>
      <h2>Edit Action</h2>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          block
          icon={action.completedAt ? <CloseOutlined /> : <CheckOutlined />}
          loading={isCompleting}
          onClick={handleComplete}
          type="primary"
        >
          {action.completedAt ? 'Mark as incomplete' : 'Mark as complete'}
        </Button>
        <Button
          block
          ghost
          icon={action.plannedAt ? <UndoOutlined /> : <CalendarOutlined />}
          loading={isPlanning}
          onClick={handlePlan}
        >
          {action.plannedAt ? 'Mark as unplanned' : 'Mark as planned'}
        </Button>
      </Space>
    </div>
  )
}
