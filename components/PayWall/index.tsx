import {
  InfoCircleOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import Link from 'next/link'
import { ReactNode } from 'react'

import { useUser } from '../../hooks/user'
import { SETTINGS_SUBSCRIPTION } from '../../utils/routes'
import { EmptyState } from '../EmptyState'

interface PayWallProps {
  children: JSX.Element | JSX.Element[]
  popoverContent?: ReactNode
  popoverTitle?: ReactNode
  primer?: JSX.Element
}

const DefaultPrimer = ({
  popoverContent = 'Space for a mini video/gif showcasing the benefit and option to learn more',
  popoverTitle = 'Learn more',
}: {
  popoverContent: PayWallProps['popoverContent']
  popoverTitle: PayWallProps['popoverTitle']
}) => (
  <EmptyState
    actions={[
      <Link href={SETTINGS_SUBSCRIPTION} key="upgrade" passHref>
        <Button icon={<ThunderboltOutlined />} type="primary">
          Upgrade
        </Button>
      </Link>,
      <Popover
        content={popoverContent}
        key="info"
        overlayClassName="popover-lg title-big"
        placement="left"
        title={popoverTitle}
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

export const PayWall = ({
  children,
  popoverContent,
  popoverTitle,
  primer,
}: PayWallProps) => {
  // @TODO: for testing purposes the programId will
  // be our restriction, this should be replaced with a
  // dynamic attribute connected to payment and with expiry date

  const { isPaying } = useUser()

  if (!isPaying)
    return (
      primer || (
        <DefaultPrimer
          popoverContent={popoverContent}
          popoverTitle={popoverTitle}
        />
      )
    )

  return <>{children}</>
}
