import { Control, FieldValues } from 'react-hook-form'
import { IQuestionDto } from '../../interfaces/IQuestion'
import { Radio } from '../Radio/Radio'
import './Question.css'

interface Props {
  question: IQuestionDto
  control: any
  showReview: boolean
}

const Question = (props: Props): JSX.Element => {
  const { question, control, showReview } = props

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
        isDisabled={question.isOk}
      />
      {showReview &&
        <div className={`${question.isOk ? 'is-success-container' : 'is-error-container'}`}>
          {question.isOk
            ? <p>This is ok</p>
            : <p>Your choice was <span className='is-bold'>"{question.chosenAnswer}"</span>, but the correct answer is <span className='is-bold'>"{question.correctAnswer}"</span></p>}
        </div>}
    </section>
  )
}

export { Question }
