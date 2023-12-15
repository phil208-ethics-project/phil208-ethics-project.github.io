// StudentDashboard.tsx

import { Link } from 'react-router-dom'
import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'
import FuzzyStudentSearch from '@components/FuzzyStudentSearch'
import useSetTitle from '@hooks/useSetTitle'

export default function StudentDashboard() {
  useSetTitle('Students | CS 208 Ethics Project')

  return (
    <div>
      <div className='m-6'>
        <FuzzyStudentSearch />
      </div>
      <div className='mx-0 sm:mx-6 flex flex-col sm:flex-row gap-6 sm:gap-0'>
        <NewStudentForm />
        <StudentTable />
      </div>

      {/* Button to navigate to StudentBigTable */}
      <Link to='/students'>
        <button className='bg-blue-500 text-white px-4 py-2 mt-4'>
          Go to Student Table
        </button>
      </Link>
    </div>
  )
}
