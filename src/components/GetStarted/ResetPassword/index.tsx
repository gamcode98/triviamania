/* eslint-disable react/jsx-indent */
import { useState } from 'react'
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
}

const ResetPassword = (props: Props): JSX.Element => {
  const { isLoading, setIsLoading, setHideLoginWithGoogle, setAuthNavigation } = props

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
        />
  )
}

export { ResetPassword }
