import { ISelect } from '../../interfaces/ISelect'
import './Checkbox.css'

interface Props {
  title: string
  items: ISelect[]
}

const Checkbox = (props: Props): JSX.Element => {
  const { title, items } = props

  return (
    <div className='checkbox-container'>
      <p>{title}</p>
      {items.map(item => (
        <label key={item.value} className='checkbox-label'>
          <input type='checkbox' className='nes-checkbox' value={item.value} />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  )
}

export { Checkbox }
