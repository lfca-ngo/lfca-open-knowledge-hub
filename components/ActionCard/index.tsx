import Link from 'next/link'

import { ContentfulActionFields } from '../../services/contentful'
import { ActionCard } from './ActionCard'
import { ActionCardCompact } from './ActionCardCompact'
import styles from './styles.module.less'

export interface ActionCardProps {
  action: ContentfulActionFields
  selectText?: string
  onCtaClick?: (action: ContentfulActionFields) => void
  onSavePosition?: () => void
  onToggleInfo?: (
    action: ContentfulActionFields,
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
      <Link href={`/action/${props.action.actionId}`}>
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
