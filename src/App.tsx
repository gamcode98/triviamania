import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './routes/Home'
import { LoadQuestions } from './routes/LoadQuestions'
import { Navigation } from './routes/Navigation'
import { Playground } from './routes/Playground'
import { ResetPassword } from './routes/ResetPassword'
import { Score } from './routes/Score'
import { Settings } from './routes/Settings'
import { get } from './services/privateApiService'
import { Data } from './dto/login.dto'
import useCurrentUser from './hooks/useCurrentUser'

function App (): JSX.Element {
  const { setCurrentUser } = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    get<Data>('/auth/validate')
      .then(({ data }) => {
        const { response: { user } } = data
        setCurrentUser(user)
        navigate('/trivia-game-settings')
      }).catch(error => {
        console.log({ error })
      })
  }, [])

  return (
    <Routes>
      <Route path='/recovery' element={<ResetPassword />} />
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
