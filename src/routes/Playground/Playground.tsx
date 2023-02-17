/* eslint-disable react/jsx-closing-tag-location */
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { Countdown } from '../../components/Countdown'
import { Modal } from '../../components/Modal'
import { Questions } from '../../components/Questions/Questions'
import { ResultToPlayground } from '../../components/ResultToPlayground'
import { formatTime } from '../../helpers/formatTime'
import { IQuestion, IQuestionDto, IResult, ITimeSettings } from '../../interfaces'
import { saveResult } from '../../services/saveResult'
import { ModalAction } from '../../types'
import './Playground.css'

const Playground = (): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const { targetTime, settings, data } = location.state
  const questionsData: IQuestion[] = data

  const [modalAction, setModalAction] = useState<ModalAction>(null)
  const [showReview, setShowReview] = useState<boolean>(false)
  const [countdown, setCountdown] = useState(targetTime)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [timeSettings, setTimeSettings] = useState<ITimeSettings>({
    timeOver: false,
    responseTime: null
  })
  const [questions, setQuestions] = useState<IQuestionDto[]>(
    questionsData.map(item => ({
      id: item.id,
      question: item.question,
      correctAnswer: item.correctAnswer,
      answers: [item.correctAnswer, ...item.incorrectAnswers].sort(() => 0.5 - Math.random()),
      chosenAnswer: null,
      isOk: null
    }))
  )
  const [result, setResult] = useState<IResult>({
    percentage: 0,
    correctAnswers: 0,
    totalAnswers: 0
  })

  useEffect(() => {
    if (countdown === 0) onSubmit(getValues())
  }, [countdown])

  const getDefaultValues = (): any => {
    const defaultValues = questions.reduce<{ [key: string]: string }>((acumulator, item) => {
      acumulator[`answer-${item.id}`] = item.answers[0]
      return acumulator
    }, {})
    return defaultValues
  }

  const { handleSubmit, control, getValues } = useForm<any>({
    defaultValues: getDefaultValues(),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<any> = data => {
    let dataParsed = {}

    Object.entries(data).forEach(([key, value]) => {
      dataParsed = { ...dataParsed, [key.split('-')[1]]: value }
    })

    const results = questions.map(item => ({
      ...item,
      chosenAnswer: dataParsed[item.id as keyof typeof dataParsed],
      isOk: dataParsed[item.id as keyof typeof dataParsed] === item.correctAnswer
    }))

    const correctAnswers = results.reduce((prev, element) => {
      const { isOk } = element
      return isOk ? prev + 1 : prev
    }, 0)

    setQuestions(results)

    setTimeSettings(prev => ({ ...prev, timeOver: true }))

    setResult({
      ...result,
      percentage: Math.round(100 * correctAnswers / results.length),
      correctAnswers,
      totalAnswers: results.length
    })

    setIsLoading(true)

    saveResult({
      categories: settings.categories,
      difficulty: settings.difficulty,
      responseTime: formatTime(countdown),
      score: `${Math.round(100 * correctAnswers / results.length)}%`,
      numberOfQuestions: results.length,
      incorrectAnswers: results.length - correctAnswers,
      correctAnswers
    })
      .then(({ data }) => {
        console.log({ data })
        setModalAction('open')
      })
      .catch(error => {
        console.log({ error })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const goToTriviaGameSettings = (): void => {
    navigate('/trivia-game-settings')
  }

  return (
    <form className='playground-container wrapper' onSubmit={handleSubmit(onSubmit)}>
      {targetTime !== null &&
        <Countdown
          countdown={countdown}
          setCountdown={setCountdown}
          timeSettings={timeSettings}
          setTimeSettings={setTimeSettings}
        />}

      <Questions
        questions={questions}
        control={control}
        showReview={showReview}
      />

      {showReview || modalAction !== null
        ? <button
            type='button'
            className='nes-btn is-primary'
            onClick={goToTriviaGameSettings}
          >Play again</button>
        : <button
            type='submit'
            disabled={isLoading}
            className={`nes-btn ${isLoading ? 'is-disabled' : 'is-primary'}`}
          >{isLoading ? 'Saving...' : 'Submit'}</button>}

      <Modal modalAction={modalAction}>
        <ResultToPlayground
          result={result}
          setModalAction={setModalAction}
          setShowReview={setShowReview}
          timeSettings={timeSettings}
        />
      </Modal>
    </form>
  )
}

export { Playground }
