/* eslint-disable react/jsx-indent */
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Loader } from '../../Loader'
import { FormControl } from '../../FormElements/FormControl'
import { ChangePasswordNavigation } from '../../../types'
import './ChangePassword.css'

const schema = yup.object({
  oldPassword: yup
    .string()
    .required(),
  newPassword: yup
    .string()
    .required()
}).required()

interface Props {
  isLoading?: boolean
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setOptionsNavigation?: React.Dispatch<React.SetStateAction<ChangePasswordNavigation>>
}

interface IFormInputs {
  oldPassword: string
  newPassword: string
}

const ChangePassword = (props: Props): JSX.Element => {
  const { isLoading, setIsLoading, setOptionsNavigation } = props

  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: { oldPassword: '', newPassword: '' },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    // const { oldPassword, newPassword } = data
    setIsLoading?.(true)

    console.log({ data })
    reset()
    setTimeout(() => {
      setIsLoading?.(false)
      setOptionsNavigation?.('message')
    }, 3000)
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
