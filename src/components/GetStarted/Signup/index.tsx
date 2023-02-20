/* eslint-disable react/jsx-indent */
import { Control, SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthenticationNavigation, ModalAction } from '../../../types'
import { FormControl } from '../../FormElements/FormControl'
import { Loader } from '../../Loader'
import { post } from '../../../services/publicApiService'
import { Data } from './../../../dto/signup.dto'
import { IAlert } from '../../../interfaces'
import './Signup.css'

const schema = yup.object({
  email: yup
    .string()
    .required()
    .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Must be a valid email address'),
  password: yup
    .string()
    .min(7, 'Too Short!')
    .max(17, 'Too Long!')
    .required()
    .matches(
      /^(?=.*?[A-ZÀ-Ú])(?=.*?[a-zà-ú])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Must contain at least one upper case letter, one lower case letter, one number and one special character'
    )
}).required()

interface Props {
  isLoading?: boolean
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setHideLoginWithGoogle?: React.Dispatch<React.SetStateAction<boolean>>
  setAuthNavigation?: React.Dispatch<React.SetStateAction<AuthenticationNavigation>>
  setAlert?: React.Dispatch<React.SetStateAction<IAlert>>
  setModalAction?: React.Dispatch<React.SetStateAction<ModalAction>>
}

interface IFormInputs {
  email: string
  password: string
}

const Signup = (props: Props): JSX.Element => {
  const { isLoading, setIsLoading, setHideLoginWithGoogle, setAuthNavigation, setAlert, setModalAction } = props

  const changeToLogin = (): void => setAuthNavigation?.('login')

  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: { email: '', password: '123okAsd@' },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    setHideLoginWithGoogle?.(true)
    setIsLoading?.(true)
    reset()

    post<IFormInputs, Data>('/auth/register', data)
      .then(() => {
        setAuthNavigation?.('message')
      })
      .catch((error) => {
        setAlert?.({ status: 'error', message: error.response.data.message, show: true })
        setHideLoginWithGoogle?.(false)
        setModalAction?.('close')
      })
      .finally(() => {
        setIsLoading?.(false)
      })
  }

  return (
    isLoading
      ? <Loader />
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
