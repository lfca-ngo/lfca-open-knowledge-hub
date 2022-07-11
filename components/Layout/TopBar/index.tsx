require('./styles.less')
import { LockOutlined } from '@ant-design/icons'
import { ThunderboltOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import Link from 'next/link'

import { useUser } from '../../../hooks/user'
import { SETTINGS_PLAN } from '../../../utils/routes'

export const TopBar = () => {
  const { isPaying } = useUser()

  // if user is not logged in / e.g. on sign in do not show the bar
  if (isPaying) return null

  return (
    <div className="top-bar">
      <Space>
        <LockOutlined />
        Your current plan allows only limited app access
        <Link href={SETTINGS_PLAN} passHref>
          <Button ghost icon={<ThunderboltOutlined />} size="small">
            Upgrade
          </Button>
        </Link>
      </Space>
    </div>
  )
}
