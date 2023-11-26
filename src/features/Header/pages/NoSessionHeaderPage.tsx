import Header from '../components/Header'
import Navbar from '../components/Navbar'

import { Outlet } from 'react-router'

export default function NoSessionHeaderPage() {
  return (
    <>
      <Header>
        <Navbar></Navbar>
      </Header>
      <Outlet />
    </>
  )
}
