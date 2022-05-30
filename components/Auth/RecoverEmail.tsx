import { LoadingOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

export const RecoverEmail = ({ actionCode }: { actionCode?: string }) => {
  const [error, setError] = useState('')
  const [restoredEmail, setRestoredEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [validCode, setValidCode] = useState()
  const [verifiedCode, setVerifiedCode] = useState(false)

  const verifyCode = () => {
    // Confirm the action code is valid.
    // authRef
    //   .checkActionCode(this.props.actionCode)
    //   .then(info => {
    //     // Get the restored email address.
    //     const restoredEmail = info['data']['email'];
    //     // Revert to the old email.
    //     authRef
    //       .applyActionCode(this.props.actionCode)
    //       .then(() => {
    //         // Account email reverted to restoredEmail
    //         this.setState({ restoredEmail, validCode: true, verifiedCode: true });
    //       });
    //   }, error => {
    //     // Invalid code.
    //     this.setState({ error: error.message, validCode: false, verifiedCode: true });
    //   });
  }

  const sendReset = () => {
    // You might also want to give the user the option to reset their password
    // in case the account was compromised:
    // authRef
    //   .sendPasswordResetEmail(this.state.restoredEmail)
    //   .then(() => {
    //     // Password reset confirmation sent. Ask user to check their email.
    //     this.setState({ resetSent: true });
    //   });
  }

  useEffect(() => {
    if (actionCode) {
      verifyCode()
    }
  }, [actionCode])

  let component = null
  if (!verifiedCode) {
    component = <LoadingOutlined />
  } else if (resetSent) {
    component = (
      <div className="RecoverEmail">
        <h1>Check your email</h1>
        <p>
          Follow the instructions sent to <span>{restoredEmail}</span> to
          recover your password.
        </p>
      </div>
    )
  } else if (verifiedCode && validCode) {
    component = (
      <div className="RecoverEmail">
        <h1>Updated email address</h1>
        <p>
          Your sign-in email address has been changed back to{' '}
          <span>{restoredEmail}</span>
        </p>
        <p>
          If you did not change your sign-in email, it is possible someone is
          trying to access your account and you should
          <button onClick={this.sendReset}>
            change your password right away
          </button>
        </p>
      </div>
    )
  } else if (verifiedCode && !validCode) {
    component = (
      <div className="RecoverEmail">
        <h1>Unable to update your email address</h1>
        <p>There was a problem changing your sign-in email back.</p>
        <p className="error">{error}</p>
      </div>
    )
  }

  return component
}
