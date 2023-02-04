/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Modal } from '../../components/Modal/Modal'
import { Questions } from '../../components/Questions/Questions'
import { IQuestion } from '../../interfaces/IQuestion'
import { ModalAction } from '../../types/ModalAction'
import './Playground.css'

const Playground = (): JSX.Element => {
  const [modalAction, setModalAction] = useState<ModalAction>(null)
  const [result, setResult] = useState({
    percentage: 0,
    correctAnswers: 0,
    totalAnswers: 0
  })

  const location = useLocation()
  const questionsData: IQuestion[] = location.state

  const questions = questionsData.map(item => ({
    id: item.id,
    question: item.question,
    correctAnswer: item.correctAnswer,
    answers: [item.correctAnswer, ...item.incorrectAnswers].sort(() => 0.5 - Math.random())
  }))

  const defaultValues = questions.reduce<{ [key: string]: string }>((acumulator, item) => {
    acumulator[`answer-${item.id}`] = item.answers[0]
    return acumulator
  }, {})

  const { handleSubmit, control } = useForm<any>({
    defaultValues,
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
      <Questions questions={questions} control={control} />
      <button className='nes-btn is-primary'>Submit</button>
      <Modal modalAction={modalAction}>
        <div>You got {result.percentage}% of 100%</div>
        <div>you got {result.correctAnswers} answers out of {result.totalAnswers} right</div>
      </Modal>
    </form>
  )
}

export { Playground }
