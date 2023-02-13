/* eslint-disable react/jsx-indent */
import './Navigation.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { Modal } from '../../components/Modal/Modal'
import { GetStarted } from '../../components/GetStarted/GetStarted'
import { useState } from 'react'
import { ModalAction } from '../../types/ModalAction'
import userImg from './../../assets/user.png'
import arrowImg from './../../assets/arrow.png'
import settingsImg from './../../assets/settings.png'
import logoutImg from './../../assets/logout.png'
import scoreImg from './../../assets/star.png'
import useCurrentUser from '../../hooks/useCurrentUser'

const Navigation = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useCurrentUser()
  const [modalAction, setModalAction] = useState<ModalAction>(null)
  const [loginIsPressed, setLoginIsPressed] = useState<boolean>(false)
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleOpenModalToLogin = (isPressed?: boolean): void => {
    if (isPressed) {
      setLoginIsPressed(isPressed)
      setModalAction('open')
    }
  }

  const handleToggle = (): void => {
    setMenuIsVisible(prev => !prev)
  }

  const handleLogout = (): void => {
    setCurrentUser(null)
    setMenuIsVisible(false)
    navigate('/')
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
          : <div className='menu-container'>
              <div className='user-container'>
                <img src={userImg} className='user-img' />
                <button onClick={handleToggle}>
                  <img src={arrowImg} className={`${menuIsVisible ? 'arrow-img-rotate-up' : 'arrow-img-rotate-down'}`} />
                </button>
              </div>
            <ul className={`nes-container is-rounded menu-dropdown ${menuIsVisible ? 'is-visible' : 'menu-dropdown'}`}>
              <li className='item'>
                <img src={scoreImg} className='score-img' />
                <span>Score</span>
              </li>
              <li className='item'>
                <img src={settingsImg} className='settings-img' />
                <span>Settings</span>
              </li>
              <li className='item' onClick={handleLogout}>
                <img src={logoutImg} className='logout-img' />
                <span>Log out</span>
              </li>
            </ul>
            </div>}
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
