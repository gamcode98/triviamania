import { IBase, IServerResponse } from '../interfaces'

export interface IResultDto {
  score: string
  correctAnswers: number
  incorrectAnswers: number
  numberOfQuestions: number
  responseTime: string | null
  categories: string[]
  difficulty: string
}

interface Content extends IResultDto, IBase {
  userId: string
}

export interface Data extends IServerResponse {
  response: {
    content: Content[]
    prevPage: null | string
    nextPage: null | string
  }
}
