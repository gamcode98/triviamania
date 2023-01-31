import { useState } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { PlayForm } from '../../components/PlayForm/PlayForm'
import { ModalAction } from '../../types/ModalAction'
import './Playground.css'

const Playground = (): JSX.Element => {
  const [modalAction, setModalAction] = useState<ModalAction>(null)

  return (
    <main className='playground wrapper'>
      <button
        type='button'
        className='nes-btn is-primary'
        onClick={() => setModalAction('open')}
      >Play
      </button>

      <Modal modalAction={modalAction}>
        <PlayForm setModalAction={setModalAction} />
      </Modal>
    </main>
  )
}

export { Playground }
