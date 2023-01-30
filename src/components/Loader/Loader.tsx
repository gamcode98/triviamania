import loaderGif from './../../assets/loader.gif'
import './Loader.css'

const Loader = (): JSX.Element => {
  return (
    <img src={loaderGif} className='loader' />
  )
}

export { Loader }
