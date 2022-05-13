import { MessageOutlined } from '@ant-design/icons'
import React from 'react'

export const EmptyPlaceholder = () => {
  return (
    <div className="empty-comments">
      <MessageOutlined className="comments-icon" />
      <h3>No Messages yet</h3>
      <p>
        Comment about your experience with this action,
        <br />
        upload helpful material or ask questions.
      </p>
    </div>
  )
}
