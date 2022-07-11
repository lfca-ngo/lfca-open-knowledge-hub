require('./styles.less')
import { useUser } from '../../../hooks/user'

export const TopBar = () => {
  const { isOnPaidPlan } = useUser()

  // if user is not logged in / e.g. on sign in do not show the bar
  if (isOnPaidPlan) return null

  return <div className="top-bar">Is on paid plan: {`${isOnPaidPlan}`}</div>
}
