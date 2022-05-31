require('./styles.less')

import { PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, List } from 'antd'
import { useState } from 'react'

import { Section } from '../../../components/Layout'
import { ReviewForm } from '../../../components/ReviewForm'
import { useServiceProviderReviewsQuery } from '../../../services/lfca-backend'
import { ReviewCard } from '../ReviewCard'

interface ReviewsListProps {
  serviceProviderContentId?: string
}

export const ReviewsList = ({ serviceProviderContentId }: ReviewsListProps) => {
  const [newReviewOpen, setNewReviewOpen] = useState(false)

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
      <Button
        block
        icon={<PlusOutlined />}
        onClick={() => setNewReviewOpen(true)}
        size="large"
        type="primary"
      >
        Add a review
      </Button>
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
      <Drawer
        className="drawer-md"
        onClose={() => setNewReviewOpen(false)}
        visible={newReviewOpen}
      >
        <Section title="Leave a review">
          <ReviewForm />
        </Section>
      </Drawer>
    </div>
  )
}
