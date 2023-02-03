import { IQuestion } from '../../interfaces/IQuestion'
import { Question } from '../Question/Question'

interface Props {
  questions: IQuestion[]
}

const Questions = (props: Props): JSX.Element => {
  const { questions } = props

  return (
    <>
      {questions.map(question => (
        <Question key={question.id} question={question} />
      ))}
    </>
  )
}

export { Questions }
