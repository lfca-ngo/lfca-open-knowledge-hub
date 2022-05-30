require('./styles.less')

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Tag, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { Descendant } from 'slate'

import { ActionCommentAttachment } from '../../services/lfca-backend'
import { CommentInput } from '../Comments/CommentInput'
import { File, FileUpload } from '../FileUpload/FileUpload'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { convertValueToMarkdown } from '../RichTextEditor/utils'

const { TextArea } = Input

interface ShareLearningsFormProps {
  initialValues?: {
    attachments: ActionCommentAttachment[]
    message: Descendant[]
  }
  loading?: boolean
  onSubmit: (message: string, attachments?: File[], notes?: string) => void
  showNotes?: boolean
}

export const CommentForm = ({
  initialValues,
  loading,
  onSubmit,
  showNotes = false,
}: ShareLearningsFormProps) => {
  const [notesVisible, setNotesVisible] = useState(false)
  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const handleFinish = async ({
    attachments,
    message,
    notes,
  }: {
    attachments?: File[]
    message?: Descendant[]
    notes?: string
  }) => {
    if (attachments?.length || message) {
      const parsedMessage = message ? convertValueToMarkdown(message) : ''
      onSubmit(parsedMessage, attachments, notes)
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
      {showNotes && (
        <Form.Item>
          <Tooltip title="This note will be only visible to you. You can save your companies' carbon footprint or other data that you would like to access later on.">
            <Checkbox
              className="text-black"
              onChange={(e) => setNotesVisible(e.target.checked)}
              value={notesVisible}
            >
              Add a private note <QuestionCircleOutlined />{' '}
            </Checkbox>
          </Tooltip>
        </Form.Item>
      )}

      {notesVisible && (
        <Form.Item name="notes">
          <TextArea
            autoSize={{ maxRows: 6, minRows: 3 }}
            placeholder="Private notes (e.g. your company's carbon footprint)"
          />
        </Form.Item>
      )}

      <Form.Item>
        <Button block htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
