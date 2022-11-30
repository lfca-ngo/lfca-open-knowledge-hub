import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import { ActionCommentFragment } from '../../../services/lfca-backend'
import { CommentItem } from '../CommentItem'
import styles from './styles.module.less'

interface CommentThreadProps {
  comment: ActionCommentFragment
  onEdit: (comment: ActionCommentFragment) => void
  onReply: () => void
}

export const CommentThread = ({
  comment,
  onEdit,
  onReply,
}: CommentThreadProps) => {
  return (
    <div className={styles.commentThread}>
      <CommentItem comment={comment} onEdit={onEdit} />
      {comment.children.map((childComment) => (
        <CommentItem
          comment={childComment}
          isChild={true}
          key={childComment.id}
          onEdit={onEdit}
        />
      ))}

      <div className={styles.actions}>
        <Button icon={<PlusOutlined />} onClick={onReply} size="small">
          Reply
        </Button>
      </div>
    </div>
  )
}
