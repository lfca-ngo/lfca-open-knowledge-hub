require('./styles.less')

import { List } from 'antd'

import { useServiceProviderReviewsQuery } from '../../../services/lfca-backend'
import { ReviewCard } from '../ReviewCard'

interface ReviewsListProps {
  serviceProviderContentId?: string
}

export const ReviewsList = ({ serviceProviderContentId }: ReviewsListProps) => {
  // TODO: UI for error state
  // TODO: Render skeleton whil loading
  const [{ data, fetching }] = useServiceProviderReviewsQuery({
    pause: !serviceProviderContentId,
    variables: {
      input: {
        serviceProviderContentId: serviceProviderContentId || '',
      },
    },
  })

  return (
    <div>
      <h2>Reviews</h2>
      <List
        className="reviews-list"
        dataSource={data?.serviceProviderReviews}
        loading={fetching}
        renderItem={(item) => (
          <List.Item>
            <ReviewCard review={item} />
          </List.Item>
        )}
      />
    </div>
  )
}
