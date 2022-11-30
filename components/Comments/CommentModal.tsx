import { Modal } from 'antd'
import React from 'react'

import {
  ActionCommentFragment,
  useCreateActionCommentMutation,
  useUpdateActionCommentMutation,
} from '../../services/lfca-backend'
import { File } from '../FileUpload/FileUpload'
import { createEmptyValue, parseMarkdownToValue } from '../RichTextEditor/utils'
import { CommentForm } from './CommentForm'

interface CommentModalProps {
  actionContentId: string
  editingComment?: ActionCommentFragment
  onClose: () => void
  parentActionCommentId?: string
  visible: boolean
}

export const CommentModal = ({
  actionContentId,
  editingComment,
  onClose,
  parentActionCommentId,
  visible,
}: CommentModalProps) => {
  const [{ fetching: updatingComment }, updateActionComment] =
    useUpdateActionCommentMutation()
  const [{ fetching: creatingComment }, createActionComment] =
    useCreateActionCommentMutation()

  const onSave = async ({
    attachments,
    authorId,
    message,
  }: {
    attachments?: File[]
    authorId?: string
    message: string
  }) => {
    if (!editingComment) return
    await updateActionComment({
      input: {
        actionCommentId: editingComment.id,
        attachments: attachments?.map((a) => ({
          fileName: a.fileName,
          fileSize: a.fileSize,
          mimeType: a.mimeType,
          source: a.source,
        })),
        authorId,
        message: message,
      },
    })
    onClose()
  }

  const onCreate = async ({
    attachments,
    message,
  }: {
    message: string
    attachments?: File[]
  }) => {
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
        parentActionCommentId,
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
      open={visible}
      title={
        parentActionCommentId
          ? 'Reply to comment'
          : `${editingComment ? 'Edit' : 'Create'} comment`
      }
    >
      <CommentForm
        initialValues={
          editingComment && {
            attachments: editingComment?.attachments || [],
            authorId: editingComment.author?.id || '',
            message: editingComment
              ? parseMarkdownToValue(editingComment.message)
              : createEmptyValue(),
          }
        }
        isReply={!!parentActionCommentId}
        loading={creatingComment || updatingComment}
        onSubmit={editingComment ? onSave : onCreate}
      />
    </Modal>
  )
}
