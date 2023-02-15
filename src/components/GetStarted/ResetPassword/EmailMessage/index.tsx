import { AuthenticationNavigation } from '../../../../types'
import './EmailMessage.css'

interface Props {
  emailAddress: string
  setHideLoginWithGoogle?: React.Dispatch<React.SetStateAction<boolean>>
  setAuthNavigation?: React.Dispatch<React.SetStateAction<AuthenticationNavigation>>
}
const EmailMessage = (props: Props): JSX.Element => {
  const { emailAddress, setHideLoginWithGoogle, setAuthNavigation } = props

  const goBackToLogin = (): void => {
    setHideLoginWithGoogle?.(false)
    setAuthNavigation?.('login')
  }

  return (
    <div className='email-message'>
      <p className='paragraph'>If an account exists for {emailAddress}, you will get an email with instructions on resetting your password.</p>
      <p className='paragraph'>If it doesn't arrive, be sure to check your spam folder.</p>
      <button
        className='nes-text is-primary btn'
        onClick={goBackToLogin}
      >Back to Log in
      </button>
    </div>
  )
}

export { EmailMessage }
