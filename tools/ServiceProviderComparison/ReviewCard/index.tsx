require('./styles.less')

import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import { Avatar, Comment, Rate, Tooltip } from 'antd'
import moment from 'moment'

import { Review } from '../index'

interface ReviewCardProps {
  review: Review
}

const ReviewContent = ({ content }: { content?: string }) => {
  return (
    <div className="review-content">
      <div className="general">{content}</div>
      <div className="details">
        <div className="details-item">
          <PlusCircleFilled className="green" /> <span>Great service</span>
        </div>
        <div className="details-item">
          <MinusCircleFilled className="wine" /> <span>Expensive</span>
        </div>
      </div>
    </div>
  )
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Comment
      actions={[<Rate disabled key="rating" value={review.rating} />]}
      author={review.author}
      avatar={<Avatar>{review.author}</Avatar>}
      content={<ReviewContent content={review.content} />}
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  )
}
