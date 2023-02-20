import loaderDancingGif from './../../assets/loader-dancing.gif'
import './LoaderDancing.css'

const LoaderDancing = (): JSX.Element => {
  return (
    <div className='loader-dancing-container'>
      <img
        src={loaderDancingGif}
        alt='loader dancing'
        className='loader-dancing'
      />
      <h3 className='title'>Loading...</h3>
    </div>
  )
}

export { LoaderDancing }
