require('./styles.less')

import { List, Skeleton } from 'antd'
import React from 'react'

import { useActionCommentsQuery } from '../../services/lfca-backend'
// import { convertValueToMarkdown } from '../RichTextEditor/utils'
// import { CommentInput } from './CommentInput'
import { CommentItem } from './CommentItem'
// import { EditCommentModal } from './EditCommentModal'
import { EmptyPlaceholder } from './EmptyPlaceholder'

interface CommentsProps {
  actionContentId: string
}

export const Comments = ({ actionContentId }: CommentsProps) => {
  const [{ data, fetching }] = useActionCommentsQuery({
    pause: !actionContentId,
    variables: {
      input: { actionContentId },
    },
  })

  // TODO: Allow edit/delete for admins
  const isAuthUserAdmin = false

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
            pageSize: 3,
            size: 'small',
          }}
          renderItem={(comment) => (
            <List.Item>
              <CommentItem
                comment={comment}
                isAdmin={isAuthUserAdmin}
                onDelete={() => {
                  // TODO: Implement
                  // onDelete(comment)
                }}
                onEdit={() => {
                  // TODO: Implement
                  // setEditingCommentId(commentId)
                }}
              />
            </List.Item>
          )}
        ></List>
      )}
      {/* <CommentInput
        disabled={isFetching || isUpdating}
        errorMsg={'errorMsg'}
        isSaving={isUpdating}
        onSave={onSave}
      /> */}
      {/* <EditCommentModal
        editingComment={comments[editingCommentId]}
        onCancel={() => setEditingCommentId(null)}
        onSave={onUpdate}
      /> */}
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
