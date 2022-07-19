require('./styles.less')
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useFirebase } from '../../../hooks/firebase'
import { useUser } from '../../../hooks/user'
import { LOGOUT, PROFILE_NAV } from '../../../utils/navs'

export const SettingsNav = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { logout } = useFirebase()
  const { user } = useUser()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = ({ key }: { key: string }) => {
    if (key === LOGOUT) handleLogout()
    else router.push(key)
  }

  const items = PROFILE_NAV(loading)

  return (
    <Dropdown
      className="settings-nav"
      overlay={<Menu items={items} onClick={handleSelect} />}
      overlayClassName="settings-nav-overlay"
    >
      <a onClick={(e) => e.preventDefault()}>
        <div className="profile-pic">
          <Avatar
            icon={!user?.picture && <UserOutlined />}
            size={45}
            src={user?.picture}
            style={{ backgroundColor: '#6A1246' }}
          />
        </div>
        <div className="profile-info">
          <div className="name">
            {user?.firstName || ''} {user?.lastName || ''}
          </div>
          <div className="company">{user?.company?.name}</div>
        </div>
      </a>
    </Dropdown>
  )
}
