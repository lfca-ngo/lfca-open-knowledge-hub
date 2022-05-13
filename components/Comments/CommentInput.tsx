import { Form } from 'antd'
import React from 'react'

import { FileUpload } from '../FileUpload/FileUpload'
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
  const [internalInitialValue, setInternalInitialValue] = React.useState(
    initialRichTextValue || null
  )
  const [attachments, setAttachments] = React.useState(initialAttachments || [])

  React.useEffect(() => {
    setInternalInitialValue(initialRichTextValue)
  }, [initialRichTextValue])

  return (
    <div className="input">
      <div className="form">
        <RichTextEditor
          disabled={disabled}
          initialValue={internalInitialValue}
          onChange={(val: any) => {
            setRichTextValue(val)
            onRichTextValueChange && onRichTextValueChange(val)
          }}
        />
        <Form onValuesChange={(_, all) => console.log(all)}>
          <FileUpload />
        </Form>

        {/* <ImageUpload
          accept=".doc, .docx, .ppt, .pptx, .xlsx, .xls, .txt, .pdf, .zip, .rar, image/*, video/*"
          buttonText="Add file"
          customIcon={
            <Icon className="comments-icon" component={AttachmentIcon} />
          }
          customPreset="zymzhm5w"
          disabled={disabled}
          fileList={attachments}
          listType="text"
          mediaType="raw"
          onFileListChange={setAttachments}
        />
        {onSave && (
          <Button
            disabled={disabled}
            loading={isSaving}
            onClick={() => {
              onSave(
                {
                  richTextValue,
                  attachments,
                },
                () => {
                  setAttachments(initialAttachments || [])
                  // Since the RichTextEditor is a uncontrolled component,
                  // we need to change it's initial value once in order to clear the input
                  setInternalInitialValue("")
                  setInternalInitialValue(initialRichTextValue || null)
                }
              )
            }}
            type="primary"
          >
            Send
          </Button>
        )} */}
      </div>
      <p className="error-message">{errorMsg}</p>
    </div>
  )
}
