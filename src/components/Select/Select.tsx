import { ISelect } from '../../interfaces/ISelect'
import './Select.css'

interface Props {
  label: string
  items: ISelect[]
}

const Select = (props: Props): JSX.Element => {
  const { label, items } = props

  return (
    <div className='select-container'>
      <label htmlFor='default_select'>{label}</label>
      <div className='nes-select'>
        <select required id='default_select'>
          {items.map(item => (
            <option
              key={item.value}
              disabled={item.label === 'Select...'}
              hidden={item.label === 'Select...'}
              selected={item.label === 'Select...'}
              value={item.value}
            >{item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export { Select }
