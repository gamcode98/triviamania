import { AuthenticationNavigation } from '../../types/AuthenticationNavigation'
import './AccountCreatedMessage.css'

interface Props {
  setHideLoginWithGoogle?: React.Dispatch<React.SetStateAction<boolean>>
  setAuthNavigation?: React.Dispatch<React.SetStateAction<AuthenticationNavigation>>
}

const AccountCreatedMessage = (props: Props): JSX.Element => {
  const { setHideLoginWithGoogle, setAuthNavigation } = props

  const backToLogin = (): void => {
    setHideLoginWithGoogle?.(false)
    setAuthNavigation?.('login')
  }

  return (
    <div className='account-created-message'>
      <h2 className='title'>Your account was <br /> created successfully</h2>
      <button
        onClick={backToLogin}
        className='nes-text is-primary back-to-login'
      >Back to Log in
      </button>
    </div>
  )
}

export { AccountCreatedMessage }
