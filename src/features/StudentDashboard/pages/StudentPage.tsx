import FuzzyStudentSearch from '../../../components/FuzzyStudentSearch'
import useSetTitle from '../../../hooks/useSetTitle'
import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'

export default function StudentDastboard() {
  useSetTitle('Students | CS 208 Ethics Project')
  return (
    <div>
      <div className='m-10 mb-0'>
        <FuzzyStudentSearch />
      </div>
      <div className='absolute grid gap-6 mb-6 sm:grid-cols-2'>
        <div>
          <NewStudentForm />
        </div>
        <div className='h-screen relative'>
          <div className='w-64 h-2/3 mx-16 sm:mx-0 sm:my-16'>
            <StudentTable />
          </div>
        </div>
      </div>
    </div>
  )
}
