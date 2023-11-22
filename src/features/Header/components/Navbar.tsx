import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='flex-grow flex justify-around'>
      <Link
        className='text-black font-semibold uppercase border-b-2 border-transparent hover:border-black transition-all leading-5'
        to='/session/0/student-dashboard'
      >
        Student Dashboard
      </Link>
    </div>
  )
}
