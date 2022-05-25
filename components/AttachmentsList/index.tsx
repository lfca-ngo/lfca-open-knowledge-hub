import { List } from 'antd'

import { ActionCommentAttachmentsQuery } from '../../services/lfca-backend'
import { AttachmentButton } from './AttachmentButton'

export const AttachmentsList = ({
  attachments,
  fetching,
}: {
  attachments: ActionCommentAttachmentsQuery['actionCommentAttachments']
  fetching: boolean
}) => (
  <List
    dataSource={attachments}
    loading={fetching}
    pagination={{
      hideOnSinglePage: true,
      pageSize: 5,
      size: 'small',
    }}
    renderItem={(attachment) => (
      <List.Item>
        <AttachmentButton attachment={attachment} size="default" />
      </List.Item>
    )}
  />
)
