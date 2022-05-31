import type { NextPage } from 'next'
import React from 'react'

import { ForgotPassword } from '../components/Auth'
import { OneColLayout } from '../components/Layout'

const ForgotPasswordPage: NextPage = () => {
  return (
    <OneColLayout>
      <ForgotPassword />
    </OneColLayout>
  )
}

export default ForgotPasswordPage
