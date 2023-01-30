import { useState } from 'react'
import { AuthenticationNavigation } from '../../types/AuthenticationNavigation'
import { ModalAction } from '../../types/ModalAction'
import { AccountCreatedMessage } from '../AccountCreatedMessage/AccountCreatedMessage'
import { Authentication } from '../Authentication/Authentication'
import { Login } from '../Login/Login'
import { LoginWithGoogle } from '../LoginWithGoogle/LoginWithGoogle'
import { ResetPassword } from '../ResetPassword/ResetPassword'
import { Signup } from '../Signup/Signup'
import './GetStarted.css'

interface Props {
  loginIsPressed?: boolean
  setLoginIsPressed: React.Dispatch<React.SetStateAction<boolean>>
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
    accountCreatedMessage: <AccountCreatedMessage />,
    resetPassword: <ResetPassword />
  }

  const handleCloseModal = (): void => {
    setAuthNavigation('signup')
    setHideLoginWithGoogle(false)
    setLoginIsPressed(false)
    setModalAction('close')
  }

  return (
    <div>
      <button className='close-modal-btn' onClick={handleCloseModal}>
        <i className='nes-icon close is-small' />
      </button>
      {!hideLoginWithGoogle && <LoginWithGoogle isLoading={isLoading} />}
      <Authentication
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setAuthNavigation={setAuthNavigation}
        setHideLoginWithGoogle={setHideLoginWithGoogle}
      >
        {authentication[authNavigation as keyof typeof authentication] || <Signup />}
      </Authentication>
    </div>
  )
}

export { GetStarted }
