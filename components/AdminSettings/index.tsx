import { DeleteOutlined } from '@ant-design/icons'
import { Button, message, Space } from 'antd'

import { usePurgeCacheMutation } from '../../services/lfca-backend'

export const AdminSettings = () => {
  const [{ fetching: isPurgingCache }, purgeCache] = usePurgeCacheMutation()

  const handlePurgeCache = () => {
    purgeCache({}).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Cache purged')
    })
  }

  return (
    <div>
      <Space>
        <Button
          icon={<DeleteOutlined />}
          loading={isPurgingCache}
          onClick={handlePurgeCache}
          type="primary"
        >
          Purge cache
        </Button>
      </Space>
    </div>
  )
}
