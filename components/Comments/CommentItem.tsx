import { FileOutlined, LoadingOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm, Popover, Skeleton } from 'antd'
import { marked } from 'marked'
import React from 'react'

import { ShowMore } from '../ShowMore'

// Extend the default renderer to open links in a new window
// See: https://github.com/markedjs/marked/issues/655#issuecomment-383226346
const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href: any, title: any, text: any) => {
  const html = linkRenderer.call(renderer, href, title, text)
  return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ')
}

const CompanyPopover = ({ company }: { company: any }) => {
  return (
    <div className="action-comments-company-popover ">
      {!company ? (
        <>
          <Skeleton avatar={{ size: 35 }} paragraph={false} title={false} />
          <Skeleton
            avatar={false}
            paragraph={{ rows: 1, width: 40 }}
            title={false}
          />
        </>
      ) : (
        <>
          <div className="logo-wrapper">
            <img src={company?.logo} />
          </div>
          <span className="company-name">{company?.name}</span>
        </>
      )}
    </div>
  )
}

export const CommentItem = ({
  authorProfile,
  comment,
  isAdmin,
  onDelete,
  onEdit,
}: {
  authorProfile: any
  comment: any
  isAdmin: boolean
  onDelete: any
  onEdit: any
}) => {
  return (
    <div className="comment-item">
      <Popover
        content={<CompanyPopover company={{}} />}
        overlayClassName="action-details"
        placement="top"
        trigger="hover"
      >
        <div className="author">
          {authorProfile?.picture ? (
            <Avatar size="large" src={authorProfile.picture} />
          ) : (
            <Avatar icon={<LoadingOutlined />} size="large" />
          )}
          {authorProfile?.firstname ? (
            <span className="name">{authorProfile.firstname}</span>
          ) : null}
        </div>
      </Popover>

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
          {comment.attachments?.map((attachment: any) => (
            <Button
              key={attachment.source}
              onClick={() => window.open(attachment.source, '_blank')}
              size="small"
            >
              <FileOutlined className="comments-icon" />
              {attachment.name}
            </Button>
          ))}
        </div>
        {isAdmin && (
          <div className="admin-actions">
            <Popconfirm
              cancelText="No"
              okText="Yes"
              onConfirm={onDelete}
              title="Are you sure to delete this comment?"
            >
              <Button size="small" type="link">
                Delete
              </Button>
            </Popconfirm>

            <Button onClick={onEdit} size="small" type="link">
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
