import { Control, FieldValues } from 'react-hook-form'
import { IQuestionDto } from '../../interfaces/IQuestion'
import { Radio } from '../Radio/Radio'
import './Question.css'

interface Props {
  question: IQuestionDto
  control: any
}

const Question = (props: Props): JSX.Element => {
  const { question, control } = props

  return (
    <section className='nes-container question-container'>
      <div className='nes-container is-rounded question'>
        <p>{question.question}</p>
      </div>
      <Radio
        answers={question.answers}
        name={`answer-${question.id}`}
        control={(control as unknown) as Control<FieldValues>}
        rules={{ required: true }}
      />

    </section>
  )
}

export { Question }
