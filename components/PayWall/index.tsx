import { useUser } from '../../hooks/user'

interface PayWallProps {
  children: JSX.Element | JSX.Element[]
  primer: JSX.Element
}

const DefaultPrimer = () => <div>Beautiful things await</div>

export const PayWall = ({ children, primer }: PayWallProps) => {
  // @TODO: for testing purposes the programId will
  // be our restriction, this should be replaced with a
  // dynamic attribute connected to payment and with expiry date

  const { programContentId } = useUser()
  const hasPaid = programContentId === 'lfcaPledge'

  if (!hasPaid) return primer || DefaultPrimer

  return <>{children}</>
}
