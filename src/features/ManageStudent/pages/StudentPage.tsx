import InformationalGradesDialog from '../components/GradesDialog'

import { db } from '@db'
import useSetTitle from '@hooks/useSetTitle'

import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function StudentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [openInformational, setOpenInformational] = useState(false)

  const student = useLiveQuery(async () => {
    return db.students
      .get(parseInt(id || ''))
      .then(student => student ?? navigate('/'))
      .catch(() => navigate('/'))
  }, [id])

  const title = student
    ? `${student.first_name} ${student.last_name} | CS 208 Ethics Project`
    : 'CS 208 Ethics Project'
  useSetTitle(title)

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
      />
    </>
  )
}
