import { Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home'
import { LoadQuestions } from './routes/LoadQuestions'
import { Navigation } from './routes/Navigation'
import { Playground } from './routes/Playground'
import { ResetPassword } from './routes/ResetPassword'
import { Score } from './routes/Score'
import { Settings } from './routes/Settings'

function App (): JSX.Element {
  return (
    <Routes>
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
        <Route path='/trivia-game-settings' element={<LoadQuestions />} />
        <Route path='/playground' element={<Playground />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/score' element={<Score />} />
      </Route>
    </Routes>
  )
}

export default App
