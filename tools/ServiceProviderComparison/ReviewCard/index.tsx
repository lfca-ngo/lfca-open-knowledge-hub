require('./styles.less')

import {
  ClockCircleOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons'
import { Comment, Rate, Tooltip } from 'antd'
import moment from 'moment'

import { UserAvatar } from '../../../components/UserAvatar'
import { ServiceProviderReviewFragment } from '../../../services/lfca-backend'

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
  return (
    <Comment
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
        <Tooltip title={moment(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
          <ClockCircleOutlined />
        </Tooltip>
      }
    />
  )
}
