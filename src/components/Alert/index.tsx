import { useEffect } from 'react'
import { IAlert } from '../../interfaces'
import './Alert.css'

interface Props {
  alert: IAlert
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>
}

const Alert = (props: Props): JSX.Element => {
  const { alert, setAlert } = props

  useEffect(() => {
    if (alert.show) {
      const timeoutId = setTimeout(() => {
        setAlert(prevAlert => ({ ...prevAlert, show: false }))
      }, 5000)

      return () => clearTimeout(timeoutId)
    }
  }, [alert.show, setAlert])

  const background = {
    success: 'is-success',
    error: 'is-error'
  }

  return (
    <div className={`alert ${alert.show ? 'block' : 'hidden'}`}>
      <div className={`${background[alert.status]}`}>
        <span>{alert.message}</span>
      </div>
    </div>
  )
}

export { Alert }
