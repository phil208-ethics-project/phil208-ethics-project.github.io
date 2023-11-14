import { Link, To } from 'react-router-dom'

interface NavlinkProps {
  children: React.ReactNode
  to: To
}

function Navlink({ children, to }: NavlinkProps) {
  return (
    <Link
      className='text-black font-semibold uppercase border-b-2 border-transparent hover:border-black transition-all leading-5'
      to={to}
    >
      {children}
    </Link>
  )
}

export default function Navbar() {
  return (
    <div className='flex-grow flex justify-around'>
      <Navlink to='student-dashboard'>Student Dashboard</Navlink>
    </div>
  )
}
