import { useState } from 'react'
import { PlayForm } from '../../components/PlayForm/PlayForm'
import { IQuestions } from '../../interfaces/IQuestions'
import './Playground.css'

const Playground = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<IQuestions[] | null>(null)

  return (
    <main className='playground wrapper'>
      <PlayForm
        setQuestions={setQuestions}
        setIsLoading={setIsLoading}
      />

    </main>
  )
}

export { Playground }
