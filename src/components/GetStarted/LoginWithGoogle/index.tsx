import { backendUrl } from '../../../services'
import './LoginWithGoogle.css'

const LoginWithGoogle = (): JSX.Element => {
  return (
    <a
      className='login-with-google-btn nes-btn'
      href={`${backendUrl}/auth/google`}
    >
      <i className='nes-icon google is-small' />
      <span>Login with Google</span>
    </a>
  )
}

export { LoginWithGoogle }
