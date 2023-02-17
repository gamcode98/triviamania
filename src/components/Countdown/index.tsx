import { useEffect, useRef } from 'react'
import { formatTime } from '../../helpers/formatTime'
import { ITimeSettings } from '../../interfaces/ITimeSettings'
import './Countdown.css'

interface Props {
  countdown: number
  setCountdown: React.Dispatch<React.SetStateAction<number>>
  timeSettings: ITimeSettings
  setTimeSettings: React.Dispatch<React.SetStateAction<ITimeSettings>>
}

const Countdown = (props: Props): JSX.Element => {
  const { countdown, setCountdown, timeSettings, setTimeSettings } = props

  const timerId = useRef<any>()

  useEffect(() => {
    if (!timeSettings.timeOver) {
      timerId.current = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timerId.current)
    } else {
      setTimeSettings(prev => ({ ...prev, responseTime: formatTime(countdown) }))
    }
  }, [timeSettings.timeOver])

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current)
      setTimeSettings(prev => ({ ...prev, timeOver: true, responseTime: formatTime(countdown) }))
    }
  }, [countdown])

  return (
    <div className='nes-container countdown-container wrapper'>
      <p>Countdown <span className='bold'>{formatTime(countdown)}</span></p>
    </div>
  )
}

export { Countdown }
