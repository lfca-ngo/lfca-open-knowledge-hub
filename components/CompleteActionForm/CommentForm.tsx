require('./styles.less')

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Form, Tag, Tooltip } from 'antd'
import { useEffect } from 'react'
import { Descendant } from 'slate'

import { ActionCommentAttachment } from '../../services/lfca-backend'
import { CommentInput } from '../Comments/CommentInput'
import { File, FileUpload } from '../FileUpload/FileUpload'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { convertValueToMarkdown } from '../RichTextEditor/utils'

interface ShareLearningsFormProps {
  initialValues?: {
    attachments: ActionCommentAttachment[]
    message: Descendant[]
  }
  loading?: boolean
  onSubmit: (message: string, attachments?: File[]) => void
}

export const CommentForm = ({
  initialValues,
  loading,
  onSubmit,
}: ShareLearningsFormProps) => {
  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const handleFinish = async ({
    attachments,
    message,
  }: {
    attachments?: File[]
    message?: Descendant[]
  }) => {
    if (attachments?.length || message) {
      const parsedMessage = message ? convertValueToMarkdown(message) : ''
      onSubmit(parsedMessage, attachments)
    }
  }

  return (
    <Form
      className="share-learnings-form"
      form={form}
      initialValues={initialValues}
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
        <Button block htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
