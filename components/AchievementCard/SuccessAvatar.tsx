import { MehOutlined, SmileOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { AvatarSize } from 'antd/lib/avatar/SizeContext'

export const SuccessAvatar = ({
  isSuccess,
  size,
}: {
  isSuccess: boolean
  size: AvatarSize
}) => (
  <Avatar
    className={isSuccess ? 'green-inverse' : 'blue-inverse'}
    icon={isSuccess ? <SmileOutlined /> : <MehOutlined />}
    shape="square"
    size={size}
  />
)
