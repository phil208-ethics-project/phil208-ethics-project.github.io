import { db, Student } from '@db'
import GradesDialog from '@features/ManageStudent/components/GradesDialog'

import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router'

function StudentRow({
  student,
  setCurrStudent,
}: {
  student: Student
  setCurrStudent: (student: Student) => void
}) {
  const navigate = useNavigate()
  const params = useParams()
  const session = parseInt(params.session || '')
  return (
    <tr
      className='bg-white border-b hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors'
      onClick={() => navigate(`/session/${session}/student/${student.id}`)}
    >
      <td className='px-6 py-4'>{student.id}</td>
      <td className='px-6 py-4'>
        {student.first_name} {student.last_name}
      </td>
      <td>
        <div
          title='Grade Student'
          className='hover:bg-gray-200 text-lg rounded-full p-2 aspect-square flex justify-center items-center transition-colors'
          onClick={e => {
            e.stopPropagation()
            setCurrStudent(student)
          }}
        >
          <HiOutlineClipboardList />
        </div>
      </td>
      <td className='pe-3'>
        <div
          title='Delete Student'
          className='hover:bg-gray-200 rounded-full p-2 aspect-square flex justify-center items-center transition-colors'
          onClick={e => {
            e.stopPropagation()
            if (student.id) db.students.delete(student.id)
          }}
        >
          <FaRegTrashAlt />
        </div>
      </td>
    </tr>
  )
}

export default function StudentTable() {
  const students = useLiveQuery(() => db.students.toArray())
  const [currStudent, setCurrStudent] = useState<Student | undefined>()

  return (
    <div className='max-h-[36rem] sm:max-w-sm grow-[10] overflow-y-auto rounded border-4 '>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-200 sticky top-0'>
          <tr>
            <th className='px-6 py-3'>id</th>
            <th className='px-6 py-3'>Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => (
            <StudentRow
              key={index}
              student={student}
              setCurrStudent={setCurrStudent}
            />
          ))}
        </tbody>
      </table>
      <GradesDialog
        key={currStudent?.id}
        isOpen={currStudent !== undefined}
        exit={() => setCurrStudent(undefined)}
        student={currStudent}
      />
    </div>
  )
}
