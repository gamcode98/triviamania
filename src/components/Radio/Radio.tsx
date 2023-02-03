interface Props {
  name: string
  answers: string[]
}

const Radio = (props: Props): JSX.Element => {
  const { name, answers } = props

  return (
    <>
      <label>
        <input
          type='radio'
          className='nes-radio'
          defaultChecked
          name={name}
        />
        <span>{answers[0]}</span>
      </label>
      {answers.map(answer => (
        <label key={answer}>
          <input
            type='radio'
            className='nes-radio'
            name={name}
          />
          <span>{answer}</span>
        </label>
      ))}
    </>

  )
}

export { Radio }
