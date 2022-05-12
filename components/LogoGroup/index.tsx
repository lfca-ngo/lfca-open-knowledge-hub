require('./styles.less')

import { Avatar } from 'antd'
import classNames from 'classnames'

export const LogoGroup = ({
  data,
  label,
  previewCount = 3,
  size,
}: {
  data: any
  label?: any
  previewCount?: number
  size?: any
}) => {
  const items = data.slice(0, previewCount)
  return (
    <div className={classNames('logo-group', size)}>
      <Avatar.Group size={size}>
        {items.map((item: any, i: any) => (
          <Avatar key={`avatar-${i}`} src={item.logoUrl} />
        ))}
      </Avatar.Group>
      {label && <div className="label">{label}</div>}
    </div>
  )
}
