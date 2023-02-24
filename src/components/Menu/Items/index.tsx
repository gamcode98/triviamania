import { useNavigate } from 'react-router-dom'
import {
  joystickImg,
  logoutImg,
  scoreImg,
  settingsImg
} from '../../../components/Images'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { get } from '../../../services/privateApiService'
import './Items.css'

interface Props {
  menuIsVisible: boolean
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Items = (props: Props): JSX.Element => {
  const { menuIsVisible, setMenuIsVisible } = props

  const { setCurrentUser } = useCurrentUser()

  const navigate = useNavigate()

  const handleLogout = (): void => {
    get('/auth/logout')
      .then(() => {
        setCurrentUser(null)
        setMenuIsVisible(false)
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
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
  )
}

export { Items }
