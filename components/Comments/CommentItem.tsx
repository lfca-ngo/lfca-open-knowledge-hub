import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Popconfirm, Popover, Space } from 'antd'
import React from 'react'

import { ActionCommentFragment } from '../../services/lfca-backend'
import { toReadibleDate } from '../../utils'
import { AttachmentButton } from '../AttachmentsList/AttachmentButton'
import { MarkdownContent } from '../MarkdownContent'
import { ShowMore } from '../ShowMore'
import { UserAvatar } from '../UserAvatar'

interface CommentItemProps {
  comment: ActionCommentFragment
  isAdmin: boolean
  onDelete: () => void
  onEdit: () => void
}

export const CommentItem = ({
  comment,
  isAdmin,
  onDelete,
  onEdit,
}: CommentItemProps) => {
  const readibleDate = toReadibleDate(comment.createdAt)

  return (
    <div className="comment-item">
      <div className="author">
        <UserAvatar user={comment.author} />
        {comment.author?.firstName ? (
          <span className="name">
            {comment.author.firstName}{' '}
            <span className="time">• {readibleDate}</span>
            {isAdmin && (
              <Popover
                content={
                  <Space className="admin-actions">
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
                      onClick={onEdit}
                      size="small"
                    />
                  </Space>
                }
                placement="left"
              >
                <Button
                  className="admin-btn"
                  icon={<SettingOutlined />}
                  size="small"
                />
              </Popover>
            )}
          </span>
        ) : null}
      </div>
      <div className="message">
        <div className="body">
          <ShowMore
            maxHeight={140}
            text={
              <>
                <MarkdownContent content={comment.message} />

                <div className="attachments">
                  {comment.attachments?.map((attachment, i) => (
                    <AttachmentButton
                      attachment={attachment}
                      key={`att-${i}`}
                    />
                  ))}
                </div>
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}
