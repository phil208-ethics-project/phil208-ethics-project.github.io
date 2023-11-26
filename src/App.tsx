import NoSessionHeaderPage from '@features/Header/pages/NoSessionHeaderPage'
import WithSessionHeaderPage from '@features/Header/pages/WithSessionHeaderPage'
import HomePage from '@pages/HomePage'
import ManageSessions from '@pages/ManageSessions'
import NotFound from '@pages/NotFound'

import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

const StudentDastboard = lazy(() => import('@features/StudentDashboard'))
const StudentPage = lazy(() => import('@features/ManageStudent'))

async function preloadPages() {
  await import('@features/StudentDashboard')
  await import('@features/ManageStudent')
}

function App() {
  useEffect(() => {
    preloadPages()
  }, [])

  return (
    <Suspense fallback='Waiting...'>
      <Routes>
        <Route path='/' element={<NoSessionHeaderPage />}>
          <Route path='change-session' element={<ManageSessions />} />
          <Route index element={<HomePage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='session/:session' element={<WithSessionHeaderPage />}>
          <Route index element={<HomePage />} />
          <Route path='student-dashboard' element={<StudentDastboard />} />
          <Route path='student/:student' element={<StudentPage />} />
          <Route path='change-session' element={<ManageSessions />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
