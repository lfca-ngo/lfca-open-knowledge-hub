import Icon, {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Popconfirm, Popover, Space } from 'antd'
import classNames from 'classnames'
import EmojiPicker, {
  SkinTonePickerLocation,
  SkinTones,
  Theme,
} from 'emoji-picker-react'
import React, { useState } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { useUser } from '../../../hooks/user'
import AddReactionIcon from '../../../public/img/icons/add-reaction.svg'
import {
  ActionCommentFragment,
  useDeleteActionCommentMutation,
  useReactOnActionCommentMutation,
} from '../../../services/lfca-backend'
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  toReadibleDate,
} from '../../../utils'
import { AttachmentButton } from '../../AttachmentsList/AttachmentButton'
import { MarkdownContent } from '../../MarkdownContent'
import { ShowMore } from '../../ShowMore'
import { CommentAuthor } from '../CommentAuthor'
import styles from './styles.module.less'

interface CommentItemProps {
  comment: Omit<ActionCommentFragment, 'children'>
  isChild?: boolean
  onEdit: (comment: ActionCommentFragment) => void
}

const VISIBLE_ROWS = 7
const SKIN_TONE_STORAGE_KEY = 'emoji_skin_tone'

export const CommentItem = ({ comment, isChild, onEdit }: CommentItemProps) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  const [emojiSkinTone, setEmojiSkinTone] = useLocalStorage<SkinTones>(
    SKIN_TONE_STORAGE_KEY,
    SkinTones.NEUTRAL
  )

  const [, deleteActionComment] = useDeleteActionCommentMutation()
  const [, reactOnActionComment] = useReactOnActionCommentMutation()

  const onDelete = async () => {
    await deleteActionComment({
      input: {
        actionCommentId: comment.id,
      },
    })
  }

  const onReact = async (reaction: string, remove?: boolean) => {
    await reactOnActionComment({
      input: {
        actionCommentId: comment.id,
        reaction,
        remove,
      },
    })
  }

  const { isAdmin, user } = useUser()

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentContent}>
        {isChild ? (
          <CommentAuthor
            author={comment.author ?? undefined}
            className={styles.childCommentAuthor}
          />
        ) : null}
        <div
          className={classNames({
            [styles.body]: true,
            [styles.childComment]: isChild,
          })}
        >
          <p className={styles.time}>{toReadibleDate(comment.createdAt)}</p>

          {isAdmin && (
            <Popover
              className={styles.adminActions}
              content={
                <Space>
                  <Popconfirm
                    cancelText="No"
                    okText="Yes"
                    onConfirm={onDelete}
                    title="Are you sure to delete this comment?"
                  >
                    <Button icon={<DeleteOutlined />} size="small" />
                  </Popconfirm>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => onEdit(comment as ActionCommentFragment)}
                    size="small"
                  />
                </Space>
              }
              placement="left"
            >
              <Button icon={<SettingOutlined />} size="small" />
            </Popover>
          )}

          <ShowMore
            blurColor="#f9f9f9"
            buttonProps={{ size: 'small', type: 'link' }}
            className={styles.showMoreContent}
            maskMode="blur"
            maxHeight={DEFAULT_FONT_SIZE * DEFAULT_LINE_HEIGHT * VISIBLE_ROWS}
            text={<MarkdownContent content={comment.message} />}
          />
          <div className={styles.attachments}>
            {comment.attachments?.map((attachment, i) => (
              <AttachmentButton attachment={attachment} key={`att-${i}`} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.commentReactions}>
        {Object.keys(comment.reactions as Record<string, string[]>).map(
          (emoji) => {
            const reactedUserIds: string[] = comment.reactions[emoji]
            const isActive = !!user?.id && reactedUserIds.includes(user.id)

            return (
              <Button
                className={styles.reactionButton}
                key={emoji}
                onClick={() => onReact(emoji, isActive)}
                shape="round"
                size="small"
                type={isActive ? 'primary' : 'ghost'}
              >
                {`${emoji} ${reactedUserIds.length}`}
              </Button>
            )
          }
        )}
        <Popover
          content={
            <EmojiPicker
              autoFocusSearch={false}
              defaultSkinTone={emojiSkinTone}
              onEmojiClick={({ activeSkinTone, emoji }) => {
                onReact(emoji)
                setEmojiSkinTone(activeSkinTone)
                setEmojiPickerOpen(false)
              }}
              skinTonePickerLocation={SkinTonePickerLocation.SEARCH}
              theme={Theme.LIGHT}
            />
          }
          destroyTooltipOnHide={true}
          onOpenChange={setEmojiPickerOpen}
          open={emojiPickerOpen}
          overlayClassName={styles.emojiPickerPopover}
          trigger="click"
        >
          <Button
            icon={<Icon component={AddReactionIcon} />}
            shape="round"
            size="small"
            type="text"
          />
        </Popover>
      </div>
    </div>
  )
}
