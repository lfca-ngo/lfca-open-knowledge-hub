import {
  // CalendarOutlined,
  CommentOutlined,
  ContainerOutlined,
  DownloadOutlined,
  MessageOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Col,
  Divider,
  Popover,
  // Radio,
  Row,
  Skeleton,
  Space,
  Tabs,
} from 'antd'
import { useEffect, useState } from 'react'

import { useUser } from '../../hooks/user'
import {
  ActionCommentFragment,
  useActionCommentAttachmentsQuery,
  useActionCommentsQuery,
  useDeleteActionCommentMutation,
  UserAvatarFragment,
} from '../../services/lfca-backend'
import { AttachmentsList } from '../AttachmentsList'
import { EmptyState } from '../EmptyState'
import { UserAvatar } from '../UserAvatar'
import { CommentItem } from './CommentItem'
import { CommentModal } from './CommentModal'
import styles from './styles.module.less'

const ATTACHMENTS_KEY = 'attachments'
const LOADING_KEY = 'loading'

const TabsSkeletonChild = {
  children: (
    <Skeleton
      active
      className="message-skeleton"
      paragraph={{ rows: 2 }}
      title={false}
    />
  ),
  key: LOADING_KEY,
  label: (
    <Skeleton.Avatar
      active
      className="avatar-skeleton"
      shape="square"
      size="large"
    />
  ),
}

// const FILTERS = [
//   { icon: <CalendarOutlined />, label: 'Relevance', value: 'Apple' },
//   { label: 'Date', value: 'Pear' },
// ]

interface CommentsProps {
  actionContentId: string
  title?: React.ReactNode
}

const CommentAuthor = ({ author }: { author: UserAvatarFragment }) => {
  return (
    <div className={styles['avatar-meta']}>
      <UserAvatar avatarProps={{ shape: 'square', size: 45 }} user={author} />
      <div className="text">
        <div className="name">{author?.firstName}</div>
        <div className="company">{author?.company?.name}</div>
      </div>
    </div>
  )
}

export const Comments = ({ actionContentId, title }: CommentsProps) => {
  const [activeComment, setActiveComment] = useState(LOADING_KEY)
  const [visible, setVisible] = useState(false)
  const [editingComment, setEditingComment] = useState<ActionCommentFragment>()
  const [{ data, fetching }] = useActionCommentsQuery({
    pause: !actionContentId,
    variables: {
      input: { actionContentId },
    },
  })

  const [{ data: attachmentsData, fetching: fetchingAttachments }] =
    useActionCommentAttachmentsQuery({
      variables: { input: { actionContentId: actionContentId } },
    })

  const [, deleteActionComment] = useDeleteActionCommentMutation()
  const hasComments = !!data?.actionComments

  const { isAdmin } = useUser()

  const onDelete = async (comment: ActionCommentFragment) => {
    await deleteActionComment({
      input: {
        id: comment.id,
      },
    })
  }

  useEffect(() => {
    if (hasComments && activeComment === LOADING_KEY) {
      setActiveComment('0')
    }
  }, [hasComments, activeComment])

  const EmptyChild = {
    children: (
      <EmptyState
        actions={[
          <Button
            block
            icon={<PlusOutlined />}
            key="create"
            onClick={() => {
              setEditingComment(undefined)
              setVisible(true)
            }}
            type="primary"
          >
            Comment
          </Button>,
        ]}
        alignment="center"
        icon={<MessageOutlined />}
        size="small"
        text="Comment about your experience with this action."
        title="Be the first to leave a comment"
      />
    ),
    key: 'empty',
    label: (
      <Avatar
        className="black-inverse"
        icon={<ContainerOutlined />}
        shape="square"
        size="large"
      />
    ),
  }

  return (
    <div className={styles['action-comments']}>
      <Row align="middle">
        <Col md={6} xs={24}>
          <h2 className={'section-title no-margin'}>{title}</h2>
        </Col>
        <Col md={18} style={{ textAlign: 'right' }} xs={24}>
          <Space>
            <Popover content="Comments">
              <Button icon={<CommentOutlined />}>
                {' '}
                {data?.actionComments?.length}
              </Button>
            </Popover>
            <Popover content="Comments">
              <Button
                icon={<DownloadOutlined />}
                onClick={() => setActiveComment(ATTACHMENTS_KEY)}
              >
                {' '}
                {attachmentsData?.actionCommentAttachments.length}
              </Button>
            </Popover>

            <Button
              icon={<PlusOutlined />}
              key="create"
              onClick={() => {
                setEditingComment(undefined)
                setVisible(true)
              }}
              type="primary"
            >
              Comment
            </Button>
            {/* <Radio.Group optionType="button" options={FILTERS} size="middle" /> */}
          </Space>
        </Col>
      </Row>

      <Divider />

      <Tabs
        activeKey={activeComment}
        className={'comments-tabs'}
        id="test"
        items={
          fetching
            ? [TabsSkeletonChild]
            : !hasComments
            ? [EmptyChild]
            : [
                ...data?.actionComments.map((comment, i) => {
                  const id = String(i)
                  return {
                    children: (
                      <div>
                        <CommentItem
                          comment={comment}
                          isAdmin={isAdmin}
                          onDelete={() => onDelete(comment)}
                          onEdit={() => {
                            setEditingComment(comment)
                            setVisible(true)
                          }}
                        />

                        <CommentModal
                          actionContentId={actionContentId}
                          editingComment={editingComment}
                          onClose={() => {
                            setVisible(false)
                            setEditingComment(undefined)
                          }}
                          visible={visible}
                        />
                      </div>
                    ),
                    key: id,
                    label: comment.author ? (
                      <CommentAuthor author={comment.author} />
                    ) : null,
                  }
                }),
                {
                  children: (
                    <AttachmentsList
                      attachments={
                        attachmentsData?.actionCommentAttachments || []
                      }
                      fetching={fetchingAttachments}
                    />
                  ),
                  key: ATTACHMENTS_KEY,
                  label: (
                    <div className="attachments-element">
                      <Avatar
                        className="black-inverse"
                        icon={<DownloadOutlined />}
                        shape="square"
                      />
                      All Materials
                    </div>
                  ),
                },
              ]
        }
        onChange={(key) => setActiveComment(key)}
        tabPosition={'left'}
      />

      <CommentModal
        actionContentId={actionContentId}
        editingComment={editingComment}
        onClose={() => {
          setVisible(false)
          setEditingComment(undefined)
        }}
        visible={visible}
      />
    </div>
  )
}
