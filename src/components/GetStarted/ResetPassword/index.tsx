/* eslint-disable react/jsx-indent */
import { useState } from 'react'
import { IAlert } from '../../../interfaces'
import { AuthenticationNavigation } from '../../../types'
import { EmailMessage } from './EmailMessage'
import { SendEmail } from './SendEmail'

interface Email {
  emailSent: boolean
  emailAddress: string
}

interface Props {
  isLoading?: boolean
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setHideLoginWithGoogle?: React.Dispatch<React.SetStateAction<boolean>>
  setAuthNavigation?: React.Dispatch<React.SetStateAction<AuthenticationNavigation>>
  setAlert?: React.Dispatch<React.SetStateAction<IAlert>>
}

const ResetPassword = (props: Props): JSX.Element => {
  const { isLoading, setIsLoading, setHideLoginWithGoogle, setAuthNavigation, setAlert } = props

  const [email, setEmail] = useState<Email>({
    emailSent: false,
    emailAddress: ''
  })

  return (
    email.emailSent
      ? <EmailMessage
          emailAddress={email.emailAddress}
          setHideLoginWithGoogle={setHideLoginWithGoogle}
          setAuthNavigation={setAuthNavigation}
        />
      : <SendEmail
          setHideLoginWithGoogle={setHideLoginWithGoogle}
          setEmail={setEmail}
          setAuthNavigation={setAuthNavigation}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setAlert={setAlert}
        />
  )
}

export { ResetPassword }
