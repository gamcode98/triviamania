/* eslint-disable react/jsx-indent */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCurrentUser from '../../hooks/useCurrentUser'
import { IAlert } from '../../interfaces'
import { remove } from '../../services/privateApiService'
import { ModalAction } from '../../types/ModalAction'
import { Loader } from '../Loader'
import './DeleteAccount.css'

interface Props {
  setModalActionToDeleteAccount: React.Dispatch<React.SetStateAction<ModalAction>>
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>
}

const DeleteAccount = (props: Props): JSX.Element => {
  const { setModalActionToDeleteAccount, setAlert } = props

  const { setCurrentUser } = useCurrentUser()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const deleteAccount = (): void => {
    setIsLoading(true)
    remove('/users')
      .then(() => {
        setCurrentUser(null)
        navigate('/')
      })
      .catch(() => {
        setAlert({ message: 'Something went wrong', show: true, status: 'error' })
      })
      .finally(() => {
        setIsLoading(false)
      })
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
