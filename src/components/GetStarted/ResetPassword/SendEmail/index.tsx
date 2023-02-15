/* eslint-disable react/jsx-closing-tag-location */
import { Control, SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormControl } from '../../../FormElements/FormControl'
import { AuthenticationNavigation } from '../../../../types'
import { Loader } from '../../../Loader'
import './SendEmail.css'

interface Email {
  emailSent: boolean
  emailAddress: string
}

const schema = yup.object({
  email: yup
    .string()
    .required()
}).required()

interface IFormInputs {
  email: string
}

interface Props {
  setHideLoginWithGoogle?: React.Dispatch<React.SetStateAction<boolean>>
  setEmail: React.Dispatch<React.SetStateAction<Email>>
  setAuthNavigation?: React.Dispatch<React.SetStateAction<AuthenticationNavigation>>
  isLoading?: boolean
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const SendEmail = (props: Props): JSX.Element => {
  const { setHideLoginWithGoogle, setEmail, setAuthNavigation, isLoading, setIsLoading } = props

  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const { email } = data
    reset()
    setIsLoading?.(true)
    setTimeout(() => {
      setEmail({ emailSent: true, emailAddress: email })
      setIsLoading?.(false)
    }, 3000)
  }

  const goBackToLogin = (): void => {
    setHideLoginWithGoogle?.(false)
    setAuthNavigation?.('login')
  }

  return (
    isLoading
      ? <Loader />
      : <div className='send-email'>
        <h2 className='title'>Enter your email to <br /> reset password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='form-send-email'>
          <FormControl
            control={(control as unknown) as Control<FieldValues>}
            name='email'
            rules={{ required: true }}
            labelId={`${crypto.randomUUID()}-email-to-reset-password`}
            typeOfInput='text'
            placeholder='Email'
          />
          <button className='nes-btn is-primary btn'>Reset password</button>
          <button type='button' className='btn cancel' onClick={goBackToLogin}>
            Cancel
          </button>
        </form>
      </div>
  )
}

export { SendEmail }
