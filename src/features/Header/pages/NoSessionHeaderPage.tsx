import Header from '../components/Header'
import Navbar from '../components/Navbar'

import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

export default function NoSessionHeaderPage() {
  return (
    <>
      <Header>
        <Navbar>
          <Link to={`/change-session`}>Change Session</Link>
        </Navbar>
      </Header>
      <Outlet />
    </>
  )
}
