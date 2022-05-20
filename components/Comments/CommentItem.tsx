import { FileOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm, Popover, Skeleton, Space } from 'antd'
import { marked } from 'marked'
import React from 'react'

import { ActionCommentFragment } from '../../services/lfca-backend'
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
  return (
    <div className="comment-item">
      <div className="author">
        {comment.author?.picture ? (
          <Avatar size="large" src={comment.author.picture} />
        ) : (
          <Avatar icon={<UserOutlined />} size="large" />
        )}
        {comment.author?.firstName ? (
          <span className="name">{comment.author.firstName}</span>
        ) : null}
      </div>

      <div className="message">
        <div className="body">
          <ShowMore
            maxHeight={280}
            text={
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(comment.message, {
                    breaks: true,
                    renderer,
                  }),
                }}
              />
            }
          />
        </div>
        <div className="attachments">
          {comment.attachments?.map((attachment) => (
            <Button
              key={attachment.source}
              onClick={() => window.open(attachment.source, '_blank')}
              size="small"
            >
              <FileOutlined className="comments-icon" />
              {attachment.fileName}
            </Button>
          ))}
        </div>
        {isAdmin && (
          <Space className="admin-actions">
            <Popconfirm
              cancelText="No"
              okText="Yes"
              onConfirm={onDelete}
              title="Are you sure to delete this comment?"
            >
              <Button size="small">Delete</Button>
            </Popconfirm>

            <Button onClick={onEdit} size="small">
              Edit
            </Button>
          </Space>
        )}
      </div>
    </div>
  )
}
