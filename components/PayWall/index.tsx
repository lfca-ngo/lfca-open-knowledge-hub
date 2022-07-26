import { Children, cloneElement, ReactNode } from 'react'

import { useUser } from '../../hooks/user'
import { DefaultPrimer } from './DefaultPrimer'

interface PayWallProps {
  children: JSX.Element | JSX.Element[]
  popoverContent?: ReactNode
  popoverTitle?: ReactNode
  primer?: JSX.Element
}

/**
 * Hides components behind a paywall, by default
 * it displays a simple primer in a popover, this
 * primer can be customized by passing down props
 * Hint: when used on a initial page, we want to make
 * sure, that the child components display their default
 * loading spinner until the user (paymebt) data is loaded
 * to prevent a flickering of 2 different empty states (loading
 * and paywall)
 */

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
