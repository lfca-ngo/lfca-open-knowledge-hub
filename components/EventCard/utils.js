import { AlibabaOutlined, BulbOutlined, HeartOutlined } from '@ant-design/icons'

const contains = (string, word) => string.indexOf(word) > -1

export const matchStringToIcon = (s) => {
  if (contains(s, 'Ecommerce')) return <AlibabaOutlined />
  if (contains(s, 'Energy')) return <BulbOutlined />
  return <HeartOutlined />
}
