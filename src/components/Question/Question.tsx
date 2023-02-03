import { IQuestion } from '../../interfaces/IQuestion'
import { Radio } from '../Radio/Radio'
import './Question.css'

interface Props {
  question: IQuestion
}

const Question = (props: Props): JSX.Element => {
  const { question } = props
  console.log({ question })

  const answers = [question.correctAnswer, ...question.incorrectAnswers].sort(() => 0.5 - Math.random())

  return (
    <section className='nes-container question-container'>
      <div className='nes-container is-rounded question'>
        <p>{question.question}</p>
      </div>
      <Radio answers={answers} name='answers' />
    </section>
  )
}

export { Question }
