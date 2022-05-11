require('./styles.less')

import { Avatar, Menu, Dropdown } from 'antd'
import { UserOutlined, LikeOutlined, BankOutlined } from '@ant-design/icons'
import { SETTINGS, SETTINGS_COMPANY, SETTINGS_INVITE } from '../../../utils/routes'

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
    }
]

const menu = (
    <Menu
        items={ITEMS}
    />
)

export const SettingsNav = () => {
    return (
        <Dropdown className="settings-nav" overlay={menu}>
            <a onClick={e => e.preventDefault()}>
                <div className='profile-pic'>
                    <Avatar size={45} icon={<UserOutlined />} />
                </div>
                <div className='profile-info'>
                    <div className='name'>
                        Timo Müller
                    </div>
                    <div className='company'>
                        lfca.earth
                    </div>
                </div>
            </a>
        </Dropdown>
    );
}
