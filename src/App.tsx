import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Suspense fallback={'abc'}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
