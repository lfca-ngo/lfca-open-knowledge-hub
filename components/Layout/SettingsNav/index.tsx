require('./styles.less')
import {
  BankOutlined,
  LikeOutlined,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { logout } from '../../../services/firebase'
import {
  SETTINGS,
  SETTINGS_COMPANY,
  SETTINGS_INVITE,
} from '../../../utils/routes'

const LOGOUT = 'logout'

export const SettingsNav = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (item: any) => {
    if (item.key === LOGOUT) handleLogout()
    else router.push(item.key)
  }

  const ITEMS = [
    {
      icon: <UserOutlined />,
      key: SETTINGS,
      label: 'Edit profile',
    },
    {
      icon: <BankOutlined />,
      key: SETTINGS_COMPANY,
      label: 'Edit company',
    },
    {
      icon: <LikeOutlined />,
      key: SETTINGS_INVITE,
      label: 'Invite Team',
    },
    {
      icon: loading ? <LoadingOutlined /> : <LogoutOutlined />,
      key: LOGOUT,
      label: 'Logout',
    },
  ]

  return (
    <Dropdown
      className="settings-nav"
      overlay={<Menu items={ITEMS} onClick={handleSelect} />}
    >
      <a onClick={(e) => e.preventDefault()}>
        <div className="profile-pic">
          <Avatar
            icon={<UserOutlined />}
            size={45}
            style={{ backgroundColor: '#6A1246' }}
          />
        </div>
        <div className="profile-info">
          <div className="name">Timo Müller</div>
          <div className="company">lfca.earth</div>
        </div>
      </a>
    </Dropdown>
  )
}
