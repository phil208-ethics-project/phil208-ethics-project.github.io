import InformationalGradesDialog from '../components/GradesDialog'

import { useSession, useStudent } from '@/hooks/useMyParams'
import useSetTitle from '@hooks/useSetTitle'

import { useState } from 'react'

export default function StudentPage() {
  const { student, status: studentStatus } = useStudent()
  const { status: sessionStatus } = useSession()

  const [openInformational, setOpenInformational] = useState(false)

  const title = student
    ? `${student.first_name} ${student.last_name} | CS 208 Ethics Project`
    : 'CS 208 Ethics Project'
  useSetTitle(title)

  if (sessionStatus === 'failed') {
    return <p>The session you have selected does not exist</p>
  }

  if (studentStatus === 'failed') {
    return <p>The student you are looking for does not exist</p>
  }

  return (
    <>
      <h1 className='m-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        {student?.first_name}{' '}
        <mark className='px-2 text-white bg-slate-400 rounded '>
          {student?.last_name}
        </mark>
      </h1>
      <button
        className='border-2 m-4 rounded p-2 hover:bg-gray-100 transition-colors text-xs text-gray-700 uppercase font-bold'
        onClick={() => setOpenInformational(true)}
      >
        Grade Student!
      </button>

      <InformationalGradesDialog
        isOpen={openInformational}
        exit={() => setOpenInformational(false)}
        student={student}
      />
    </>
  )
}
