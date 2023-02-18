/* eslint-disable react/jsx-indent */
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { GetStarted } from '../../components/GetStarted/GetStarted'
import { arrowImg, joystickImg, logoutImg, scoreImg, settingsImg, userImg } from '../../components/Images'
import { ModalAction } from '../../types'
import useCurrentUser from '../../hooks/useCurrentUser'
import './Navigation.css'

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

  const handleNavigateToSettings = (): void => {
    setMenuIsVisible(false)
    navigate('/settings')
  }

  const handleNavigateToTriviaGameSettings = (): void => {
    setMenuIsVisible(false)
    navigate('/trivia-game-settings')
  }

  const handleNavigateToScore = (): void => {
    setMenuIsVisible(false)
    navigate('/score')
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
                <li className='item' onClick={handleNavigateToScore}>
                  <img src={scoreImg} className='score-img' />
                  <span>Score</span>
                </li>
                <li className='item' onClick={handleNavigateToSettings}>
                  <img src={settingsImg} className='settings-img' />
                  <span>Settings</span>
                </li>
                <li className='item' onClick={handleNavigateToTriviaGameSettings}>
                  <img src={joystickImg} className='trivia-game-settings-img' />
                  <span>Trivia game settings</span>
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
