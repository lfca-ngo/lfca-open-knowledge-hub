import { Modal } from 'antd'
import React from 'react'
import { Descendant } from 'slate'

import {
  ActionCommentFragment,
  useUpdateActionCommentMutation,
} from '../../services/lfca-backend'
import { File, FileUpload } from '../FileUpload/FileUpload'
import { CLOUDINARY_PRESETS } from '../FileUpload/helper'
import { RichTextEditor } from '../RichTextEditor'
import {
  convertValueToMarkdown,
  createEmptyValue,
  parseMarkdownToValue,
} from '../RichTextEditor/utils'

interface EditCommentModalProps {
  editingComment: ActionCommentFragment | null
  onClose: () => void
}

export const EditCommentModal = ({
  editingComment,
  onClose,
}: EditCommentModalProps) => {
  const [attachments, setAttachments] = React.useState<File[] | undefined>(
    editingComment?.attachments
  )
  const [initialRichTextValue, setInitialRichTextValue] = React.useState<
    Descendant[]
  >(
    editingComment
      ? parseMarkdownToValue(editingComment.message)
      : createEmptyValue()
  )
  const [richTextValue, setRichTextValue] = React.useState<Descendant[]>(
    editingComment
      ? parseMarkdownToValue(editingComment.message)
      : createEmptyValue()
  )

  const [{ fetching }, updateActionComment] = useUpdateActionCommentMutation()

  React.useEffect(() => {
    if (editingComment) {
      setAttachments(editingComment.attachments)
      setInitialRichTextValue(parseMarkdownToValue(editingComment.message))
    }
  }, [editingComment])

  const onSave = async () => {
    if (!editingComment) return
    const convertedMessage = convertValueToMarkdown(richTextValue)
    await updateActionComment({
      input: {
        attachments: attachments?.map((a) => ({
          fileName: a.fileName,
          fileSize: a.fileSize,
          mimeType: a.mimeType,
          source: a.source,
        })),
        id: editingComment.id,
        message: convertedMessage,
      },
    })
    onClose()
  }

  return (
    <Modal
      confirmLoading={fetching}
      destroyOnClose={true}
      onCancel={onClose}
      onOk={onSave}
      title="Edit comment"
      visible={!!editingComment}
    >
      <div className="action-comments edit-action-comment-modal">
        <RichTextEditor
          initialValue={initialRichTextValue}
          onChange={setRichTextValue}
        />
        <FileUpload
          accept=".doc, .docx, .ppt, .pptx, .xlsx, .xls, .txt, .pdf, .zip, .rar, image/*, video/*"
          customPreset={CLOUDINARY_PRESETS.commentAttachments}
          maxFiles={3}
          onChange={setAttachments}
          value={attachments}
        />
      </div>
    </Modal>
  )
}
