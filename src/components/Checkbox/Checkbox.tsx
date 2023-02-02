import { useController, UseControllerProps } from 'react-hook-form'
import { ISelect } from '../../interfaces/ISelect'
import './Checkbox.css'

interface Props extends UseControllerProps {
  title: string
  items: ISelect[]
}

const Checkbox = (props: Props): JSX.Element => {
  const { title, items } = props
  const { field, fieldState } = useController(props)

  const handleChange = (value: string): void => {
    field.value.includes(value)
      ? field.onChange(field.value.filter((item: any) => item !== value))
      : field.onChange([...field.value, value])
  }

  return (
    <div className='checkbox-container'>
      <p>{title}</p>
      {items.map(item => (
        <label key={item.value} className='checkbox-label'>
          <input
            onChange={() => handleChange(item.value)}
            type='checkbox'
            className='nes-checkbox'
          />
          <span>{item.label}</span>
        </label>
      ))}
      {fieldState.invalid && <p className='text-error'>{fieldState.error?.message}</p>}
    </div>
  )
}

export { Checkbox }
