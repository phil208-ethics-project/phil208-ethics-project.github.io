import Header from '../components/Header'

import { Outlet } from 'react-router'

export default function NoSessionHeaderPage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
