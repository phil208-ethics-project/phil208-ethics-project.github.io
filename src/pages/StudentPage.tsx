import { db } from '@db'

import { useLiveQuery } from 'dexie-react-hooks'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function StudentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const student = useLiveQuery(async () => {
    return db.students
      .get(parseInt(id || ''))
      .then(student => student ?? navigate('/'))
      .catch(() => navigate('/'))
  }, [location])

  return (
    <>
      <p>{student?.first_name}</p>
      <p>{student?.last_name}</p>
    </>
  )
}
