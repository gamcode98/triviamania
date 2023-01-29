import { useState } from 'react'
import { AuthenticationNavigation } from '../../types/AuthenticationNavigation'
import { Authentication } from '../Authentication/Authentication'
import { LoginWithGoogle } from '../LoginWithGoogle/LoginWithGoogle'
import { Signup } from '../Signup/Signup'
import './GetStarted.css'

type ModalAction = 'open' | 'close' | null

interface Props {
  setModalAction: React.Dispatch<React.SetStateAction<ModalAction>>
}

const GetStarted = (props: Props): JSX.Element => {
  const { setModalAction } = props

  const [hideLoginWithGoogle, setHideLoginWithGoogle] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [authNavigation, setAuthNavigation] = useState<AuthenticationNavigation>('signup')

  const authentication = {
    // login: <Login handleCloseModalBtn={handleCloseModalBtn} />,
    signup: <Signup />
    // accountCreatedMessage: <AccountCreatedMessage />,
    // resetPassword: <ResetPassword />
  }

  return (
    <div>
      <button className='close-modal-btn' onClick={() => setModalAction('close')}>
        <i className='nes-icon close is-small' />
      </button>
      <LoginWithGoogle />
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
