import { useController, UseControllerProps } from 'react-hook-form'

interface Props extends UseControllerProps {
  answers: string[]
}

const Radio = (props: Props): JSX.Element => {
  const { answers } = props

  const { field, fieldState } = useController(props)

  const handleChange = (value: string): void => {
    console.log({ value })
    field.onChange(value)
  }

  return (
    <>
      {/* <label>
        <input
          type='radio'
          className='nes-radio'
          defaultChecked
          // name={name}
        />
        <span>{answers[0]}</span>
      </label> */}
      {answers.map(answer => (
        <label key={answer}>
          <input
            type='radio'
            className='nes-radio'
            onChange={() => handleChange(answer)}
            checked={field.value === answer}
          />
          <span>{answer}</span>
        </label>
      ))}
      {fieldState.invalid && <p className='text-error'>{fieldState.error?.message}</p>}
    </>
  )
}

export { Radio }
