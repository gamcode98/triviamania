export interface ISaveResultDto {
  score: string
  correctAnswers: number
  incorrectAnswers: number
  numberOfQuestions: number
  responseTime: string | null
  categories: string[]
  difficulty: string
}
