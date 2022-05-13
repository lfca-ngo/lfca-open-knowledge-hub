import { List, message as notification, Skeleton } from 'antd'
import React, { useState } from 'react'

import { convertValueToMarkdown } from '../RichTextEditor/utils'
import { CommentInput } from './CommentInput'
import { CommentItem } from './CommentItem'
import { EditCommentModal } from './EditCommentModal'
import { EmptyPlaceholder } from './EmptyPlaceholder'

export const Comments = ({
  actionId,
  comments,
}: {
  actionId: string
  comments: any
}) => {
  const [authorIds, setAuthorIds] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)

  if (!actionId) return null

  // test data
  const isUpdating = false
  const isFetching = false
  const authorProfile = {
    firstname: 'Timo',
    picture: '',
  }
  const isAuthUserAdmin = true

  return (
    <div className="action-comments">
      {isFetching ? (
        <Skeleton active avatar paragraph={{ rows: 2 }} title={false} />
      ) : !Object.keys(comments).length ? (
        <EmptyPlaceholder />
      ) : (
        <List
          dataSource={Object.keys(comments)}
          pagination={{
            pageSize: 5,
          }}
          renderItem={(commentId: any) => (
            <CommentItem
              authorProfile={authorProfile}
              comment={comments[commentId]}
              isAdmin={isAuthUserAdmin}
              onDelete={() => onDelete(commentId)}
              onEdit={() => setEditingCommentId(commentId)}
            />
          )}
        ></List>
      )}
      <CommentInput
        disabled={isFetching || isUpdating}
        errorMsg={errorMsg}
        isSaving={isUpdating}
        onSave={onSave}
      />
      {/* <EditCommentModal
        editingComment={comments[editingCommentId]}
        onCancel={() => setEditingCommentId(null)}
        onSave={onUpdate}
      /> */}
    </div>
  )

  function onSave(
    {
      attachments,
      richTextValue,
    }: {
      attachments: any
      richTextValue: string
    },
    successCB: any
  ) {
    const markdownValue = convertValueToMarkdown(richTextValue)
    if (!markdownValue) return

    setErrorMsg('')
    // Create comment object and store in Firebase
    const comment = {
      attachments: attachments.map((a: any) => ({
        name: a.name,
        size: a.size,
        source: a.response.secure_url,
        type: a.type,
      })),
      // author: authUser.uid,
      // createdAt: firebase.serverValue.TIMESTAMP,
      // editedAt: firebase.serverValue.TIMESTAMP,
      message: markdownValue,
    }

    // pushActionComment(actionId, comment, (error) => {
    //   if (error) {
    //     setErrorMsg(error.message)
    //   } else {
    //     successCB && successCB()
    //   }
    // })
  }

  function onUpdate({ attachments, richTextValue }, successCB) {
    const markdownValue = convertValueToMarkdown(richTextValue)
    if (!markdownValue) return

    // updateActionComment(
    //   actionId,
    //   editingCommentId,
    //   attachments,
    //   markdownValue,
    //   (error) => {
    //     if (error) {
    //       notification.error(`Could not update comment: ${error.message}`)
    //     } else {
    //       setEditingCommentId(null)
    //       successCB && successCB()
    //     }
    //   }
    // )
  }

  function onDelete(commentId) {
    // deleteActionComment(actionId, commentId)
  }
}
