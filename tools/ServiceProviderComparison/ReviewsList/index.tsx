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
        grid={{
          gutter: 16,
          lg: 2,
          md: 2,
          sm: 1,
          xl: 2,
          xs: 1,
          xxl: 2,
        }}
        renderItem={(item) => (
          <List.Item>
            <ReviewCard review={item} />
          </List.Item>
        )}
      />
    </div>
  )
}
