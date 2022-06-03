import {
  CheckOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, List, message, Tooltip } from 'antd'

import {
  ServiceProviderReviewFragment,
  useServiceProviderReviewsQuery,
  useUpdateServiceProviderReviewMutation,
} from '../../services/lfca-backend'

const ReviewListItem = ({
  item,
  onApprove,
}: {
  item: ServiceProviderReviewFragment
  onApprove?: () => void
}) => {
  const [{ fetching: updating }, updateServiceProviderReview] =
    useUpdateServiceProviderReviewMutation()

  const approveReview = (review: ServiceProviderReviewFragment) => {
    updateServiceProviderReview({
      input: {
        id: review.id,
        isApproved: true,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        message.success('Review approved')
        onApprove?.()
      }
    })
  }

  return (
    <List.Item
      actions={[
        <Button
          icon={<CheckOutlined />}
          key="approval"
          loading={updating}
          onClick={() => approveReview(item)}
          type="primary"
        >
          Approve
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Tooltip title={`${item.author?.firstName}, ${item.author?.id}`}>
            <Avatar className="wine-inverse" icon={<UserOutlined />} />
          </Tooltip>
        }
        description={
          <div className="pros-cons">
            <List
              className="info-list-sm"
              dataSource={item.pros}
              renderItem={(item) => (
                <List.Item>
                  <PlusCircleFilled className="green" /> {item}
                </List.Item>
              )}
              size="small"
            />
            <List
              className="info-list-sm"
              dataSource={item.cons}
              renderItem={(item) => (
                <List.Item>
                  <MinusCircleFilled className="wine" /> {item}
                </List.Item>
              )}
              size="small"
            />
          </div>
        }
        title={item.review}
      />
    </List.Item>
  )
}

export const ReviewsAdminList = () => {
  const [{ data: reviewsData, fetching: fetchingReviews }, refetchProviders] =
    useServiceProviderReviewsQuery({
      variables: {
        input: {
          filter: {
            isApproved: false,
          },
          take: 100,
        },
      },
    })

  const data = reviewsData?.serviceProviderReviews.items || []

  return (
    <List
      className="simple-list review-admin-list"
      dataSource={data}
      loading={fetchingReviews}
      renderItem={(item) => (
        <ReviewListItem
          item={item}
          onApprove={() => refetchProviders({ requestPolicy: 'network-only' })}
        />
      )}
    />
  )
}
