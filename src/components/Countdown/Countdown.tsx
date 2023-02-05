import { useEffect, useRef, useState } from 'react'
import './Countdown.css'

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0')
  const seconds = Math.floor(time - Number(minutes) * 60).toString().padStart(2, '0')
  return minutes + ':' + seconds
}

interface Props {
  targetTime: number
  setTimeOver: React.Dispatch<React.SetStateAction<boolean>>
}

const Countdown = (props: Props): JSX.Element => {
  const { targetTime, setTimeOver } = props
  const [countdown, setCountdown] = useState(targetTime)

  const timerId = useRef<any>()

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current)
      setTimeOver(true)
    }
  }, [countdown])

  return (
    <div className='nes-container countdown-container wrapper'>
      <p>Countdown <span className='bold'>{formatTime(countdown)}</span></p>
    </div>
  )
}

export { Countdown }
