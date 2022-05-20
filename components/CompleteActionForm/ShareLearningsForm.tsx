require('./styles.less')

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification, Tag, Tooltip } from 'antd'

import {
  useCompleteCompanyActionMutation,
  useCreateActionCommentMutation,
} from '../../services/lfca-backend'
import { FileUpload } from '../FileUpload/FileUpload'
import { IconSelector } from '../Icons'
import { IconTypes } from '../Icons'

const { TextArea } = Input

const openNotification = () => {
  notification.info({
    description: `The more you share, the more you'll get out of the community.`,
    icon: <IconSelector color="wine" type={IconTypes.heart} />,
    message: `Awesome, Thanks for sharing!`,
    placement: 'top',
  })
}

interface ShareLearningsFormProps {
  actionContentId: string
  onComplete: () => void
}

export const ShareLearningsForm = ({
  actionContentId,
  onComplete,
}: ShareLearningsFormProps) => {
  // TODO: UI for error states
  const [{ fetching: fetchingCompleteAction }, completeCompanyAction] =
    useCompleteCompanyActionMutation()

  const [{ fetching: fetchingCreateActionComment }, createActionComment] =
    useCreateActionCommentMutation()

  const handleFinish = async ({ message }: { message?: string }) => {
    // TODO: add attachments
    if (message) {
      await createActionComment({
        input: {
          actionContentId,
          message,
        },
      })
    }
    await completeCompanyAction({
      input: {
        actionContentId,
        isCompleted: true,
        skipRequirementsCheck: true,
      },
    })
    openNotification()
    onComplete()
  }

  return (
    <Form
      className="share-learnings-form"
      layout="vertical"
      onFinish={handleFinish}
    >
      <Form.Item
        label={
          <Tooltip title="By sharing your learnings, you help others overcome common hurdles more quickly. Think about: What did you struggle with, what went well, what not?">
            Leave a comment about this action <QuestionCircleOutlined />
          </Tooltip>
        }
        name="message"
      >
        <TextArea
          placeholder="The most difficult thing was solving xyz. Luckily we found this overview that really helped us (attached)."
          rows={4}
        />
      </Form.Item>
      <div className="buzzwords">
        <span>Think of:</span> <Tag>Costs</Tag>
        <Tag>Team benefits</Tag>
        <Tag>Hurdles</Tag>
        <Tag>Successes</Tag>
        <Tag>{`How to's`}</Tag>
      </div>
      <Form.Item
        label={
          <Tooltip title="Think about: Research that you did, resources that you found useful">
            Useful documents <QuestionCircleOutlined />
          </Tooltip>
        }
      >
        <FileUpload />
      </Form.Item>
      <Form.Item>
        <Button
          block
          htmlType="submit"
          loading={fetchingCompleteAction || fetchingCreateActionComment}
          type="primary"
        >
          Complete action
        </Button>
      </Form.Item>
    </Form>
  )
}
