require('./styles.less')

import { PlusOutlined } from '@ant-design/icons'
import { Avatar, AvatarProps } from 'antd'
import classNames from 'classnames'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'

interface LogoGroupProps {
  data?: CompanyActionListItemFragment['recentCompaniesCompleted']
  label?: string
  reverse?: boolean
  size: AvatarProps['size']
}

export const LogoGroup = ({ data, label, reverse, size }: LogoGroupProps) => {
  return (
    <div className={classNames('logo-group', size, { reverse: reverse })}>
      <Avatar.Group size={size}>
        {data?.map((item, i) => (
          <Avatar key={`avatar-${i}`} src={item.logoUrl} />
        )) || <Avatar className="empty" icon={<PlusOutlined />} />}
      </Avatar.Group>
      {label && <div className="label">{label}</div>}
    </div>
  )
}
