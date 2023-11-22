import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'
import FileUpload from '@features/SaveData/components/FileUpload'

import FuzzyStudentSearch from '@components/FuzzyStudentSearch'
import useSetTitle from '@hooks/useSetTitle'

export default function StudentDastboard() {
  useSetTitle('Students | PHIL 208 Ethics Project')

  // const onUpload = (file: any) => {  // Dummy place holder
  //   console.log('Uploaded files:', file);
  // };
  return (
    <div className="flex flex-col space-y-5">
      <div className='m-6'>
        <h1 className='mb-4'>Search for a student and view their page!</h1>
        <FuzzyStudentSearch />
      </div>
      <div>
        <div className='mx-0 sm:mx-6 flex sm:flex-row gap-6 sm:gap-0 space-x-10'>
          <div className='w-1/4'>
            <h1 className='mb-4'>Upload Students</h1>
            <FileUpload />
          </div>
          <div className='w-1/4'>
            <h1 className='mb-4'>Enter Students</h1>
            <NewStudentForm />
          </div>
          <div className='w-1/2'>
            <h1 className='mb-4'>Student Table</h1>
            <StudentTable />
          </div>
        </div>
      </div>
    </div>
  )
}
