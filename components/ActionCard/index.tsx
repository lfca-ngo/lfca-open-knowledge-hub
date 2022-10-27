import Link from 'next/link'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ActionCard } from './ActionCard'
import { ActionCardCompact } from './ActionCardCompact'
import styles from './styles.module.less'

export interface ActionCardProps {
  action: CompanyActionListItemFragment
  selectText?: string
  onCtaClick?: (action: CompanyActionListItemFragment) => void
  onSavePosition?: () => void
  onToggleInfo?: (
    action: CompanyActionListItemFragment,
    actionContentId: string
  ) => void
  renderAsLink?: boolean
  mode?: 'default' | 'compact'
  unselectText?: string
}

// the next/link component allows us to prefetch the action pages
// speeding up the experience for the user, alternatively an onclick
// handler is used to trigger an action
export const ActionCardWrapper = (props: ActionCardProps) => {
  const ActionCardComponent =
    props.mode === 'compact' ? ActionCardCompact : ActionCard

  if (props.renderAsLink) {
    return (
      <Link href={`/action/${props.action.contentId}`}>
        <a
          className={styles['action-card-wrapper']}
          onClick={props.onSavePosition}
        >
          <ActionCardComponent {...props} />
        </a>
      </Link>
    )
  } else {
    return <ActionCardComponent {...props} />
  }
}
