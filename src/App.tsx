import { Header } from '@features/Header'
import HomePage from '@pages/HomePage'
import NotFound from '@pages/NotFound'

import { lazy, Suspense, useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

const StudentDastboard = lazy(() => import('@features/StudentDashboard'))
const StudentPage = lazy(() => import('@pages/StudentPage'))

async function preloadPages() {
  await import('@features/StudentDashboard')
  await import('@pages/StudentPage')
}

function App() {
  useEffect(() => {
    preloadPages()
  }, [])

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
