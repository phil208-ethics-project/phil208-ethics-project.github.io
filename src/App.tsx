import { SessionContext } from '@components/SessionContext'
import { Header } from '@features/Header'
import HomePage from '@pages/HomePage'
import NotFound from '@pages/NotFound'

import { lazy, Suspense, useContext, useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

const StudentDastboard = lazy(() => import('@features/StudentDashboard'))
const StudentPage = lazy(() => import('@features/ManageStudent'))
const StudentBigTable = lazy(() => import('@features/StudentBigTable'))

async function preloadPages() {
  await import('@features/StudentDashboard')
  await import('@features/ManageStudent')
}

function App() {
  const { setSession } = useContext(SessionContext)
  useEffect(() => {
    setSession(0)
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
          <Route path='students' element={<StudentBigTable />} />
          <Route path='student/:id' element={<StudentPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
