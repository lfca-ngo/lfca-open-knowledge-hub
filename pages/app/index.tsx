import { Button } from 'antd'
import type { NextPage } from 'next'

import { SiderLayout } from '../../components/Layout'

const Home: NextPage = () => {
  return (
    <SiderLayout>
      Welcome
      <Button type="primary">Hallo</Button>
    </SiderLayout>
  )
}

export default Home
