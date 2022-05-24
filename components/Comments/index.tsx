require('./styles.less')

import { List, Skeleton } from 'antd'
import React from 'react'

import { useUser } from '../../hooks/user'
import {
  ActionCommentFragment,
  UpdateActionCommentInput,
  useActionCommentsQuery,
  useDeleteActionCommentMutation,
  useUpdateActionCommentMutation,
} from '../../services/lfca-backend'
// import { convertValueToMarkdown } from '../RichTextEditor/utils'
import { CommentItem } from './CommentItem'
import { EditCommentModal } from './EditCommentModal'
import { EmptyPlaceholder } from './EmptyPlaceholder'

interface CommentsProps {
  actionContentId: string
}

export const Comments = ({ actionContentId }: CommentsProps) => {
  const [editingComment, setEditingComment] =
    React.useState<ActionCommentFragment | null>(null)
  const [{ data, fetching }] = useActionCommentsQuery({
    pause: !actionContentId,
    variables: {
      input: { actionContentId },
    },
  })

  const [, deleteActionComment] = useDeleteActionCommentMutation()
  const [, updateActionComment] = useUpdateActionCommentMutation()

  const { isAdmin } = useUser()

  const onDelete = async (comment: ActionCommentFragment) => {
    await deleteActionComment({
      input: {
        id: comment.id,
      },
    })
  }

  const onUpdate = async (input: UpdateActionCommentInput) => {
    await updateActionComment({
      input,
    })
  }

  return (
    <div className="action-comments">
      {fetching ? (
        <Skeleton active avatar paragraph={{ rows: 2 }} title={false} />
      ) : !data?.actionComments.length ? (
        <EmptyPlaceholder />
      ) : (
        <List
          className="no-padding"
          dataSource={data?.actionComments}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 2,
            size: 'small',
          }}
          renderItem={(comment) => (
            <List.Item>
              <CommentItem
                comment={comment}
                isAdmin={isAdmin}
                onDelete={() => onDelete(comment)}
                onEdit={() => {
                  setEditingComment(comment)
                }}
              />
            </List.Item>
          )}
        ></List>
      )}
      <EditCommentModal
        editingComment={editingComment}
        onClose={() => setEditingComment(null)}
      />
    </div>
  )

  // function onSave() {
  // {
  //   attachments,
  //   richTextValue,
  // }: {
  //   attachments: any
  //   richTextValue: string
  // },
  // successCB: any
  // const markdownValue = convertValueToMarkdown(richTextValue)
  // if (!markdownValue) return
  // setErrorMsg('')
  // // Create comment object and store in Firebase
  // const comment = {
  //   attachments: attachments.map((a: any) => ({
  //     name: a.name,
  //     size: a.size,
  //     source: a.response.secure_url,
  //     type: a.type,
  //   })),
  //   author: authUser.uid,
  //   createdAt: firebase.serverValue.TIMESTAMP,
  //   editedAt: firebase.serverValue.TIMESTAMP,
  //   message: markdownValue,
  // }
  // pushActionComment(actionId, comment, (error) => {
  //   if (error) {
  //     setErrorMsg(error.message)
  //   } else {
  //     successCB && successCB()
  //   }
  // })
  // }

  // function onUpdate({ attachments, richTextValue }, successCB) {
  //   const markdownValue = convertValueToMarkdown(richTextValue)
  //   if (!markdownValue) return

  //   // updateActionComment(
  //   //   actionId,
  //   //   editingCommentId,
  //   //   attachments,
  //   //   markdownValue,
  //   //   (error) => {
  //   //     if (error) {
  //   //       notification.error(`Could not update comment: ${error.message}`)
  //   //     } else {
  //   //       setEditingCommentId(null)
  //   //       successCB && successCB()
  //   //     }
  //   //   }
  //   // )
  // }

  // function onDelete(commentId) {
  //   // deleteActionComment(actionId, commentId)
  // }
}
