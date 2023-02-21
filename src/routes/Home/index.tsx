import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { GetStarted } from '../../components/GetStarted/GetStarted'
import { Modal } from '../../components/Modal'
import { IAlert } from '../../interfaces'
import { ModalAction } from '../../types/ModalAction'
import { heroImg } from '../../components/Images'
import './Home.css'

const Home = (): JSX.Element => {
  const [modalAction, setModalAction] = useState<ModalAction>(null)
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    status: 'success',
    message: ''
  })

  return (
    <main className='wrapper'>
      <section className='hero-container'>
        <div className='hero-content'>
          <h1 className='title'>Welcome to TriviaMania!</h1>
          <p className='paragraph'>The perfect place to challenge your knowledge and have fun. With a variety of questions on different topics, easy user interface and options to customize your games. Sign up today and start playing and learning. We will wait for you!</p>
          <button
            type='button'
            className='btn nes-btn is-success'
            onClick={() => setModalAction('open')}
          >Get Started
          </button>
        </div>
        <div className='nes-container is-rounded hero-img-container'>
          <img src={heroImg} alt='hero image' className='hero-img' />
        </div>
      </section>
      <Modal modalAction={modalAction}>
        <GetStarted
          setModalAction={setModalAction}
          setAlert={setAlert}
        />
      </Modal>
      <Alert alert={alert} setAlert={setAlert} />
    </main>
  )
}

export { Home }
