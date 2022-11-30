import React from 'react'

import { UserAvatarFragment } from '../../../services/lfca-backend'
import { UserAvatar } from '../../UserAvatar'
import styles from './styles.module.less'

interface CommentAuthorProps {
  className?: string
  author?: UserAvatarFragment
}

export const CommentAuthor = ({ author, className }: CommentAuthorProps) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <UserAvatar avatarProps={{ shape: 'square', size: 45 }} user={author} />
      <div className={styles.text}>
        <div className={styles.name}>{author?.firstName}</div>
        <div className={styles.company}>{author?.company?.name}</div>
      </div>
    </div>
  )
}
