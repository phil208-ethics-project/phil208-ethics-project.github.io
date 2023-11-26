import Header from '../components/Header'
import Navbar from '../components/Navbar'

import { useSession } from '@hooks/useMyParams'

import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

export default function WithSessionHeaderPage() {
  const { status, id } = useSession()

  if (status == 'loading') {
    return (
      <>
        <Header />
        <p>Loading...</p>
      </>
    )
  }

  if (status == 'failed') {
    return (
      <>
        <Header />
        <p>Error: this session does not exist</p>
      </>
    )
  }
  return (
    <>
      <Header>
        <Navbar>
          <Link to={`/session/${id}/student-dashboard`}>Student Dashboard</Link>
          <Link to={`/session/${id}/change-session`}>Change Session</Link>
        </Navbar>
      </Header>
      <Outlet />
    </>
  )
}
