import { Header } from '@features/Header'
import HomePage from '@pages/HomePage'
import NotFound from '@pages/NotFound'

import { lazy, Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

const StudentDastboard = lazy(() => import('@features/StudentDashboard'))
const StudentPage = lazy(() => import('@pages/StudentPage'))

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
          <Route path='student/:id' element={<StudentPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
