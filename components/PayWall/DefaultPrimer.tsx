import {
  InfoCircleOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import Link from 'next/link'
import { ReactNode } from 'react'

import { PRODUCT_VIDEO_URL } from '../../utils'
import { SETTINGS_SUBSCRIPTION } from '../../utils/routes'
import { EmptyState, EmptyStateProps } from '../EmptyState'
import { VideoWrapper } from '../VideoWrapper'

interface PayWallProps {
  children: JSX.Element | JSX.Element[]
  popoverContent?: ReactNode // you can either customize
  popoverTitle?: ReactNode // the default primers content
  emptyStateAlignment?: EmptyStateProps['alignment']
  primer?: JSX.Element // OR: pass a completely different one
}

export const DefaultPrimer = ({
  emptyStateAlignment = 'left',
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
  emptyStateAlignment?: PayWallProps['emptyStateAlignment']
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
    alignment={emptyStateAlignment}
    bordered={false}
    icon={<LockOutlined />}
    size="small"
    text="You can upgrade your plan anytime and share your climate journey on a custom microsite!"
    title="Locked"
  />
)
