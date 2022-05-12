require('./styles.less')

import { BankOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import { useRouter } from 'next/router'

import {
  SETTINGS,
  SETTINGS_COMPANY,
  SETTINGS_INVITE,
} from '../../../utils/routes'

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
]

export const SettingsNav = () => {
  const router = useRouter()

  const handleSelect = (item: any) => {
    router.push(item.key)
  }

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
