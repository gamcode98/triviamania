import { useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { ISelect } from '../../../interfaces/ISelect'
import { questionImg } from '../../Images'
import './Select.css'

interface Props extends UseControllerProps {
  label: string
  items: ISelect[]
}

const Select = (props: Props): JSX.Element => {
  const { label, items } = props
  const { field, fieldState } = useController(props)
  const [showHelp, setShowHelp] = useState<boolean>(false)

  const handleShowHelp = (): void => {
    setShowHelp(true)
    setTimeout(() => setShowHelp(false), 5000)
  }

  return (
    <div className='select-container'>
      <div className='select'>
        <label className='select-label' htmlFor='default_select'>{label}</label>
        <button type='button' onClick={handleShowHelp}>
          <img src={questionImg} alt='question' className='question-img' />
        </button>
        <div className={`${showHelp ? 'lists help-container' : 'is-hidden'}`}>
          <ul className='nes-list is-disc list'>
            <li className='item'>Easy: Unlimited time</li>
            <li className='item'>Medium: 2 minutes per question</li>
            <li className='item'>Hard: 1 minute per question</li>
          </ul>
        </div>
      </div>
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
