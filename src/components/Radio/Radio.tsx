import { useController, UseControllerProps } from 'react-hook-form'
import './Radio.css'

interface Props extends UseControllerProps {
  answers: string[]
  isDisabled: null | boolean
}

const Radio = (props: Props): JSX.Element => {
  const { answers, isDisabled } = props

  const { field } = useController(props)

  const handleChange = (value: string): void => {
    field.onChange(value)
  }

  return (
    <>
      {answers.map(answer => (
        <label key={answer} className='label-radio'>
          <input
            type='radio'
            className='nes-radio'
            onChange={() => handleChange(answer)}
            checked={field.value === answer}
            disabled={isDisabled !== null}
          />
          <span>{answer}</span>
        </label>
      ))}
    </>
  )
}

export { Radio }
