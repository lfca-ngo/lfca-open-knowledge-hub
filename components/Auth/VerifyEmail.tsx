import { LoadingOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

export const VerifyEmail = ({ actionCode }: { actionCode: string }) => {
  const [error, setError] = useState('')
  const [validCode, setValidCode] = useState()
  const [verifiedCode, setVerifiedCode] = useState(false)

  const verifyCode = () => {
    // Try to apply the email verification code.
    // authRef.applyActionCode(this.props.actionCode).then(
    //   () => {
    //     // Email address has been verified.
    //     this.setState({ validCode: true, verifiedCode: true })
    //   },
    //   (error) => {
    //     // Code is invalid or expired. Ask the user to verify their email address
    //     // again.
    //     this.setState({
    //       error: error.message,
    //       validCode: false,
    //       verifiedCode: true,
    //     })
    //   }
    // )
  }

  useEffect(() => {
    if (actionCode) {
      verifyCode()
    }
  }, [actionCode])

  let component = null
  if (!verifiedCode) {
    component = <LoadingOutlined />
  } else if (verifiedCode && validCode) {
    component = (
      <div className="VerifyEmail">
        <h1>Your email has been verified</h1>
        <p>You can now sign in with your new account</p>
      </div>
    )
  } else if (verifiedCode && !validCode) {
    component = (
      <div className="VerifyEmail">
        <h1>Try verifying your email again</h1>
        <p className="error">{error}</p>
      </div>
    )
  }

  return component
}
