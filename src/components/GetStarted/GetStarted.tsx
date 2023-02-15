import { useState } from 'react'
import { AuthenticationNavigation, ModalAction } from '../../types'
import { Message } from './Message'
import { Wrapper } from './Wrapper'
import { Login } from './Login'
import { LoginWithGoogle } from './LoginWithGoogle'
import { ResetPassword } from './ResetPassword'
import { Signup } from './Signup'
import './GetStarted.css'

interface Props {
  loginIsPressed?: boolean
  setLoginIsPressed?: React.Dispatch<React.SetStateAction<boolean>>
  setModalAction: React.Dispatch<React.SetStateAction<ModalAction>>
}

const GetStarted = (props: Props): JSX.Element => {
  const { loginIsPressed, setLoginIsPressed, setModalAction } = props

  const [hideLoginWithGoogle, setHideLoginWithGoogle] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [authNavigation, setAuthNavigation] = useState<AuthenticationNavigation>(loginIsPressed !== undefined ? 'login' : 'signup')

  const authentication = {
    login: <Login setModalAction={setModalAction} />,
    signup: <Signup />,
    message: <Message />,
    resetPassword: <ResetPassword />
  }

  const handleCloseModal = (): void => {
    setModalAction('close')
    setAuthNavigation('signup')
    setHideLoginWithGoogle(false)
    setLoginIsPressed?.(false)
  }

  return (
    <div>
      <button
        disabled={isLoading}
        className={`close-modal-btn ${isLoading && 'cursor-wait'}`}
        onClick={handleCloseModal}
      >
        <i className='nes-icon close is-small' />
      </button>
      {!hideLoginWithGoogle && <LoginWithGoogle isLoading={isLoading} />}
      <Wrapper
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setAuthNavigation={setAuthNavigation}
        setHideLoginWithGoogle={setHideLoginWithGoogle}
      >
        {authentication[authNavigation as keyof typeof authentication] || <Signup />}
      </Wrapper>
    </div>
  )
}

export { GetStarted }
