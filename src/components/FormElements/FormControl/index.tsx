import { useController, UseControllerProps } from 'react-hook-form'
import './FormControl.css'

interface Props extends UseControllerProps {
  labelId?: string
  typeOfInput: string
  placeholder: string
  labelText?: string
}

const FormControl = (props: Props): JSX.Element => {
  const { field, fieldState } = useController(props)

  return (
    <div className='form-control'>
      <label
        htmlFor={props.labelId}
      >{props.labelText}
      </label>
      <input
        {...field}
        id={props.labelId}
        type={props.typeOfInput}
        placeholder={props.placeholder}
        className={`nes-input input
        ${fieldState.invalid && 'is-error'}`}
      />

      {fieldState.invalid && <p className='text-error'>{fieldState.error?.message}</p>}
    </div>
  )
}

export { FormControl }
