import { ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Button, List } from 'antd'

import { UserFragment } from '../../services/lfca-backend'

interface ConnectedUsersListProps {
  items: UserFragment[]
  loading: boolean
  onSelectItem: (user: UserFragment) => void
}

export const ConnectedUsersList = ({
  items,
  loading,
  onSelectItem,
}: ConnectedUsersListProps) => {
  return (
    <List
      className="simple-list"
      dataSource={items || []}
      header={<h3>Connected users</h3>}
      loading={loading}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              icon={<ArrowRightOutlined />}
              key="openUserForm"
              onClick={() => onSelectItem(item)}
              type="text"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.picture} />}
            description={
              <>
                {item.roles.join(', ')}
                <br />
                {item.email}
              </>
            }
            title={`${item.firstName} ${item.lastName}`}
          />
        </List.Item>
      )}
    />
  )
}
