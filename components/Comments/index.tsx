import {
  ContainerOutlined,
  DownloadOutlined,
  MessageOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Row, Skeleton, Tabs } from 'antd'
import { useEffect, useMemo, useState } from 'react'

import {
  ActionCommentAttachmentFragment,
  ActionCommentFragment,
  useActionCommentsQuery,
} from '../../services/lfca-backend'
import { AttachmentsList } from '../AttachmentsList'
import { EmptyState } from '../EmptyState'
import { CommentAuthor } from './CommentAuthor'
import { CommentModal } from './CommentModal'
import { CommentsActions } from './CommentsActions'
import { CommentThread } from './CommentThread'
import styles from './styles.module.less'

const ATTACHMENTS_KEY = 'attachments'
const LOADING_KEY = 'loading'
const EMPTY_KEY = 'empty'
const INITIAL_KEY = '0'

interface CommentsProps {
  actionContentId: string
  title?: React.ReactNode
}

export const Comments = ({ actionContentId, title }: CommentsProps) => {
  const [activeTab, setActiveTab] = useState(LOADING_KEY)
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const [parentActionCommentId, setParentActionCommentId] = useState<
    string | undefined
  >(undefined)
  const [editingComment, setEditingComment] = useState<ActionCommentFragment>()

  const [{ data, fetching }] = useActionCommentsQuery({
    pause: !actionContentId,
    variables: {
      input: { actionContentId },
    },
  })

  const attachments = useMemo(() => {
    function getAttachments(comments: ActionCommentFragment[]) {
      return comments.reduce((acc, curr) => {
        if (curr.attachments) {
          acc.push(...curr.attachments)
        }

        if (curr.children) {
          acc.push(...getAttachments(curr.children as ActionCommentFragment[]))
        }

        return acc
      }, [] as ActionCommentAttachmentFragment[])
    }

    return getAttachments(data?.actionComments || [])
  }, [data])

  useEffect(() => {
    // once loading is done, set the active tab based
    // on whether or not comments are available
    if (activeTab === LOADING_KEY) {
      setActiveTab(data?.actionComments.length ? INITIAL_KEY : EMPTY_KEY)
    }
    // if the comments where empty and a new one is being added
    // jump to the new comment
    if (activeTab === EMPTY_KEY && data?.actionComments.length) {
      setActiveTab(INITIAL_KEY)
    }
  }, [data, activeTab])

  return (
    <div className={styles.comments}>
      <Row align="middle">
        <Col md={6} xs={18}>
          <h2 className={'section-title no-margin'}>{title}</h2>
        </Col>
        <Col md={18} style={{ textAlign: 'right' }} xs={6}>
          <CommentsActions
            attachmentsCount={attachments.length || 0}
            commentsCount={data?.actionComments?.length || 0}
            onAddComment={() => {
              setEditingComment(undefined)
              setCommentModalVisible(true)
            }}
            onClickAttachments={() => setActiveTab(ATTACHMENTS_KEY)}
            onClickComments={() => setActiveTab(INITIAL_KEY)}
          />
        </Col>
      </Row>

      <Divider />

      <Tabs
        activeKey={activeTab}
        className={styles.tabs}
        destroyInactiveTabPane
        id="test"
        items={
          fetching
            ? [
                {
                  children: (
                    <Skeleton
                      active
                      className={styles.messageSkeleton}
                      paragraph={{ rows: 2 }}
                      title={false}
                    />
                  ),
                  key: LOADING_KEY,
                  label: (
                    <Skeleton.Avatar
                      active
                      className={styles.authorSkeleton}
                      shape="square"
                      size="large"
                    />
                  ),
                },
              ]
            : !data?.actionComments.length
            ? [
                {
                  children: (
                    <EmptyState
                      actions={[
                        <Button
                          block
                          icon={<PlusOutlined />}
                          key="create"
                          onClick={() => {
                            setEditingComment(undefined)
                            setCommentModalVisible(true)
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
                  key: EMPTY_KEY,
                  label: (
                    <Avatar
                      className="black-inverse"
                      icon={<ContainerOutlined />}
                      shape="square"
                      size="large"
                    />
                  ),
                },
              ]
            : [
                ...(data?.actionComments || []).map((comment, i) => {
                  return {
                    children: (
                      <div>
                        <CommentThread
                          comment={comment}
                          onEdit={(comment) => {
                            setEditingComment(comment)
                            setCommentModalVisible(true)
                          }}
                          onReply={() => {
                            setParentActionCommentId(comment.id)
                            setEditingComment(undefined)
                            setCommentModalVisible(true)
                          }}
                        />
                      </div>
                    ),
                    key: i.toString(),
                    label: (
                      <CommentAuthor author={comment.author ?? undefined} />
                    ),
                  }
                }),
                {
                  children: (
                    <AttachmentsList
                      attachments={attachments}
                      fetching={fetching}
                    />
                  ),
                  key: ATTACHMENTS_KEY,
                  label: (
                    <div className={styles.attachmentsLabel}>
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
        onChange={(key) => setActiveTab(key)}
        tabPosition={'left'}
      />

      <CommentModal
        actionContentId={actionContentId}
        editingComment={editingComment}
        onClose={() => {
          setCommentModalVisible(false)
          setParentActionCommentId(undefined)
          setEditingComment(undefined)
        }}
        parentActionCommentId={parentActionCommentId}
        visible={commentModalVisible}
      />
    </div>
  )
}
