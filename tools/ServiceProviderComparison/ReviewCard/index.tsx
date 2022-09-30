import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  ClockCircleOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons'
import { Button, Comment, Drawer, Popconfirm, Rate, Space, Tooltip } from 'antd'
import moment from 'moment'
import { useState } from 'react'

import { ReviewForm } from '../../../components/ReviewForm'
import { UserAvatar } from '../../../components/UserAvatar'
import { useUser } from '../../../hooks/user'
import {
  ServiceProviderReviewFragment,
  useDeleteServiceProviderReviewMutation,
} from '../../../services/lfca-backend'
import styles from './styles.module.less'

const ReviewContent = ({
  cons,
  content,
  pros,
}: {
  cons: string[]
  content?: string
  pros: string[]
}) => {
  return (
    <div className="review-content">
      <div className="general">{content}</div>
      <div className="details">
        {pros.map((pro, i) => (
          <div className="details-item" key={`pro-${i}`}>
            <PlusCircleFilled className="green" />
            <span>{pro}</span>
          </div>
        ))}
        {cons.map((con, i) => (
          <div className="details-item" key={`con-${i}`}>
            <MinusCircleFilled className="wine" />
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ReviewCardProps {
  review: ServiceProviderReviewFragment
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { isAdmin } = useUser()

  const [
    { fetching: fetchingDeleteServiceProviderReview },
    deleteServiceProviderReview,
  ] = useDeleteServiceProviderReviewMutation()

  return (
    <>
      <Comment
        actions={
          isAdmin
            ? [
                <Space key="admin-actions">
                  <Popconfirm
                    cancelText="No"
                    okText="Yes"
                    onConfirm={() => {
                      deleteServiceProviderReview({
                        input: {
                          serviceProviderReviewId: review.id,
                        },
                      })
                    }}
                    title="Are you sure to delete this review?"
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      loading={fetchingDeleteServiceProviderReview}
                      size="small"
                    />
                  </Popconfirm>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => setIsEditing(true)}
                    size="small"
                  />
                </Space>,
              ]
            : undefined
        }
        author={<Rate disabled key="rating" value={review.rating} />}
        avatar={<UserAvatar user={review.author} />}
        className="review-card"
        content={
          <ReviewContent
            cons={review.cons}
            content={review.review}
            pros={review.pros}
          />
        }
        datetime={
          <Tooltip
            title={moment(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          >
            <ClockCircleOutlined />
          </Tooltip>
        }
      />
      <Drawer
        destroyOnClose={true}
        onClose={() => setIsEditing(false)}
        visible={isEditing}
      >
        <ReviewForm initialValues={review} />
      </Drawer>
    </>
  )
}
