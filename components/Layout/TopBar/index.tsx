import { LockOutlined } from '@ant-design/icons'
import { ThunderboltOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useFirebase } from '../../../hooks/firebase'
import { useUser } from '../../../hooks/user'
import { SETTINGS_SUBSCRIPTION } from '../../../utils/routes'
import styles from './styles.module.less'

const Bar = () => {
  const { fetching, isPaying, user } = useUser()

  // if user is not logged in (user === undefined)
  // e.g. on sign in do not show the bar
  if (fetching || isPaying || !user) return null

  return (
    <div className={styles['top-bar']}>
      <Space>
        <LockOutlined />
        Your current membership allows only limited app access
        <Link href={SETTINGS_SUBSCRIPTION} passHref>
          <Button ghost icon={<ThunderboltOutlined />} size="small">
            Upgrade
          </Button>
        </Link>
      </Space>
    </div>
  )
}

// The TopBar lives outside of the classical layout so
// we need to make sure that it gets only rendered if
// the user is logged in, otherwise we might run into
// caching problems of the useUser query
export const TopBar = ({ hideOnPaths }: { hideOnPaths: string[] }) => {
  const { token } = useFirebase()
  const { asPath } = useRouter()
  const cleanPath = asPath.replace(/\//, '')

  return !token || hideOnPaths.findIndex((p) => p === cleanPath) > -1 ? null : (
    <Bar />
  )
}
