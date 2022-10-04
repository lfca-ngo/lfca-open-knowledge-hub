import { PaperClipOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import classNames from 'classnames'

import { ActionCommentAttachment } from '../../services/lfca-backend'
import styles from './styles.module.less'

export const AttachmentButton = ({
  attachment,
  size = 'small',
}: {
  attachment: ActionCommentAttachment
  size?: 'small' | 'default'
}) => (
  <a
    className={classNames(styles['attachment-button'], size)}
    href={attachment.source}
    rel="noreferrer"
    target="_blank"
  >
    <Button
      className="no-padding"
      key={attachment.source}
      size={size === 'default' ? 'middle' : size}
      type="link"
    >
      <Avatar
        className="blue-inverse"
        icon={<PaperClipOutlined />}
        shape="square"
        size={size}
        style={{ marginRight: '8px' }}
      />
      {attachment.fileName}
    </Button>
  </a>
)
