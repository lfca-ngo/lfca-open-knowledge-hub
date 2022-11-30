import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Popconfirm, Popover, Space } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { useUser } from '../../../hooks/user'
import {
  ActionCommentFragment,
  useDeleteActionCommentMutation,
} from '../../../services/lfca-backend'
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  toReadibleDate,
} from '../../../utils'
import { AttachmentButton } from '../../AttachmentsList/AttachmentButton'
import { MarkdownContent } from '../../MarkdownContent'
import { ShowMore } from '../../ShowMore'
import { CommentAuthor } from '../CommentAuthor'
import styles from './styles.module.less'

interface CommentItemProps {
  comment: Omit<ActionCommentFragment, 'children'>
  isChild?: boolean
  onEdit: (comment: ActionCommentFragment) => void
}

const VISIBLE_ROWS = 7

export const CommentItem = ({ comment, isChild, onEdit }: CommentItemProps) => {
  const [, deleteActionComment] = useDeleteActionCommentMutation()

  const onDelete = async () => {
    await deleteActionComment({
      input: {
        actionCommentId: comment.id,
      },
    })
  }

  const { isAdmin } = useUser()

  return (
    <div className={styles.commentItem}>
      {isChild ? (
        <CommentAuthor
          author={comment.author ?? undefined}
          className={styles.childCommentAuthor}
        />
      ) : null}
      <div
        className={classNames({
          [styles.body]: true,
          [styles.childComment]: isChild,
        })}
      >
        <p className={styles.time}>{toReadibleDate(comment.createdAt)}</p>

        {isAdmin && (
          <Popover
            className={styles.adminActions}
            content={
              <Space>
                <Popconfirm
                  cancelText="No"
                  okText="Yes"
                  onConfirm={onDelete}
                  title="Are you sure to delete this comment?"
                >
                  <Button icon={<DeleteOutlined />} size="small" />
                </Popconfirm>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => onEdit(comment as ActionCommentFragment)}
                  size="small"
                />
              </Space>
            }
            placement="left"
          >
            <Button icon={<SettingOutlined />} size="small" />
          </Popover>
        )}

        <ShowMore
          blurColor="#f9f9f9"
          buttonProps={{ size: 'small', type: 'link' }}
          className={styles.showMoreContent}
          maskMode="blur"
          maxHeight={DEFAULT_FONT_SIZE * DEFAULT_LINE_HEIGHT * VISIBLE_ROWS}
          text={<MarkdownContent content={comment.message} />}
        />
        <div className={styles.attachments}>
          {comment.attachments?.map((attachment, i) => (
            <AttachmentButton attachment={attachment} key={`att-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
