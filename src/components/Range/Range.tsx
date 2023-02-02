import { useRef } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import './Range.css'

interface Props extends UseControllerProps {
  label: string
  min: number
  max: number
  step: number
}

const Range = (props: Props): JSX.Element => {
  const { label, min, max, step } = props
  const { field } = useController(props)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const badgeRef = useRef<HTMLDivElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    field.onChange(e.target.value)
    if (inputRef.current !== null && badgeRef.current !== null) {
      const w = parseInt(window.getComputedStyle(inputRef?.current, null).getPropertyValue('width'))
      const pixels = w / 30
      badgeRef.current.style.left = ((Number(inputRef.current.value) * pixels) + 30 + 'px')
    }
  }

  return (
    <div className='input-range-container'>
      <label className='label-text' htmlFor='limit-of-questions'>{label}</label>
      <div ref={badgeRef} className='badge-container'>
        <div className='nes-badge badge-size'>
          <span className='is-success'>{field.value}</span>
        </div>
      </div>
      <input
        ref={inputRef}
        type='range'
        name='limit-of-questions'
        id='limit-of-questions'
        min={min} max={max} step={step}
        value={field.value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export { Range }
