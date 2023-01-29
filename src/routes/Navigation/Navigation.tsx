import './Navigation.css'
import { Outlet } from 'react-router-dom'

const Navigation = (): JSX.Element => {
  return (
    <>
      <div className='wrapper navigation-container'>
        <span className='logo'>TriviMania</span>
        <div className='button-group'>
          <button>Login</button>
          <button type='button' className='nes-btn is-success'>Get Started</button>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export { Navigation }
