/* eslint-disable react/jsx-closing-tag-location */
import { useLocation } from 'react-router-dom'
import { Questions } from '../../components/Questions/Questions'
import { IQuestion } from '../../interfaces/IQuestion'
import './Playground.css'

const Playground = (): JSX.Element => {
  const location = useLocation()
  const questions: IQuestion[] = location.state

  return (
    <div className='playground wrapper'>
      <Questions questions={questions} />
    </div>
  )
}

export { Playground }
