import { useState } from 'react'
import { ISelect } from '../../interfaces/ISelect'
import './Select.css'

interface Props {
  label: string
  items: ISelect[]
}

const Select = (props: Props): JSX.Element => {
  const { label, items } = props
  const [selectedOption, setSelectedOption] = useState('defaultValue')

  const handleChange = (event: any): void => {
    console.log('value -> ', event.target.value)
    setSelectedOption(event.target.value)
  }

  return (
    <div className='select-container'>
      <label htmlFor='default_select'>{label}</label>
      <div className='nes-select'>
        <select required id='default_select' value={selectedOption} onChange={handleChange}>
          {items.filter(item => item.value !== 'defaultValue').map(item => (
            <option
              key={item.value}
              // disabled={item.label === 'Select...'}
              // hidden={item.label === 'Select...'}
              // selected={item.label === 'Select...'}
              // defaultValue='Select...'
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
