import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'

export default function StudentDastboard() {
  return (
    <div className='absolute grid grid-cols-2'>
      <div>
        <NewStudentForm />
      </div>
      <div className='h-screen relative'>
        <div className='w-64 h-2/3 my-16'>
          <StudentTable />
        </div>
      </div>
    </div>
  )
}
