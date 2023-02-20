/* eslint-disable react/jsx-indent */
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Loader } from '../../Loader'
import { FormControl } from '../../FormElements/FormControl'
import { ChangePasswordNavigation } from '../../../types'
import './ChangePassword.css'
import { patch } from '../../../services/privateApiService'
import { IAlert } from '../../../interfaces'

const schema = yup.object({
  oldPassword: yup
    .string()
    .required()
    .min(7, 'Too Short!')
    .max(17, 'Too Long!')
    .matches(
      /^(?=.*?[A-ZÀ-Ú])(?=.*?[a-zà-ú])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Must contain at least one upper case letter, one lower case letter, one number and one special character'
    ),
  newPassword: yup
    .string()
    .required()
    .min(7, 'Too Short!')
    .max(17, 'Too Long!')
    .matches(
      /^(?=.*?[A-ZÀ-Ú])(?=.*?[a-zà-ú])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Must contain at least one upper case letter, one lower case letter, one number and one special character'
    )
}).required()

interface Props {
  isLoading?: boolean
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setOptionsNavigation?: React.Dispatch<React.SetStateAction<ChangePasswordNavigation>>
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>
}

interface IFormInputs {
  oldPassword: string
  newPassword: string
}

const ChangePassword = (props: Props): JSX.Element => {
  const { isLoading, setIsLoading, setOptionsNavigation, setAlert } = props

  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: { oldPassword: '', newPassword: '' },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    setIsLoading?.(true)
    reset()

    patch<IFormInputs, unknown>('/users/change-password', data)
      .then(() => {
        setIsLoading?.(false)
        setOptionsNavigation?.('message')
      })
      .catch(error => {
        setIsLoading?.(false)
        setAlert({ status: 'error', message: error.response.data.message, show: true })
      })
  }

  return (
    isLoading
      ? <Loader />
      : <form onSubmit={handleSubmit(onSubmit)} className='form-change-password'>
        <h2 className='title'>Change password</h2>
        <FormControl
          control={(control as unknown) as Control<FieldValues>}
          name='oldPassword'
          rules={{ required: true }}
          labelId='old-password'
          typeOfInput='password'
          placeholder='Old password'
        />

        <FormControl
          control={(control as unknown) as Control<FieldValues>}
          name='newPassword'
          rules={{ required: true }}
          labelId='new-password'
          typeOfInput='password'
          placeholder='New password'
        />

        <button className='nes-btn is-primary btn'>Submit</button>
        </form>
  )
}

export { ChangePassword }
