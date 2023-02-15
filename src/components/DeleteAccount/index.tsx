/* eslint-disable react/jsx-indent */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalAction } from '../../types/ModalAction'
import { Loader } from '../Loader'
import './DeleteAccount.css'

interface Props {
  setModalActionToDeleteAccount: React.Dispatch<React.SetStateAction<ModalAction>>
}

const DeleteAccount = (props: Props): JSX.Element => {
  const { setModalActionToDeleteAccount } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const deleteAccount = (): void => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/')
    }, 3000)
  }

  return (
    isLoading
      ? <Loader />
      : <div className='delete-account-container'>
          <button
            disabled={isLoading}
            className={`close-modal-btn ${isLoading && 'cursor-wait'}`}
            onClick={() => setModalActionToDeleteAccount('close')}
          >
            <i className='nes-icon close is-small' />
          </button>
          <h2 className='title'>Are you sure to <br /> take this decision?</h2>
          <div className='btn-container-actions'>
          <button
            type='button'
            className='nes-btn is-error'
            onClick={deleteAccount}
          >Confirm
          </button>
            <button
              type='button'
              className='nes-btn'
              onClick={() => setModalActionToDeleteAccount('close')}
            >Cancel
            </button>
          </div>
        </div>
  )
}

export { DeleteAccount }
