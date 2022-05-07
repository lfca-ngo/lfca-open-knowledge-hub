import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from 'antd'

const Home: NextPage = () => {
  return (
    <div>
      Welcome
      <Button type='primary'>Hallo</Button>
    </div>
  )
}

export default Home
