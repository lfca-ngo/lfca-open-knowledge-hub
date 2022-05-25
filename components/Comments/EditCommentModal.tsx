import { Modal } from 'antd'
import React from 'react'

// import { Descendant } from 'slate'
import {
  ActionCommentFragment,
  useUpdateActionCommentMutation,
} from '../../services/lfca-backend'
import { CommentForm } from '../CompleteActionForm/CommentForm'
import { File } from '../FileUpload/FileUpload'
import { createEmptyValue, parseMarkdownToValue } from '../RichTextEditor/utils'

interface EditCommentModalProps {
  editingComment?: ActionCommentFragment
  onClose: () => void
}

export const EditCommentModal = ({
  editingComment,
  onClose,
}: EditCommentModalProps) => {
  // const [attachments, setAttachments] = React.useState<File[] | undefined>(
  //   editingComment?.attachments
  // )
  // const [initialRichTextValue, setInitialRichTextValue] = React.useState<
  //   Descendant[]
  // >(
  //   editingComment
  //     ? parseMarkdownToValue(editingComment.message)
  //     : createEmptyValue()
  // )
  // const [richTextValue, setRichTextValue] = React.useState<Descendant[]>(
  //   editingComment
  //     ? parseMarkdownToValue(editingComment.message)
  //     : createEmptyValue()
  // )
  // React.useEffect(() => {
  //   if (editingComment) {
  //     setAttachments(editingComment.attachments)
  //     setInitialRichTextValue(parseMarkdownToValue(editingComment.message))
  //   }
  // }, [editingComment])

  const [{ fetching }, updateActionComment] = useUpdateActionCommentMutation()

  const onSave = async (message: string, attachments?: File[]) => {
    if (!editingComment) return
    await updateActionComment({
      input: {
        attachments: attachments?.map((a) => ({
          fileName: a.fileName,
          fileSize: a.fileSize,
          mimeType: a.mimeType,
          source: a.source,
        })),
        id: editingComment.id,
        message: message,
      },
    })
    onClose()
  }

  return (
    <Modal
      confirmLoading={fetching}
      destroyOnClose={true}
      footer={null}
      title="Edit comment"
      visible={!!editingComment}
    >
      <CommentForm
        initialValues={{
          attachments: editingComment?.attachments || [],
          message: editingComment
            ? parseMarkdownToValue(editingComment.message)
            : createEmptyValue(),
        }}
        loading={fetching}
        onSubmit={onSave}
      />
    </Modal>
  )
}
