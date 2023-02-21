/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react'
import { Loader } from '../../components/Loader'
import { ResetPasswordForm } from '../../components/ContentToResetPassword/ResetPasswordForm'
import './ResetPassword.css'
import { Message } from '../../components/ContentToResetPassword/Message'
import { ResetPasswordNavigation } from '../../types'
import { Alert } from '../../components/Alert'
import { IAlert } from '../../interfaces'

const ResetPassword = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resetPasswordNavigation, setResetPasswordNavigation] = useState<ResetPasswordNavigation>('resetPasswordForm')
  const [alert, setAlert] = useState<IAlert>({
    status: 'success',
    show: false,
    message: ''
  })

  const content = {
    resetPasswordForm: <ResetPasswordForm
      setIsLoading={setIsLoading}
      setResetPasswordNavigation={setResetPasswordNavigation}
      setAlert={setAlert}
                       />,
    message: <Message />

  }

  return (
    <div className='reset-password-container'>
      {isLoading
        ? <div className='loader-container'>
          <Loader />
          <p className='paragraph'>Loading...</p>
        </div>
        : content[resetPasswordNavigation] ||
          <ResetPasswordForm
            setIsLoading={setIsLoading}
            setResetPasswordNavigation={setResetPasswordNavigation}
            setAlert={setAlert}
          />}
      <Alert alert={alert} setAlert={setAlert} />
    </div>
  )
}

export { ResetPassword }
