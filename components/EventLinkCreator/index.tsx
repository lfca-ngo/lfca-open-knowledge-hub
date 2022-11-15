import { CopyOutlined } from '@ant-design/icons'
import { Button, Collapse, Form, Input, message } from 'antd'

import { useCreateEventTokenMutation } from '../../services/lfca-backend'
import { COPY_BTN_WIDTH, copyTextToClipboard } from '../../utils'
import styles from './styles.module.less'

const { Panel } = Collapse
const { useForm } = Form

interface PublicEventLinkProps {
  eventId: string
}

export const EventLinkCreator = ({ eventId }: PublicEventLinkProps) => {
  const [eventLinkForm] = useForm()

  const [{ data, fetching }, createEventToken] = useCreateEventTokenMutation()

  const link = data?.createEventToken
    ? `${process.env.NEXT_PUBLIC_URL}/events/${eventId}/signup?token=${data?.createEventToken}`
    : ''

  const handleCopy = () => {
    link &&
      copyTextToClipboard(link, (note: string, hasCopied: boolean) => {
        if (hasCopied) {
          message.success(note)
        } else message.error(note)
      })
  }

  const handleCreate = () => {
    createEventToken({
      input: {
        eventId,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Event link created')
    })
  }

  return (
    <div className={styles['event-link-creator']}>
      <Collapse>
        <Panel header="Generate an open event sign up link" key="1">
          <Form form={eventLinkForm} layout="vertical" onFinish={handleCreate}>
            <Form.Item>
              <Button block htmlType="submit" loading={fetching} type="primary">
                Generate sign up link
              </Button>
            </Form.Item>
            <Form.Item>
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
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </div>
  )
}
