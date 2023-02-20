/* eslint-disable react/jsx-indent */
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { GetStarted } from '../../components/GetStarted/GetStarted'
import { ModalAction } from '../../types'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Alert } from '../../components/Alert'
import { IAlert } from '../../interfaces'
import { Menu } from '../../components/Menu'
import './Navigation.css'

const Navigation = (): JSX.Element => {
  const { currentUser } = useCurrentUser()
  const [modalAction, setModalAction] = useState<ModalAction>(null)
  const [loginIsPressed, setLoginIsPressed] = useState<boolean>(false)
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    status: 'success',
    message: ''
  })

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
        {currentUser === null
          ? <div className='button-group'>
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
          : <Menu
              menuIsVisible={menuIsVisible}
              setMenuIsVisible={setMenuIsVisible}
            />}
      </div>
      <Modal modalAction={modalAction}>
        <GetStarted
          setModalAction={setModalAction}
          setLoginIsPressed={setLoginIsPressed}
          loginIsPressed={loginIsPressed}
          setAlert={setAlert}
        />
      </Modal>
      <Alert alert={alert} setAlert={setAlert} />
      <Outlet />
    </>
  )
}

export { Navigation }
