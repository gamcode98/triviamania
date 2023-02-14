import { useState } from 'react'
import { ModalAction } from '../../types/ModalAction'
import './DeleteAccount.css'

interface Props {
  setModalActionToDeleteAccount: React.Dispatch<React.SetStateAction<ModalAction>>
}

const DeleteAccount = (props: Props): JSX.Element => {
  const { setModalActionToDeleteAccount } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className='delete-account-container'>
      <button
        disabled={isLoading}
        className={`close-modal-btn ${isLoading && 'cursor-wait'}`}
        onClick={() => setModalActionToDeleteAccount('close')}
      >
        <i className='nes-icon close is-small' />
      </button>
      <h2 className='title'>Are you sure to take this decision?</h2>
      <div className='btn-container-actions'>
        <button type='button' className='nes-btn is-error'>Confirm</button>
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
