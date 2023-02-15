import { loaderGif } from './../../components/Images'
import './Loader.css'

const Loader = (): JSX.Element => {
  return (
    <img src={loaderGif} className='loader' />
  )
}

export { Loader }
