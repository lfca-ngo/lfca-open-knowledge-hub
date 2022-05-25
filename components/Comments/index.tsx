require('./styles.less')

import { MessageOutlined, PlusOutlined } from '@ant-design/icons'
import { List, Skeleton, Button } from 'antd'
import React from 'react'

import { useUser } from '../../hooks/user'
import {
  ActionCommentFragment,
  useActionCommentsQuery,
  useDeleteActionCommentMutation,
} from '../../services/lfca-backend'
import { EmptyState } from '../EmptyState'
import { CommentItem } from './CommentItem'
import { EditCommentModal } from './EditCommentModal'

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

  const { isAdmin } = useUser()

  const onDelete = async (comment: ActionCommentFragment) => {
    await deleteActionComment({
      input: {
        id: comment.id,
      },
    })
  }

  return (
    <div className="action-comments">
      {fetching ? (
        <Skeleton active avatar paragraph={{ rows: 2 }} title={false} />
      ) : !data?.actionComments.length ? (
        <EmptyState
          actions={[
            <Button icon={<PlusOutlined />} key="create" type="primary">
              Comment
            </Button>,
          ]}
          alignment="left"
          icon={<MessageOutlined />}
          size="small"
          text="Comment about your experience with this action."
          title="No Messages"
        />
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
        />
      )}
      <EditCommentModal
        editingComment={editingComment}
        onClose={() => setEditingComment(null)}
      />
    </div>
  )
}
