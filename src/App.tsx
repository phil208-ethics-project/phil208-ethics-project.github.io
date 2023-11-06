import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import StudentDastboard from './features/StudentDashboard'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Suspense fallback={'Waiting...'}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='student-dashboard' element={<StudentDastboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
