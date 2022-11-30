import {
  CommentOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SlackOutlined,
} from '@ant-design/icons'
import { Button, Popover, Space } from 'antd'
import React from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import { OPEN_SLACK_LINK } from '../../utils'

interface CommentsActionsProps {
  onClickComments: () => void
  onClickAttachments: () => void
  commentsCount: number
  attachmentsCount: number
  onAddComment: () => void
}

export const CommentsActionsContent = ({
  attachmentsCount,
  commentsCount,
  onAddComment,
  onClickAttachments,
  onClickComments,
}: CommentsActionsProps) => {
  const isDesktop = useBreakpoints().md

  return (
    <Space direction={isDesktop ? 'horizontal' : 'vertical'}>
      <Popover content="Coming soon: Save comments directly from Slack to our Knowledge Base">
        <Button
          icon={<SlackOutlined />}
          onClick={() => window.open(OPEN_SLACK_LINK, '_blank')}
        >
          {' '}
          Open Slack
        </Button>
      </Popover>
      <Popover content="Comments">
        <Button
          disabled={!commentsCount}
          icon={<CommentOutlined />}
          onClick={onClickComments}
        >
          {' '}
          {commentsCount}
        </Button>
      </Popover>
      <Popover content="Materials">
        <Button
          disabled={!attachmentsCount}
          icon={<DownloadOutlined />}
          onClick={onClickAttachments}
        >
          {' '}
          {attachmentsCount}
        </Button>
      </Popover>

      <Button
        icon={<PlusOutlined />}
        key="create"
        onClick={onAddComment}
        type="primary"
      >
        Comment
      </Button>
    </Space>
  )
}

export const CommentsActions = (props: CommentsActionsProps) => {
  const isDesktop = useBreakpoints().md

  return isDesktop ? (
    <CommentsActionsContent {...props} />
  ) : (
    <Popover content={<CommentsActionsContent {...props} />} placement="left">
      <Button icon={<EllipsisOutlined />} />
    </Popover>
  )
}
