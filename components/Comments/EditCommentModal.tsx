import { Modal } from 'antd'
import React from 'react'
import { Descendant } from 'slate'

import {
  ActionCommentFragment,
  UpdateActionCommentInput,
  useUpdateActionCommentMutation,
} from '../../services/lfca-backend'
import { RichTextEditor } from '../RichTextEditor'
import {
  convertValueToMarkdown,
  createEmptyValue,
  parseMarkdownToValue,
} from '../RichTextEditor/utils'
import { CommentInput } from './CommentInput'

interface EditCommentModalProps {
  editingComment: ActionCommentFragment | null
  onClose: () => void
}

export const EditCommentModal = ({
  editingComment,
  onClose,
}: EditCommentModalProps) => {
  // const [attachments, setAttachments] = useState([])
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
      // setAttachments(
      //   editingComment?.attachments?.map((a: any) => ({
      //     name: a.name,
      //     percent: 100,
      //     size: a.size,
      //     status: 'done',
      //     type: a.type,
      //     uid: `rc-upload-${Math.floor(Math.random() * 1000000000)}`,
      //   })) || []
      // )
      setInitialRichTextValue(parseMarkdownToValue(editingComment.message))
    }
  }, [editingComment])

  const onSave = async () => {
    if (!editingComment) return
    const convertedMessage = convertValueToMarkdown(richTextValue)
    await updateActionComment({
      input: {
        id: editingComment.id,
        message: convertedMessage,
      },
    })
    onClose()
  }

  return (
    <Modal
      confirmLoading={fetching}
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
      </div>
    </Modal>
  )
}
