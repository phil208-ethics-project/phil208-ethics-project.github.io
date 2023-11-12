import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'

import FuzzyStudentSearch from '@components/FuzzyStudentSearch'
import useSetTitle from '@hooks/useSetTitle'

export default function StudentDastboard() {
  useSetTitle('Students | CS 208 Ethics Project')
  return (
    <div>
      <div className='m-10 mb-0'>
        <FuzzyStudentSearch />
      </div>
      <div className='m-0 sm:m-6 flex flex-col sm:flex-row'>
        <NewStudentForm />
        <StudentTable />
      </div>
    </div>
  )
}
