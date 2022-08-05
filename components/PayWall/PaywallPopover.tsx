import { Popover } from 'antd'
import React, { cloneElement, ReactNode } from 'react'

import { useUser } from '../../hooks/user'
import { DefaultPrimer } from './DefaultPrimer'

/**
 * Used in Layout/MainMenu to disable
 * menu elements that should not be
 * accessible for non-paying users
 */

export const PaywallPopover = ({
  children,
  popoverContent,
  popoverTitle,
}: {
  children: JSX.Element // Popover component allows only 1 child
  popoverContent?: ReactNode
  popoverTitle?: ReactNode
}) => {
  const { fetching, isPaying } = useUser()

  if (!isPaying && !fetching)
    return (
      <Popover
        content={
          <DefaultPrimer
            emptyStateAlignment="center"
            popoverContent={popoverContent}
            popoverTitle={popoverTitle}
          />
        }
        overlayClassName="popover-lg"
        placement="right"
        title={null}
      >
        {cloneElement(children, { disabled: !isPaying })}
      </Popover>
    )

  return <>{children}</>
}
