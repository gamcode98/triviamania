/* eslint-disable react/jsx-indent */
import { Control, SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import loaderGif from './../../assets/loader.gif'
import { AuthenticationNavigation } from '../../types/AuthenticationNavigation'
import { FormControl } from '../FormControl/FormControl'

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
      ? <img src={loaderGif} width={50} className='block mx-auto' />
      : <form onSubmit={handleSubmit(onSubmit)}>
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
            className='bg-black font-bold text-white p-2 rounded-md w-full mb-4 hover:-translate-y-0.5 ease-linear duration-100 will-change-transform '
          >Create account
          </button>

          <div className='flex gap-1 justify-center'>
            <p className='text-center text-dark-gray'>Already have an account?</p>
            <button
              type='button'
              className='text-green hover:underline decoration-1 '
              onClick={changeToLogin}
            > Log in
            </button>
          </div>
        </form>
  )
}

export { Signup }
