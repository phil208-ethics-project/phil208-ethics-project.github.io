import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'

import FuzzyStudentSearch from '@components/FuzzyStudentSearch'
import useSetTitle from '@hooks/useSetTitle'

export default function StudentDastboard() {
  useSetTitle('Students | PHIL 208 Ethics Project')
  return (
    <div>
      <div className='m-6'>
        <FuzzyStudentSearch />
      </div>
      <div className='mx-0 sm:mx-6 flex flex-col sm:flex-row gap-6 sm:gap-0'>
        <NewStudentForm />
        <StudentTable />
      </div>
    </div>
  )
}
