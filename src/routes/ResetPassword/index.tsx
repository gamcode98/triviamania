/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react'
import { Loader } from '../../components/Loader'
import { ResetPasswordForm } from '../../components/ContentToResetPassword/ResetPasswordForm'
import './ResetPassword.css'
import { Message } from '../../components/ContentToResetPassword/Message'
import { ResetPasswordNavigation } from '../../types'

const ResetPassword = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resetPasswordNavigation, setResetPasswordNavigation] = useState<ResetPasswordNavigation>('resetPasswordForm')

  const content = {
    resetPasswordForm: <ResetPasswordForm setIsLoading={setIsLoading} setResetPasswordNavigation={setResetPasswordNavigation} />,
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
          />}
    </div>
  )
}

export { ResetPassword }
