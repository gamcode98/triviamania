type Status = 'success' | 'error'

export interface IAlert {
  show: boolean
  status: Status
  message: string
}
