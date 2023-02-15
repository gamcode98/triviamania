/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react'
import { PlayForm } from '../../components/PlayForm/PlayForm'
import { Progress } from '../../components/Progress'
import './LoadQuestions.css'

const LoadQuestions = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  return (
    <main className='wrapper'>
      {isLoading
        ? <Progress progress={progress} />
        : <PlayForm
            setIsLoading={setIsLoading}
            setProgress={setProgress}
          />}
    </main>
  )
}

export { LoadQuestions }
