import { Header } from '@features/Header'
import StudentDastboard from '@features/StudentDashboard'
import HomePage from '@pages/HomePage'
import NotFound from '@pages/NotFound'

import { Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Suspense fallback='Waiting...'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Outlet />
            </>
          }
        >
          <Route index element={<HomePage />} />
          <Route path='student-dashboard' element={<StudentDastboard />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
