import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { RecoverEmail, ResetPassword, VerifyEmail } from '../components/Auth'
import { OneColLayout } from '../components/Layout'

interface ModeProps {
  actionCode: string
  mode: 'recoverEmail' | 'resetPassword' | 'verifyEmail' | string
}

const Mode = ({ actionCode, mode }: ModeProps) => {
  switch (mode) {
    case 'recoverEmail':
      return <RecoverEmail actionCode={actionCode} />
    case 'resetPassword':
      return <ResetPassword actionCode={actionCode} />
    case 'verifyEmail':
      return <VerifyEmail actionCode={actionCode} />
    default:
      return null
  }
}

const AccountActions: NextPage = () => {
  const router = useRouter()
  const { mode, oobCode: actionCode } = router.query

  return (
    <OneColLayout>
      <Mode actionCode={`${actionCode}`} mode={`${mode}`} />
    </OneColLayout>
  )
}

export default AccountActions
