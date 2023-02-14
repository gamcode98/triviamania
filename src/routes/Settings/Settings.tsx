import { useState } from 'react'
import { DeleteAccount } from '../../components/DeleteAccount/DeleteAccount'
import { Modal } from '../../components/Modal/Modal'
import { SectionToChangePassword } from '../../components/SectionToChangePassword/SectionToChangePassword'
import useCurrentUser from '../../hooks/useCurrentUser'
import { ModalAction } from '../../types/ModalAction'
import './Settings.css'

const Settings = (): JSX.Element => {
  const { currentUser } = useCurrentUser()
  const [modalActionToDeleteAccount, setModalActionToDeleteAccount] = useState<ModalAction>(null)
  const [modalActionToChangePassword, setModalActionToChangePassword] = useState<ModalAction>(null)

  const handleOpenModalToChangePassword = (): void => {
    setModalActionToChangePassword('open')
  }

  const handleOpenModalToDeleteAccount = (): void => {
    setModalActionToDeleteAccount('open')
  }

  return (
    <div className='wrapper settings-container'>
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
      <Modal modalAction={modalActionToChangePassword}>
        <SectionToChangePassword setModalActionToChangePassword={setModalActionToChangePassword} />
      </Modal>
      <Modal modalAction={modalActionToDeleteAccount}>
        <DeleteAccount setModalActionToDeleteAccount={setModalActionToDeleteAccount} />
      </Modal>
    </div>
  )
}

export { Settings }
