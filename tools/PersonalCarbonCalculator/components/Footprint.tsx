import React from 'react'
import { Card } from 'antd'
import CountUp from 'react-countup'

export const Footprint = ({ footprint }: { footprint: number }) => {
  return (
    <div className="footprint">
      <p>Your footprint</p>
      <Card bordered={false}>
        <h1>
          <CountUp
            duration={0.5}
            useEasing={false}
            end={footprint}
            preserveValue={true}
            decimals={2}
          />
        </h1>
        <span className="sub">t CO2</span>
      </Card>
    </div>
  )
}
