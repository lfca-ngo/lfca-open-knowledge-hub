import { Rate } from 'antd'

import { Review } from '../index'

interface ReviewCardProps {
  review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="review-card">
      <div className="review-author">{review.author}</div>
      <div className="review-content">{review.content}</div>
      <div className="review-rate">
        <Rate value={review.rating} />
      </div>
    </div>
  )
}
