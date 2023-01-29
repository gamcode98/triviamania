import heroImg from './../../assets/hero-1.gif'
import './Home.css'

const Home = (): JSX.Element => {
  return (
    <main className='wrapper'>
      <section className='hero-container'>
        <div className='hero-content'>
          <h1 className='title'>Welcome to TriviaMania!</h1>
          <p className='paragraph'>The perfect place to challenge your knowledge and have fun. With a variety of questions on different topics, easy user interface and options to customize your games. Sign up today and start playing and learning. We will wait for you!</p>
          <button type='button' className='btn nes-btn is-success'>Get Started</button>
        </div>
        <img src={heroImg} alt='hero image' className='hero-img' />
      </section>
    </main>
  )
}

export { Home }
