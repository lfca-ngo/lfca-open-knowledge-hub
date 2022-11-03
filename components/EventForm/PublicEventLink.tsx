import { CopyOutlined } from '@ant-design/icons'
import { Button, Collapse, Input, message, Space } from 'antd'

import { COPY_BTN_WIDTH, copyTextToClipboard } from '../../utils'
import styles from './styles.module.less'

const { Panel } = Collapse

export const PublicEventLink = () => {
  const link = ''

  const handleCopy = () => {
    link &&
      copyTextToClipboard(link, (note: string, hasCopied: boolean) => {
        if (hasCopied) {
          message.success(note)
        } else message.error(note)
      })
  }

  return (
    <div className={styles['public-event-link']}>
      <Collapse>
        <Panel header="Generate an open event sign up link" key="1">
          <div className="link-details-title">Link Details</div>
          <ul>
            <li>everybody with this link can sign up to the event</li>
            <li>
              {`people who sign up are automatically added as "approved" and will
              receive a confirmation email`}
            </li>
          </ul>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button block type="primary">
              Generate sign up link
            </Button>

            <Input.Group compact>
              <Input
                disabled
                placeholder="Click the button to create a link"
                style={{ width: `calc(100% - ${COPY_BTN_WIDTH}px` }}
                value={link}
              />
              <Button
                icon={<CopyOutlined />}
                onClick={handleCopy}
                style={{ width: `${COPY_BTN_WIDTH}px` }}
              />
            </Input.Group>
          </Space>
        </Panel>
      </Collapse>
    </div>
  )
}
