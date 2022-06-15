import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Popconfirm, Popover, Space } from 'antd'
import { marked } from 'marked'
import React from 'react'

import { ActionCommentFragment } from '../../services/lfca-backend'
import { toReadibleDate } from '../../utils'
import { AttachmentButton } from '../AttachmentsList/AttachmentButton'
import { ShowMore } from '../ShowMore'

// Extend the default renderer to open links in a new window
// See: https://github.com/markedjs/marked/issues/655#issuecomment-383226346
const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href: string, title: string, text: string) => {
  const html = linkRenderer.call(renderer, href, title, text)
  return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ')
}

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

  const handleContactViaEmail = () => {
    location.href = `mailto:${comment.author?.email}`
  }

  return (
    <div className="comment-item">
      <div className="author">
        <Popover
          content={
            <Button
              icon={<DeleteOutlined />}
              onClick={handleContactViaEmail}
              size="small"
            >
              Contact via Email
            </Button>
          }
          visible={!comment.author?.email ? false : undefined}
        >
          {comment.author?.picture ? (
            <Avatar className="blue" src={comment.author.picture} />
          ) : (
            <Avatar className="blue-inverse" icon={<UserOutlined />} />
          )}
        </Popover>
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
            size="small"
            text={
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(comment.message, {
                      breaks: true,
                      renderer,
                    }),
                  }}
                />
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
