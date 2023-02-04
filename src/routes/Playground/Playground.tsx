/* eslint-disable react/jsx-closing-tag-location */
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Modal } from '../../components/Modal/Modal'
import { Questions } from '../../components/Questions/Questions'
import { ResultToPlayground } from '../../components/ResultToPlayground/ResultToPlayground'
import { IQuestion, IQuestionDto } from '../../interfaces/IQuestion'
import { IResult } from '../../interfaces/IResult'
import { ModalAction } from '../../types/ModalAction'
import './Playground.css'

const Playground = (): JSX.Element => {
  const location = useLocation()
  const questionsData: IQuestion[] = location.state

  const [modalAction, setModalAction] = useState<ModalAction>(null)
  const [showReview, setShowReview] = useState<boolean>(false)
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

  // const questions = questionsData.map(item => ({
  //   id: item.id,
  //   question: item.question,
  //   correctAnswer: item.correctAnswer,
  //   answers: [item.correctAnswer, ...item.incorrectAnswers].sort(() => 0.5 - Math.random())
  // }))

  // const defaultValues = questions.reduce<{ [key: string]: string }>((acumulator, item) => {
  //   acumulator[`answer-${item.id}`] = item.answers[0]
  //   return acumulator
  // }, {})

  const getDefaultValues = (): any => {
    const defaultValues = questions.reduce<{ [key: string]: string }>((acumulator, item) => {
      acumulator[`answer-${item.id}`] = item.answers[0]
      return acumulator
    }, {})
    return defaultValues
  }

  const { handleSubmit, control } = useForm<any>({
    defaultValues: getDefaultValues(),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<any> = data => {
    // const dataParsed = Object.entries(data).map(([key, value]) => ({
    //   [key.split('-')[1]]: value
    // }))

    let dataParsed = {}

    Object.entries(data).forEach(([key, value]) => {
      dataParsed = { ...dataParsed, [key.split('-')[1]]: value }
    })

    const results = questions.map(item => ({
      ...item,
      chosenAnswer: dataParsed[item.id as keyof typeof dataParsed],
      isOk: dataParsed[item.id as keyof typeof dataParsed] === item.correctAnswer
    }))

    console.log({ results })

    const correctAnswers = results.reduce((prev, element) => {
      const { isOk } = element
      return isOk ? prev + 1 : prev
    }, 0)

    setQuestions(results)

    console.log({ correctAnswers })

    setResult({
      percentage: Math.round(100 * correctAnswers / results.length),
      correctAnswers,
      totalAnswers: results.length
    })

    // console.log({ percentage })

    setModalAction('open')

    // const resultToObject = results.reduce<{ [key: string]: boolean }>((acumulator, item) => {
    //   acumulator[`answer-${item.id}`] = item.isOk
    //   return acumulator
    // }, {})

    // console.log({ resultToObject }, 'lengt: -> ')
  }

  return (
    <form className='playground wrapper' onSubmit={handleSubmit(onSubmit)}>
      <Questions questions={questions} control={control} showReview={showReview} />
      <button type='submit' className='nes-btn is-primary'>Submit</button>
      <Modal modalAction={modalAction}>
        <ResultToPlayground result={result} setModalAction={setModalAction} setShowReview={setShowReview} />
      </Modal>
    </form>
  )
}

export { Playground }
