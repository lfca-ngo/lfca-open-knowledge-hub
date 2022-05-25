import { Modal } from 'antd'
import React from 'react'

import {
  ActionCommentFragment,
  useCreateActionCommentMutation,
  useUpdateActionCommentMutation,
} from '../../services/lfca-backend'
import { CommentForm } from '../CompleteActionForm/CommentForm'
import { File } from '../FileUpload/FileUpload'
import { createEmptyValue, parseMarkdownToValue } from '../RichTextEditor/utils'

interface CommentModalProps {
  actionContentId: string
  editingComment?: ActionCommentFragment
  onClose: () => void
  visible: boolean
}

export const CommentModal = ({
  actionContentId,
  editingComment,
  onClose,
  visible,
}: CommentModalProps) => {
  const [{ fetching: updatingComment }, updateActionComment] =
    useUpdateActionCommentMutation()
  const [{ fetching: creatingComment }, createActionComment] =
    useCreateActionCommentMutation()

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

  const onCreate = async (message: string, attachments?: File[]) => {
    await createActionComment({
      input: {
        actionContentId,
        attachments: attachments?.map((a) => ({
          fileName: a.fileName,
          fileSize: a.fileSize,
          mimeType: a.mimeType,
          source: a.source,
        })),
        message: message,
      },
    })
    onClose()
  }

  return (
    <Modal
      confirmLoading={creatingComment}
      destroyOnClose={true}
      footer={null}
      onCancel={onClose}
      title="Edit comment"
      visible={visible}
    >
      <CommentForm
        initialValues={
          editingComment && {
            attachments: editingComment?.attachments || [],
            message: editingComment
              ? parseMarkdownToValue(editingComment.message)
              : createEmptyValue(),
          }
        }
        loading={creatingComment || updatingComment}
        onSubmit={editingComment ? onSave : onCreate}
      />
    </Modal>
  )
}
