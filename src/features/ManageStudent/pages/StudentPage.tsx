import InformationalGradesDialog from '../components/InformationalGradesDialog'

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
      <p>{student?.first_name}</p>
      <p>{student?.last_name}</p>
      <button onClick={() => setOpenInformational(true)}>
        Open InformationalGradesDialog
      </button>
      <InformationalGradesDialog
        isOpen={openInformational}
        exit={() => setOpenInformational(false)}
      />
    </>
  )
}
