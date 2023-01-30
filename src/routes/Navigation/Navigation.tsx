import './Navigation.css'
import { Outlet } from 'react-router-dom'
import { Modal } from '../../components/Modal/Modal'
import { GetStarted } from '../../components/GetStarted/GetStarted'
import { useState } from 'react'
import { ModalAction } from '../../types/ModalAction'

const Navigation = (): JSX.Element => {
  const [modalAction, setModalAction] = useState<ModalAction>(null)
  const [loginIsPressed, setLoginIsPressed] = useState<boolean>(false)

  const handleOpenModalToLogin = (isPressed?: boolean): void => {
    if (isPressed) {
      setLoginIsPressed(isPressed)
      setModalAction('open')
    }
  }

  return (
    <>
      <div className='wrapper navigation-container'>
        <span className='logo'>TriviaMania</span>
        <div className='button-group'>
          <button
            onClick={() => handleOpenModalToLogin(true)}
          >Login
          </button>
          <button
            type='button'
            className='nes-btn is-success'
            onClick={() => setModalAction('open')}
          >Get Started
          </button>
        </div>
      </div>
      <Modal modalAction={modalAction}>
        <GetStarted
          setModalAction={setModalAction}
          setLoginIsPressed={setLoginIsPressed}
          loginIsPressed={loginIsPressed}
        />
      </Modal>
      <Outlet />
    </>
  )
}

export { Navigation }
