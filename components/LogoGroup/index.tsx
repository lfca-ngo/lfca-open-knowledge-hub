import { Avatar, AvatarProps } from 'antd'
import classNames from 'classnames'

import { CompanyFragment } from '../../services/lfca-backend'
import styles from './styles.module.less'

interface LogoGroupProps {
  data?: Pick<CompanyFragment, 'id' | 'logoUrl'>[]
  label?: string
  maxCount?: number
  reverse?: boolean
  size: AvatarProps['size']
}

export const LogoGroup = ({
  data = [],
  label,
  maxCount,
  reverse,
  size,
}: LogoGroupProps) => {
  return (
    <div
      className={classNames(styles['logo-group'], size, { reverse: reverse })}
    >
      <Avatar.Group maxCount={maxCount} size={size}>
        {data?.length > 0 ? (
          data?.map((item) => (
            <Avatar
              key={`avatar-${item?.id}`}
              shape="square"
              src={item?.logoUrl}
            />
          ))
        ) : (
          <Avatar className="empty" shape="square">
            -
          </Avatar>
        )}
      </Avatar.Group>
      {label && <div className="logo-group-label">{label}</div>}
    </div>
  )
}
