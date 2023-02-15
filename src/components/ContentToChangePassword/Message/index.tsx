import { ChangePasswordNavigation, ModalAction } from '../../../types'

interface Props {
  setModalActionToChangePassword: React.Dispatch<React.SetStateAction<ModalAction>>
  setOptionsNavigation?: React.Dispatch<React.SetStateAction<ChangePasswordNavigation>>
}

const Message = (props: Props): JSX.Element => {
  const { setModalActionToChangePassword, setOptionsNavigation } = props

  const handleCloseModal = (): void => {
    setModalActionToChangePassword('close')
    setOptionsNavigation?.('changePassword')
  }

  return (
    <div>
      <p>Your password was changed successfully</p>
      <button
        type='button'
        className='nes-btn'
        onClick={handleCloseModal}
      >Close
      </button>
    </div>
  )
}

export { Message }
