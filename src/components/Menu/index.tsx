import { arrowImg, userImg } from '../../components/Images'
import { Items } from './Items'
import './Menu.css'

interface Props {
  menuIsVisible: boolean
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = (props: Props): JSX.Element => {
  const { menuIsVisible, setMenuIsVisible } = props

  const handleToggle = (): void => {
    setMenuIsVisible(prev => !prev)
  }

  const hideMenu = (event: string): void => {
    window.addEventListener(event, () => setMenuIsVisible(false))
  }

  hideMenu('scroll')
  hideMenu('resize')

  return (
    <div className='menu-container'>
      <div className='user-container'>
        <img src={userImg} className='user-img' />
        <button onClick={handleToggle}>
          <img src={arrowImg} className={`${menuIsVisible ? 'arrow-img-rotate-up' : 'arrow-img-rotate-down'}`} />
        </button>
      </div>
      <Items
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
    </div>
  )
}

export { Menu }
