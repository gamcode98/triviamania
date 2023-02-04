import { IQuestionDto } from '../../interfaces/IQuestion'
import { Question } from '../Question/Question'

interface Props {
  questions: IQuestionDto[]
  control: any
}

const Questions = (props: Props): JSX.Element => {
  const { questions, control } = props

  return (
    <>
      {questions.map(question => (
        <Question
          key={question.id}
          question={question}
          control={control}
        />
      ))}
    </>
  )
}

export { Questions }
