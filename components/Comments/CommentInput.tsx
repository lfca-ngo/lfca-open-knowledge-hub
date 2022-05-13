import { Button, Form } from 'antd'
import React from 'react'

import { FileUploadMulti } from '../FileUpload/FileUploadMulti'
import { RichTextEditor } from '../RichTextEditor'

export const CommentInput = ({
  disabled,
  errorMsg,
  initialAttachments,
  initialRichTextValue,
  isSaving,
  onRichTextValueChange,
  onSave,
}: {
  disabled?: boolean
  errorMsg?: string
  initialAttachments?: any
  initialRichTextValue?: string
  isSaving?: boolean
  onRichTextValueChange?: any
  onSave?: any
}) => {
  const [richTextValue, setRichTextValue] = React.useState(
    initialRichTextValue || null
  )
  // const [internalInitialValue, setInternalInitialValue] = React.useState(
  //   initialRichTextValue || null
  // )
  // const [attachments, setAttachments] = React.useState(initialAttachments || [])

  // React.useEffect(() => {
  //   setInternalInitialValue(initialRichTextValue)
  // }, [initialRichTextValue])

  return (
    <div className="input">
      <div className="form">
        <RichTextEditor
          disabled={disabled}
          initialValue={''}
          onChange={(val: any) => {
            setRichTextValue(val)
            onRichTextValueChange && onRichTextValueChange(val)
          }}
        />
        <Form
          initialValues={{ attachement: initialAttachments }}
          onFinish={(values) => onSave(values, richTextValue)}
        >
          <Form.Item name="attachment">
            <FileUploadMulti />
          </Form.Item>
          <Form.Item name="attachment">
            <Button loading={isSaving}>Save</Button>
          </Form.Item>
        </Form>
      </div>
      <p className="error-message">{errorMsg}</p>
    </div>
  )
}
