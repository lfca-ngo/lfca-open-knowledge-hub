import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Popconfirm, Popover, Space } from 'antd'
import React from 'react'

import { ActionCommentFragment } from '../../services/lfca-backend'
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  toReadibleDate,
} from '../../utils'
import { AttachmentButton } from '../AttachmentsList/AttachmentButton'
import { MarkdownContent } from '../MarkdownContent'
import { ShowMore } from '../ShowMore'

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
  const visibleRows = 7

  return (
    <div className="comment-item">
      <div className="main-message-wrapper">
        <div className="message">
          <div className="body">
            <ShowMore
              blurColor="#f9f9f9"
              buttonProps={{ size: 'small', type: 'link' }}
              maskMode="blur"
              maxHeight={DEFAULT_FONT_SIZE * DEFAULT_LINE_HEIGHT * visibleRows}
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
        <span className="time">{readibleDate}</span>
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
                <Button icon={<EditOutlined />} onClick={onEdit} size="small" />
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
      </div>
    </div>
  )
}
