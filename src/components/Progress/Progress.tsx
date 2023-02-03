import './Progress.css'

interface Props {
  progress: number
}

const Progress = (props: Props): JSX.Element => {
  const { progress } = props

  return (
    <div className='progress-container'>
      <span className='progress-text'>Loading {progress}%</span>
      <progress className='nes-progress is-success' value={progress} />
    </div>
  )
}

export { Progress }
