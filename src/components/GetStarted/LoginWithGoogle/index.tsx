import './LoginWithGoogle.css'

interface Props {
  isLoading: boolean
}

const LoginWithGoogle = (props: Props): JSX.Element => {
  const { isLoading } = props
  return (
    <button className='login-with-google-btn nes-btn'>
      <i className='nes-icon google is-small' />
      <span>Login with Google</span>
    </button>
  )
}

export { LoginWithGoogle }
