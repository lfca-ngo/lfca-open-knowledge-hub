import { Avatar } from 'antd'

export const ArrowWrapper = ({
  className,
  icon,
  onClick,
  style,
}: {
  onClick?: () => void
  className?: string
  icon: React.ReactNode
  style?: React.CSSProperties
}) => (
  <div className={className} onClick={onClick} style={style}>
    <Avatar icon={icon} />
  </div>
)
