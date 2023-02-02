import { useController, UseControllerProps } from 'react-hook-form'
import { ISelect } from '../../interfaces/ISelect'
import './Select.css'

interface Props extends UseControllerProps {
  label: string
  items: ISelect[]
}

const Select = (props: Props): JSX.Element => {
  const { label, items } = props
  const { field, fieldState } = useController(props)

  return (
    <div className='select-container'>
      <label htmlFor='default_select'>{label}</label>
      <div className='nes-select'>
        <select
          id='default_select'
          {...field}
        >
          <option hidden>
            Select...
          </option>
          {items.map(item => (
            <option
              key={item.value}
              value={item.value}
            >{item.label}
            </option>
          ))}
        </select>
      </div>
      {fieldState.invalid && <p className='text-error'>{fieldState.error?.message}</p>}
    </div>
  )
}

export { Select }
