import { DeleteOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, message, Space } from 'antd'

import {
  usePurgeCacheMutation,
  useTriggerDeploymentMutation,
} from '../../services/lfca-backend'

export const AdminSettings = () => {
  const [{ fetching: isPurgingCache }, purgeCache] = usePurgeCacheMutation()
  const [{ fetching: isTriggeringDeployment }, triggerDeployment] =
    useTriggerDeploymentMutation()

  const handlePurgeCache = () => {
    purgeCache({}).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Backend cache purged')
    })
  }

  const handleTriggerDeployment = () => {
    triggerDeployment({
      input: {
        eventType: 'deployment-trigger', //NOTE: Must match the event type in the github action main.yaml
        repoName: 'lfca-community-app',
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('App deployment triggered')
    })
  }

  return (
    <div>
      <Space>
        <Button
          icon={<RedoOutlined />}
          loading={isTriggeringDeployment}
          onClick={handleTriggerDeployment}
          type="primary"
        >
          Trigger app deployment
        </Button>
        <Button
          icon={<DeleteOutlined />}
          loading={isPurgingCache}
          onClick={handlePurgeCache}
          type="primary"
        >
          Purge backend cache
        </Button>
      </Space>
    </div>
  )
}
