import { useState } from 'react'
import { IAlert } from '../../interfaces'
import { ModalAction, ChangePasswordNavigation } from '../../types'
import { ChangePassword } from './ChangePassword'
import { Message } from './Message'
import { Wrapper } from './Wrapper'

interface Props {
  setModalActionToChangePassword: React.Dispatch<React.SetStateAction<ModalAction>>
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>
}

const SectionToChangePassword = (props: Props): JSX.Element => {
  const { setModalActionToChangePassword, setAlert } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [optionsNavigation, setOptionsNavigation] = useState<ChangePasswordNavigation>('changePassword')

  const options = {
    changePassword: <ChangePassword setAlert={setAlert} />,
    message: <Message setModalActionToChangePassword={setModalActionToChangePassword} />
  }

  const handleCloseModal = (): void => {
    setModalActionToChangePassword('close')
    setOptionsNavigation('changePassword')
  }

  return (
    <div>
      <button
        disabled={isLoading}
        className={`close-modal-btn ${isLoading && 'cursor-wait'}`}
        onClick={handleCloseModal}
      >
        <i className='nes-icon close is-small' />
      </button>
      <Wrapper
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setOptionsNavigation={setOptionsNavigation}
      >
        {options[optionsNavigation as keyof typeof options] ||
          <ChangePassword setAlert={setAlert} />}
      </Wrapper>
    </div>
  )
}

export { SectionToChangePassword }
