import { useEffect, useRef, useState } from 'react'
import { ITimeSettings } from '../../interfaces/ITimeSettings'
import './Countdown.css'

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0')
  const seconds = Math.floor(time - Number(minutes) * 60).toString().padStart(2, '0')
  return minutes + ':' + seconds
}

interface Props {
  targetTime: number
  timeSettings: ITimeSettings
  setTimeSettings: React.Dispatch<React.SetStateAction<ITimeSettings>>
}

const Countdown = (props: Props): JSX.Element => {
  const { targetTime, timeSettings, setTimeSettings } = props
  const [countdown, setCountdown] = useState(targetTime)

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
