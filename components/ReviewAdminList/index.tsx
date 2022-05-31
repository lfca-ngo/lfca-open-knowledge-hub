require('./styles.less')

import {
  CheckOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, List, message, Tooltip } from 'antd'

import { ServiceProviderReviewFragment } from '../../services/lfca-backend'

export const ReviewsAdminList = () => {
  const approveReview = () => {
    // e.target.checked
  }

  const data = [
    {
      author: {
        firstName: 'Anna',
        id: '1',
      },
      cons: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
      id: '1',
      pros: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],

      rating: 4,
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      author: {
        firstName: 'Anna',
        id: '1',
      },
      cons: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
      id: '2',
      pros: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],

      rating: 4,
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ] as ServiceProviderReviewFragment[]

  return (
    <List
      className="simple-list review-admin-list"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              icon={<CheckOutlined />}
              key="approval"
              onChange={approveReview}
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
