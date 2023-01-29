import { Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home/Home'
import { Navigation } from './routes/Navigation/Navigation'

function App (): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
