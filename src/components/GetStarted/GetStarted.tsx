import { useState } from 'react'
import { AuthenticationNavigation } from '../../types/AuthenticationNavigation'
import { ModalAction } from '../../types/ModalAction'
import { AccountCreatedMessage } from '../AccountCreatedMessage/AccountCreatedMessage'
import { Authentication } from '../Authentication/Authentication'
import { Login } from '../Login/Login'
import { LoginWithGoogle } from '../LoginWithGoogle/LoginWithGoogle'
import { Signup } from '../Signup/Signup'
import './GetStarted.css'

interface Props {
  setModalAction: React.Dispatch<React.SetStateAction<ModalAction>>
}

const GetStarted = (props: Props): JSX.Element => {
  const { setModalAction } = props

  const [hideLoginWithGoogle, setHideLoginWithGoogle] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [authNavigation, setAuthNavigation] = useState<AuthenticationNavigation>('signup')

  const authentication = {
    login: <Login setModalAction={setModalAction} />,
    signup: <Signup />,
    accountCreatedMessage: <AccountCreatedMessage />
    // resetPassword: <ResetPassword />
  }

  return (
    <div>
      <button className='close-modal-btn' onClick={() => setModalAction('close')}>
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
