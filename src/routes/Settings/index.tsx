import { useState } from 'react'
import { DeleteAccount } from '../../components/DeleteAccount'
import { Modal } from '../../components/Modal'
import { SectionToChangePassword } from '../../components/ContentToChangePassword/ContentToChangePassword'
import useCurrentUser from '../../hooks/useCurrentUser'
import { ModalAction } from '../../types'
import './Settings.css'
import { IAlert } from '../../interfaces'
import { Alert } from '../../components/Alert'

const Settings = (): JSX.Element => {
  const { currentUser } = useCurrentUser()
  const [modalActionToDeleteAccount, setModalActionToDeleteAccount] = useState<ModalAction>(null)
  const [modalActionToChangePassword, setModalActionToChangePassword] = useState<ModalAction>(null)
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    status: 'success',
    message: ''
  })

  const handleOpenModalToChangePassword = (): void => {
    setModalActionToChangePassword('open')
  }

  const handleOpenModalToDeleteAccount = (): void => {
    setModalActionToDeleteAccount('open')
  }

  return (
    <div className='wrapper'>
      <div className='settings-container'>
        <h2>Your data</h2>
        <p>Email: {currentUser?.email}</p>
        <div className='btn-container'>
          <button
            className='nes-btn is-primary'
            onClick={handleOpenModalToChangePassword}
          >
            Change password
          </button>
          <p className='paragraph'>or</p>
          <button
            className='nes-btn is-error'
            onClick={handleOpenModalToDeleteAccount}
          >
            Delete account
          </button>
        </div>
      </div>
      <Modal modalAction={modalActionToChangePassword}>
        <SectionToChangePassword
          setModalActionToChangePassword={setModalActionToChangePassword}
          setAlert={setAlert}
        />
      </Modal>
      <Modal modalAction={modalActionToDeleteAccount}>
        <DeleteAccount
          setModalActionToDeleteAccount={setModalActionToDeleteAccount}
          setAlert={setAlert}
        />
      </Modal>
      <Alert
        alert={alert}
        setAlert={setAlert}
      />
    </div>
  )
}

export { Settings }
