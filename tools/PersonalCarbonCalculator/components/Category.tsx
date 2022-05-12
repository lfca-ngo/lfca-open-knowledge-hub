import React from 'react'
import {
  HomeOutlined,
  MenuOutlined,
  CoffeeOutlined,
  ThunderboltOutlined,
  CarOutlined,
  SkinOutlined,
} from '@ant-design/icons'

export const CustomIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Mobility':
      return <CarOutlined />
    case 'Diet':
      return <CoffeeOutlined />
    case 'Energy':
      return <ThunderboltOutlined />
    case 'Housing':
      return <HomeOutlined />
    case 'Consumption':
      return <SkinOutlined />
    case 'General':
      return <MenuOutlined />
    default:
      return null
  }
}

export const Category = ({ category }: { category: string }) => {
  return (
    <div className="category">
      <CustomIcon category={category} />
      {category}
    </div>
  )
}
