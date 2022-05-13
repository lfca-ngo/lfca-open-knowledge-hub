import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'

// import { parseMarkdownToValue } from '../RichTextEditor/utils'
import { CommentInput } from './CommentInput'

export const EditCommentModal = ({
  editingComment,
  onCancel,
  onSave,
}: {
  editingComment: any
  onCancel: any
  onSave: any
}) => {
  const [attachments, setAttachments] = useState([])
  // const [initialRichTextValue, setInitialRichTextValue] = useState(null)
  const [richTextValue, setRichTextValue] = useState(null)

  useEffect(() => {
    if (editingComment) {
      setAttachments(
        editingComment?.attachments?.map((a: any) => ({
          name: a.name,
          percent: 100,
          size: a.size,
          status: 'done',
          type: a.type,
          uid: `rc-upload-${Math.floor(Math.random() * 1000000000)}`,
        })) || []
      )
      // setInitialRichTextValue(parseMarkdownToValue(editingComment.message))
    }
  }, [editingComment])

  return (
    <Modal
      className="action-details"
      onCancel={onCancel}
      onOk={() => onSave({ attachments, richTextValue })}
      title="Edit comment"
      visible={!!editingComment}
    >
      <div className="action-comments edit-action-comment-modal">
        <CommentInput
          initialRichTextValue={'initialRichTextValue'}
          onRichTextValueChange={setRichTextValue}
        />
      </div>
    </Modal>
  )
}
