import { db } from '@db'

import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate, useParams } from 'react-router-dom'

export default function StudentPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const student = useLiveQuery(async () => {
    return db.students
      .get(parseInt(id || ''))
      .then(student => student ?? navigate('/'))
      .catch(() => navigate('/'))
  }, [id])

  return (
    <>
      <p>{student?.first_name}</p>
      <p>{student?.last_name}</p>
    </>
  )
}
