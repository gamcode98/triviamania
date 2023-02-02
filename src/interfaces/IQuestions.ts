export interface IQuestions {
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
  data: IQuestions[]
}
