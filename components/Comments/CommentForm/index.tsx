import { CheckOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Tag, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { Descendant } from 'slate'

import { useUser } from '../../../hooks/user'
import { ActionCommentAttachment } from '../../../services/lfca-backend'
import { File, FileUpload } from '../../FileUpload/FileUpload'
import { CLOUDINARY_PRESETS } from '../../FileUpload/helper'
import { convertValueToMarkdown } from '../../RichTextEditor/utils'
import { RichTextInput } from '../../RichTextInput'
import { UserIdSearchInput } from '../../UserIdSearchInput'
import styles from './styles.module.less'

const { TextArea } = Input

interface CommentFormProps {
  ctaText?: string
  initialValues?: {
    attachments: ActionCommentAttachment[]
    authorId: string
    message: Descendant[]
  }
  isReply?: boolean
  loading?: boolean
  onSubmit: (props: {
    attachments?: File[]
    authorId?: string
    message: string
    notes?: string
  }) => void
  showNotes?: boolean
}

export const CommentForm = ({
  ctaText = 'Submit',
  initialValues,
  isReply = false,
  loading,
  onSubmit,
  showNotes = false,
}: CommentFormProps) => {
  const { isAdmin } = useUser()

  const [notesVisible, setNotesVisible] = useState(false)
  const [form] = Form.useForm()
  // when data is loaded async, populate form
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const handleFinish = async ({
    attachments,
    authorId,
    message,
    notes,
  }: {
    attachments?: File[]
    authorId?: string
    message?: Descendant[]
    notes?: string
  }) => {
    const parsedMessage = message ? convertValueToMarkdown(message) : ''
    onSubmit({
      attachments: attachments,
      authorId,
      message: parsedMessage,
      notes,
    })
  }

  return (
    <Form
      className={styles.commentForm}
      form={form}
      initialValues={initialValues}
      layout="vertical"
      onFinish={handleFinish}
    >
      {!!initialValues && isAdmin ? (
        <Form.Item label="Author" name="authorId">
          <UserIdSearchInput />
        </Form.Item>
      ) : null}

      <Form.Item
        label={
          !isReply && (
            <Tooltip
              placement="left"
              title="By sharing your learnings, you help others overcome common hurdles more quickly. Think about: What did you struggle with, what went well, what not?"
            >
              Leave a comment about this action <QuestionCircleOutlined />
            </Tooltip>
          )
        }
        name="message"
      >
        <RichTextInput placeholder="The most difficult thing was solving xyz. Luckily we found this overview that really helped us (attached)." />
      </Form.Item>
      {!isReply ? (
        <div className={styles.buzzwords}>
          <span>Think of:</span> <Tag>Costs</Tag>
          <Tag>Team benefits</Tag>
          <Tag>Hurdles</Tag>
          <Tag>Successes</Tag>
          <Tag>{`How to's`}</Tag>
        </div>
      ) : null}
      <Form.Item
        label={
          <Tooltip
            placement="left"
            title="Think about: Research that you did, resources that you found useful"
          >
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
          <Tooltip
            placement="left"
            title="This note will be only visible to you. You can save your companies' carbon footprint or other data that you would like to access later on."
          >
            <Checkbox
              checked={notesVisible}
              className="text-black"
              onChange={(e) => setNotesVisible(e.target.checked)}
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
        <Button
          block
          htmlType="submit"
          icon={<CheckOutlined />}
          loading={loading}
          size="large"
          type="primary"
        >
          {ctaText}
        </Button>
      </Form.Item>
    </Form>
  )
}
