/* eslint-disable react/jsx-indent */
import { Control, SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { FormControl } from '../../FormElements/FormControl'
import { AuthenticationNavigation, ModalAction } from '../../../types'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { Loader } from '../../Loader'
import { post } from '../../../services/publicApiService'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { Data } from '../../../dto/login.dto'
import './Login.css'
import { IAlert } from '../../../interfaces'

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
  setHideLoginWithGoogle?: React.Dispatch<React.SetStateAction<boolean>>
  isLoading?: boolean
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setAuthNavigation?: React.Dispatch<React.SetStateAction<AuthenticationNavigation>>
  setModalAction: React.Dispatch<React.SetStateAction<ModalAction>>
  setAlert?: React.Dispatch<React.SetStateAction<IAlert>>
}

interface IFormInputs {
  email: string
  password: string
}

const Login = (props: Props): JSX.Element => {
  const { setHideLoginWithGoogle, isLoading, setIsLoading, setAuthNavigation, setModalAction, setAlert } = props
  const [, setToken] = useLocalStorage('token', '')

  const { setCurrentUser } = useCurrentUser()

  const navigate = useNavigate()

  const goToSignup = (): void => setAuthNavigation?.('signup')

  const goToResetPassword = (): void => {
    setHideLoginWithGoogle?.(true)
    setAuthNavigation?.('resetPassword')
  }

  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: { email: 'carlopez@gmail.com', password: '123okAsd@' },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    setIsLoading?.(true)
    setHideLoginWithGoogle?.(true)
    reset()
    post<IFormInputs, Data>('/auth/login', data)
      .then(data => {
        const { user, token } = data.data.response
        setCurrentUser(user)
        setToken(token)
        navigate('/trivia-game-settings')
      })
      .catch(() => {
        setAlert?.({ message: 'User or password incorrect', show: true, status: 'error' })
      })
      .finally(() => {
        setHideLoginWithGoogle?.(false)
        setIsLoading?.(false)
        setModalAction('close')
      })
  }

  return (
    isLoading
      ? <Loader />
      : <form onSubmit={handleSubmit(onSubmit)} className='form-login'>
        <FormControl
          control={(control as unknown) as Control<FieldValues>}
          name='email'
          rules={{ required: true }}
          labelId={`${crypto.randomUUID()}-email-to-login`}
          typeOfInput='text'
          placeholder='Email'
        />

        <FormControl
          control={(control as unknown) as Control<FieldValues>}
          name='password'
          rules={{ required: true }}
          labelId={`${crypto.randomUUID()}-password-to-login`}
          typeOfInput='password'
          placeholder='Password'
        />

        <button className='nes-btn is-primary btn'>Log in</button>
        <button
          type='button'
          className='nes-text is-primary reset-pasword'
          onClick={goToResetPassword}
        >Reset password
        </button>
        <div className='flex justify-center gap-1 has-not-account'>
          <p className='paragraph'>No account? </p>
          <button
            type='button'
            className='nes-text is-primary'
            onClick={goToSignup}
          >Create one
          </button>
        </div>
        </form>
  )
}

export { Login }
