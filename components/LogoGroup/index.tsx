require('./styles.less')

import { Avatar, AvatarProps } from 'antd'
import classNames from 'classnames'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'

interface LogoGroupProps {
  data?: CompanyActionListItemFragment['recentCompaniesCompleted']
  label?: string
  size: AvatarProps['size']
}

export const LogoGroup = ({ data, label, size }: LogoGroupProps) => {
  return (
    <div className={classNames('logo-group', size)}>
      <Avatar.Group size={size}>
        {data?.map((item, i) => (
          <Avatar key={`avatar-${i}`} src={item.logoUrl} />
        ))}
      </Avatar.Group>
      {label && <div className="label">{label}</div>}
    </div>
  )
}
