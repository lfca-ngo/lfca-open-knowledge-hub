import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from 'antd'
import { SiderLayout } from '../components/Layout'

const Home: NextPage = () => {
  return (
    <SiderLayout breadcrumbs={[{ text: 'Home', link: '/admin' }]}>
      Welcome
      <Button type='primary'>Hallo</Button>
    </SiderLayout>
  )
}

export default Home
