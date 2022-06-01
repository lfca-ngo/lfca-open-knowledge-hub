require('./styles.less')

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

export const ReviewsAdminList = () => {
  const [{ data: reviewsData, fetching: fetchingReviews }, refetchProviders] =
    useServiceProviderReviewsQuery({
      variables: {
        input: {
          filter: {
            approved: false,
          },
          take: 100,
        },
      },
    })
  const [{ fetching: updating }, updateServiceProviderReview] =
    useUpdateServiceProviderReviewMutation()

  const approveReview = (review: ServiceProviderReviewFragment) => {
    updateServiceProviderReview({
      input: {
        approved: true,
        id: review.id,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        message.success('Review approved')
        refetchProviders({ requestPolicy: 'network-only' })
      }
    })
  }

  const data = reviewsData?.serviceProviderReviews.items || []

  return (
    <List
      className="simple-list review-admin-list"
      dataSource={data}
      loading={fetchingReviews}
      renderItem={(item) => (
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
      )}
    />
  )
}
