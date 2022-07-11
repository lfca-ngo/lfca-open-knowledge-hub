import {
  InfoCircleOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import { ReactNode } from 'react'

import { useUser } from '../../hooks/user'
import { EmptyState } from '../EmptyState'

interface PayWallProps {
  children: JSX.Element | JSX.Element[]
  popoverContent?: ReactNode
  primer?: JSX.Element
}

const DefaultPrimer = ({
  popoverContent,
}: {
  popoverContent: PayWallProps['popoverContent']
}) => (
  <EmptyState
    actions={[
      <Button icon={<ThunderboltOutlined />} key="upgrade" type="primary">
        Upgrade
      </Button>,
      <Popover
        content={
          popoverContent ||
          'Space for a mini video/gif showcasing the benefit and option to learn more'
        }
        key="info"
        overlayClassName="popover-lg"
        placement="left"
        title="Something"
      >
        <Button icon={<InfoCircleOutlined />} />
      </Popover>,
    ]}
    alignment="left"
    bordered={false}
    icon={<LockOutlined />}
    size="small"
    text="You can upgrade your plan anytime and share your climate journey on a custom microsite!"
    title="Locked"
  />
)

export const PayWall = ({ children, popoverContent, primer }: PayWallProps) => {
  // @TODO: for testing purposes the programId will
  // be our restriction, this should be replaced with a
  // dynamic attribute connected to payment and with expiry date

  const { isPaying } = useUser()

  if (!isPaying)
    return primer || <DefaultPrimer popoverContent={popoverContent} />

  return <>{children}</>
}
