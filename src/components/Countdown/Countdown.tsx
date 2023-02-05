import { useEffect, useRef, useState } from 'react'

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0')
  const seconds = Math.floor(time - Number(minutes) * 60).toString().padStart(2, '0')
  return minutes + ':' + seconds
}

interface Props {
  targetTime: number
}

const Countdown = (props: Props): JSX.Element => {
  const { targetTime } = props
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
      // alert('End')
      console.log('End!!')
    }
  }, [countdown])

  return (
    <div>
      <div>Countdown: {formatTime(countdown)} time is runing...</div>
    </div>
  )
}

export { Countdown }
