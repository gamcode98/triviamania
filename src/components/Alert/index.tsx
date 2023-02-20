import { useEffect } from 'react'
import { IAlert } from '../../interfaces'
// import checkedIcon from './../assets/checked.svg'
// import failIcon from './../assets/fail.svg'
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

  // const icons = {
  //   success: checkedIcon,
  //   error: failIcon
  // }

  const background = {
    success: 'is-success',
    error: 'is-error'
  }

  return (
    <div className={`nes-badge alert ${alert.show ? 'block' : 'hidden'}`}>
      {/* <img src={icons[alert.status]} width={20} /> */}
      <span className={`${background[alert.status]}`}>
        <span>{alert.message}</span>
      </span>
    </div>
  )
}

export { Alert }
