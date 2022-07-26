import {
  InfoCircleOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import Link from 'next/link'
import { ReactNode } from 'react'

import { SETTINGS_SUBSCRIPTION } from '../../utils/routes'
import { EmptyState, EmptyStateProps } from '../EmptyState'

interface PayWallProps {
  children: JSX.Element | JSX.Element[]
  popoverContent?: ReactNode // you can either customize
  popoverTitle?: ReactNode // the default primers content
  emptyStateAlignment?: EmptyStateProps['alignment']
  primer?: JSX.Element // OR: pass a completely different one
}

export const DefaultPrimer = ({
  emptyStateAlignment = 'left',
  popoverContent = 'For less than the price of one cup of coffee per employee, you get access to the full power of our community. If you believe LFCA membership would be beneficial to your organization, but can’t currently afford the annual fee please get in touch with our team at membership@lfca.earth.',
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
    text="You can upgrade your plan anytime and unlock all benefits of our community and platform!"
    title="Locked"
  />
)
