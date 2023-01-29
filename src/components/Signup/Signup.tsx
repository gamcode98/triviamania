/* eslint-disable react/jsx-indent */
import { Control, SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import loaderGif from './../../assets/loader.gif'
import { AuthenticationNavigation } from '../../types/AuthenticationNavigation'
import { FormControl } from '../FormControl/FormControl'
import './Signup.css'

const schema = yup.object({
  email: yup
    .string()
    .required(),
  password: yup
    .string()
    .required()
}).required()

interface Props {
  isLoading?: boolean
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setHideLoginWithGoogle?: React.Dispatch<React.SetStateAction<boolean>>
  setAuthNavigation?: React.Dispatch<React.SetStateAction<AuthenticationNavigation>>
}

interface IFormInputs {
  email: string
  password: string
}

const Signup = (props: Props): JSX.Element => {
  const { isLoading, setIsLoading, setHideLoginWithGoogle, setAuthNavigation } = props

  const changeToLogin = (): void => setAuthNavigation?.('login')

  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const { email, password } = data
    console.log({ email }, { password })
    setHideLoginWithGoogle?.(true)
    setIsLoading?.(true)
    reset()
    setTimeout(() => {
      setIsLoading?.(false)
      setAuthNavigation?.('accountCreatedMessage')
    }, 3000)
  }

  return (
    isLoading
      ? <img src={loaderGif} width={20} />
      : <form onSubmit={handleSubmit(onSubmit)} className='form-signup'>
          <FormControl
            control={(control as unknown) as Control<FieldValues>}
            name='email'
            rules={{ required: true }}
            labelId={`${crypto.randomUUID()}-email-to-signup`}
            typeOfInput='text'
            placeholder='Email'
          />

          <FormControl
            control={(control as unknown) as Control<FieldValues>}
            name='password'
            rules={{ required: true }}
            labelId={`${crypto.randomUUID()}-password-to-signup`}
            typeOfInput='password'
            placeholder='Password'
          />

          <button
            className='nes-btn is-primary btn'
          >Create account
          </button>

          <div className='has-account'>
            <p className='paragraph'>Already have an account?</p>
            <button
              type='button'
              className='nes-text is-primary go-to-login'
              onClick={changeToLogin}
            > Login
            </button>
          </div>
        </form>
  )
}

export { Signup }
