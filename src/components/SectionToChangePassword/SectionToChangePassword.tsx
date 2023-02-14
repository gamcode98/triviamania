import { useState } from 'react'
import { ModalAction } from '../../types/ModalAction'
import { ChangePassword } from '../ChangePassword/ChangePassword'

interface Props {
  setModalActionToChangePassword: React.Dispatch<React.SetStateAction<ModalAction>>
}

const SectionToChangePassword = (props: Props): JSX.Element => {
  const { setModalActionToChangePassword } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [optionsNavigation, setOptionsNavigation] = useState('changePassword')

  const options = {
    changePassword: <ChangePassword isLoading={isLoading} />
  }

  return (
    <div>
      <button
        disabled={isLoading}
        className={`close-modal-btn ${isLoading && 'cursor-wait'}`}
        onClick={() => setModalActionToChangePassword('close')}
      >
        <i className='nes-icon close is-small' />
      </button>
      {options[optionsNavigation as keyof typeof options] || <ChangePassword />}
    </div>
  )
}

export { SectionToChangePassword }
