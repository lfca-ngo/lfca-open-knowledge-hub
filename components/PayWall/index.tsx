import {
  InfoCircleOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import Link from 'next/link'
import { Children, cloneElement, ReactNode } from 'react'

import { useUser } from '../../hooks/user'
import { PRODUCT_VIDEO_URL } from '../../utils'
import { SETTINGS_SUBSCRIPTION } from '../../utils/routes'
import { EmptyState } from '../EmptyState'
import { VideoWrapper } from '../VideoWrapper'

interface PayWallProps {
  children: JSX.Element | JSX.Element[]
  popoverContent?: ReactNode
  popoverTitle?: ReactNode
  primer?: JSX.Element
}

const DefaultPrimer = ({
  popoverContent = (
    <div>
      <p>
        Space for a mini video/gif showcasing the benefit and option to learn
        more
      </p>
      <VideoWrapper
        autoPlay
        muted
        sources={[{ src: PRODUCT_VIDEO_URL, type: 'video/mp4' }]}
      />{' '}
    </div>
  ),
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
        destroyTooltipOnHide
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

  const { fetching, isPaying } = useUser()

  if (!isPaying && !fetching)
    return (
      primer || (
        <DefaultPrimer
          popoverContent={popoverContent}
          popoverTitle={popoverTitle}
        />
      )
    )

  return (
    <>
      {Children.map(children, (child) =>
        cloneElement(child, { isParentLoading: fetching })
      )}
    </>
  )
}
