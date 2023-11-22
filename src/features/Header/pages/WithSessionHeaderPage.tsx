import Header from '../components/Header'

import { useSession } from '@hooks/useMyParams'

import { Outlet } from 'react-router'

export default function WithSessionHeaderPage() {
  const { status } = useSession()

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
      <Header />
      <Outlet />
    </>
  )
}
