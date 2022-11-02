import { MailOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, message, Space } from 'antd'
import { useRouter } from 'next/router'

import { useFirebase } from '../../../hooks/firebase'
import { useUser } from '../../../hooks/user'
import { useResendEmailVerificationMutation } from '../../../services/lfca-backend'
import styles from './styles.module.less'

const VerifyEmailBarContent = () => {
  const { user } = useUser()

  const [{ fetching }, resendEmailVerification] =
    useResendEmailVerificationMutation()

  const handleClick = () => {
    resendEmailVerification({
      input: {
        userId: user?.id,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else {
        message.success('Check your Emails')
      }
    })
  }

  return (
    <div className={styles['email-verification-bar']}>
      <Space>
        <MailOutlined />
        Please confirm your email: {user?.email}
        <Button
          ghost
          icon={<RedoOutlined />}
          loading={fetching}
          onClick={handleClick}
          size="small"
        >
          Resend
        </Button>
      </Space>
    </div>
  )
}

// The TopBar lives outside of the classical layout so
// we need to make sure that it gets only rendered if
// the user is logged in, otherwise we might run into
// caching problems of the useUser query
export const VerifyEmailBar = ({ hideOnPaths }: { hideOnPaths: string[] }) => {
  const { emailVerified } = useFirebase()
  const { asPath } = useRouter()
  const cleanPath = asPath.replace(/\//, '')
  const emailIsNotVerified =
    typeof emailVerified === 'boolean' && !emailVerified

  return !emailIsNotVerified ||
    hideOnPaths.findIndex((p) => p === cleanPath) > -1 ? null : (
    <VerifyEmailBarContent />
  )
}
