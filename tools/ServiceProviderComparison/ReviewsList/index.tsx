require('./styles.less')

import { List } from 'antd'

import { Review } from '..'
import { ReviewCard } from '../ReviewCard'

export const ReviewsList = ({ reviews = [] }: { reviews?: Review[] }) => {
  return (
    <div>
      <h2>Reviews</h2>
      <List
        className="reviews-list"
        dataSource={reviews}
        renderItem={(item) => (
          <List.Item>
            <ReviewCard review={item} />
          </List.Item>
        )}
      />
    </div>
  )
}
