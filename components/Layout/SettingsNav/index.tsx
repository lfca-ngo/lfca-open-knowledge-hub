import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

import styles from './styles.module.less'

export const SettingsNav = () => {
  return (
    <div className={styles['settings-nav']}>
      <div className="profile-pic">
        <Avatar
          icon={<UserOutlined />}
          size={45}
          style={{ backgroundColor: '#6A1246' }}
        />
      </div>
    </div>
  )
}
