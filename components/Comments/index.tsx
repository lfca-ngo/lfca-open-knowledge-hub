import { MessageOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, List, Skeleton } from 'antd'
import { useState } from 'react'

import { useUser } from '../../hooks/user'
import {
  ActionCommentFragment,
  useActionCommentsQuery,
  useDeleteActionCommentMutation,
} from '../../services/lfca-backend'
import { EmptyState } from '../EmptyState'
import { CommentItem } from './CommentItem'
import { CommentModal } from './CommentModal'
import styles from './styles.module.less'

interface CommentsProps {
  actionContentId: string
}

export const Comments = ({ actionContentId }: CommentsProps) => {
  const [visible, setVisible] = useState(false)
  const [editingComment, setEditingComment] = useState<ActionCommentFragment>()
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
            <Button
              block
              icon={<PlusOutlined />}
              key="create"
              onClick={() => {
                setEditingComment(undefined)
                setVisible(true)
              }}
              type="primary"
            >
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
        <>
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
                    setVisible(true)
                  }}
                />
              </List.Item>
            )}
          />
          <Button
            block
            icon={<PlusOutlined />}
            key="create"
            onClick={() => {
              setEditingComment(undefined)
              setVisible(true)
            }}
            type="primary"
          >
            Comment
          </Button>
        </>
      )}
      <CommentModal
        actionContentId={actionContentId}
        editingComment={editingComment}
        onClose={() => {
          setVisible(false)
          setEditingComment(undefined)
        }}
        visible={visible}
      />
    </div>
  )
}
