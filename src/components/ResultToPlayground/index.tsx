import { useNavigate } from 'react-router-dom'
import { ITimeSettings } from '../../interfaces'
import { IResult } from '../../interfaces/IResult'
import { ModalAction } from '../../types/ModalAction'
import './ResultToPlayground.css'

interface Props {
  result: IResult
  setModalAction: React.Dispatch<React.SetStateAction<ModalAction>>
  setShowReview: React.Dispatch<React.SetStateAction<boolean>>
  timeSettings: ITimeSettings
}

const ResultToPlayground = (props: Props): JSX.Element => {
  const { result, setModalAction, setShowReview, timeSettings } = props

  const navigate = useNavigate()

  const handlePlayAgain = (): void => {
    setModalAction('close')
    navigate('/trivia-game-settings')
  }

  const handleShowReview = (): void => {
    setShowReview(true)
    setModalAction('close')
  }

  return (
    <div className='result-to-playground-container'>
      <button
        className='close-modal-btn'
        type='button'
        onClick={() => setModalAction('close')}
      >
        <i className='nes-icon close is-small' />
      </button>
      <h3 className='title'>Result</h3>
      <ul className='nes-list is-disc'>
        <li>You got {result.percentage}% of 100%</li>
        <li>You got {result.correctAnswers} answers out of {result.totalAnswers} right</li>
        {timeSettings.responseTime !== null && <li>Time response {timeSettings.responseTime}</li>}
      </ul>
      <div className='button-container'>
        <button
          type='button'
          className='nes-btn is-primary'
          onClick={handleShowReview}
        >Show review
        </button>
        <button
          type='button'
          className='nes-btn'
          onClick={handlePlayAgain}
        >Play again
        </button>
      </div>
    </div>
  )
}

export { ResultToPlayground }
