require('./styles.less')

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Form, notification, Tag, Tooltip } from 'antd'
import { Descendant } from 'slate'

import {
  useCompleteCompanyActionMutation,
  useCreateActionCommentMutation,
} from '../../services/lfca-backend'
import { CommentInput } from '../Comments/CommentInput'
import { FileUpload } from '../FileUpload/FileUpload'
import { IconSelector } from '../Icons'
import { IconTypes } from '../Icons'
import { convertValueToMarkdown } from '../RichTextEditor/utils'

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

  const handleFinish = async ({ message }: { message?: Descendant[] }) => {
    console.log(message)

    // // TODO: add attachments
    if (message?.length) {
      await createActionComment({
        input: {
          actionContentId,
          message: convertValueToMarkdown(message),
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
        <CommentInput />
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
