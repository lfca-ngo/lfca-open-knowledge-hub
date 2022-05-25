require('./styles.less')

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Form, Tag, Tooltip } from 'antd'
import { Descendant } from 'slate'

import { useCreateActionCommentMutation } from '../../services/lfca-backend'
import { CommentInput } from '../Comments/CommentInput'
import { File, FileUpload } from '../FileUpload/FileUpload'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { convertValueToMarkdown } from '../RichTextEditor/utils'

interface ShareLearningsFormProps {
  actionContentId: string
  isLoading?: boolean
  onComplete: () => void
}

export const CreateCommentForm = ({
  actionContentId,
  isLoading,
  onComplete,
}: ShareLearningsFormProps) => {
  const [{ fetching: fetchingCreateActionComment }, createActionComment] =
    useCreateActionCommentMutation()

  const handleFinish = async ({
    attachments,
    message,
  }: {
    attachments?: File[]
    message?: Descendant[]
  }) => {
    if (attachments?.length || message) {
      await createActionComment({
        input: {
          actionContentId,
          attachments: attachments?.map((a) => ({
            fileName: a.fileName,
            fileSize: a.fileSize,
            mimeType: a.mimeType,
            source: a.source,
          })),
          message: message ? convertValueToMarkdown(message) : '',
        },
      })
    }

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
        name="attachments"
      >
        <FileUpload
          accept=".doc, .docx, .ppt, .pptx, .xlsx, .xls, .txt, .pdf, .zip, .rar, image/*, video/*"
          customPreset={CLOUDINARY_PRESETS.commentAttachments}
          maxFiles={3}
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          htmlType="submit"
          loading={isLoading || fetchingCreateActionComment}
          type="primary"
        >
          Complete action
        </Button>
      </Form.Item>
    </Form>
  )
}
