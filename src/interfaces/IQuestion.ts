export interface IQuestion {
  category: string
  id: string
  correctAnswer: string
  incorrectAnswers: string[]
  question: string
  tags: string[]
  type: string
  difficulty: string
  regions: any[]
  isNiche: boolean
}

export interface IQuestionsData {
  data: IQuestion[]
}

export interface IQuestionDto extends Pick<IQuestion, 'id' | 'question' | 'correctAnswer'> {
  answers: string[]
  chosenAnswer: string | null
  isOk: boolean | null
}
