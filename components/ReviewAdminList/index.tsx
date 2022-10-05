import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Drawer,
  List,
  message,
  Popconfirm,
  Tooltip,
} from 'antd'
import { useState } from 'react'

import {
  ServiceProviderReviewFragment,
  useDeleteServiceProviderReviewMutation,
  useServiceProviderReviewsQuery,
  useUpdateServiceProviderReviewMutation,
} from '../../services/lfca-backend'
import { ReviewForm } from '../ReviewForm'

const ReviewListItem = ({
  item,
  onApprove,
  onDelete,
  onEdit,
}: {
  item: ServiceProviderReviewFragment
  onApprove?: () => void
  onDelete?: (item: ServiceProviderReviewFragment) => void
  onEdit?: (item: ServiceProviderReviewFragment) => void
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
        <Button
          icon={<EditOutlined />}
          key="edit"
          onClick={() => onEdit?.(item)}
        >
          Edit
        </Button>,
        <Popconfirm
          cancelText="No"
          key="delete"
          okText="Yes"
          onConfirm={() => onDelete?.(item)}
          title="Are you sure to delete this review?"
        >
          <Button icon={<DeleteOutlined />} key="delete">
            Delete
          </Button>{' '}
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Tooltip title={`${item.author?.firstName}, ${item.author?.id}`}>
            <Avatar
              className="wine-inverse"
              icon={<UserOutlined />}
              size="large"
              src={item.author?.picture}
            />
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
  const [review, setReview] = useState<ServiceProviderReviewFragment>()

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

  const [
    { fetching: fetchingDeleteServiceProviderReview },
    deleteServiceProviderReview,
  ] = useDeleteServiceProviderReviewMutation()

  const data = reviewsData?.serviceProviderReviews.items || []

  return (
    <>
      <List
        className="simple-list review-admin-list"
        dataSource={data}
        loading={fetchingReviews || fetchingDeleteServiceProviderReview}
        renderItem={(item) => (
          <ReviewListItem
            item={item}
            onApprove={() =>
              refetchProviders({ requestPolicy: 'network-only' })
            }
            onDelete={(item) => {
              deleteServiceProviderReview({
                input: {
                  serviceProviderReviewId: item.id,
                },
              })
            }}
            onEdit={(item) => setReview(item)}
          />
        )}
      />
      <Drawer
        destroyOnClose={true}
        onClose={() => setReview(undefined)}
        open={!!review}
      >
        <ReviewForm initialValues={review} />
      </Drawer>
    </>
  )
}
