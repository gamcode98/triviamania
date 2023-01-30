import { Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home/Home'
import { Navigation } from './routes/Navigation/Navigation'
import { Playground } from './routes/Playground/Playground'

function App (): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Playground />} />
      </Route>
    </Routes>
  )
}

export default App
