import { Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home/Home'
import { LoadQuestions } from './routes/LoadQuestions/LoadQuestions'
import { Navigation } from './routes/Navigation/Navigation'
import { Playground } from './routes/Playground/Playground'

function App (): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
        <Route path='/trivia-game-settings' element={<LoadQuestions />} />
        <Route path='/playground' element={<Playground />} />
      </Route>
    </Routes>
  )
}

export default App
