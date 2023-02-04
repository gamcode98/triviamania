import { IQuestionDto } from '../../interfaces/IQuestion'
import { Question } from '../Question/Question'

interface Props {
  questions: IQuestionDto[]
  control: any
  showReview: boolean
}

const Questions = (props: Props): JSX.Element => {
  const { questions, control, showReview } = props

  return (
    <>
      {questions.map(question => (
        <Question
          key={question.id}
          question={question}
          control={control}
          showReview={showReview}
        />
      ))}
    </>
  )
}

export { Questions }
