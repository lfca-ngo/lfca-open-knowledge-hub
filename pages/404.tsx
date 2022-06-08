import { Button } from 'antd'
import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

import { OneColLayout } from '../components/Layout'

const SignIn: NextPage = () => {
  return (
    <OneColLayout>
      <h1>404 - Page not found</h1>
      <p>This page does not exist. Try this one instead</p>
      <Link href="/">
        <Button size="large" type="primary">
          Take me home
        </Button>
      </Link>
    </OneColLayout>
  )
}

export default SignIn
