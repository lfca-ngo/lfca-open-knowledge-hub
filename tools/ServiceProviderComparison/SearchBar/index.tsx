import { SearchOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Popover, Select, Space } from 'antd'

const { Search } = Input

export const SearchBar = ({
  itemsCount,
  onSearch,
}: {
  itemsCount: number
  onSearch: (value: string) => void
}) => {
  return (
    <div className="search-bar">
      <div className="search-results-count">{itemsCount} results</div>
      <Divider />
      <Space>
        <Popover
          content={
            <Select placeholder="Please select" value="rating">
              <Select.Option key="rating" value="rating">
                Rating
              </Select.Option>
            </Select>
          }
        >
          <Button icon={<SortAscendingOutlined />} />
        </Popover>
        <Popover
          content={<Search onSearch={onSearch} placeholder="Search..." />}
        >
          <Button icon={<SearchOutlined />} />
        </Popover>
      </Space>
    </div>
  )
}
