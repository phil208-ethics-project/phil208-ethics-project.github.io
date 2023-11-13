import { db } from '@db'

import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { useParams } from 'react-router'

type Status = 'loading' | 'complete' | 'failed'

export default function useStudent() {
  const { id } = useParams()
  const student_id = id === undefined ? NaN : parseInt(id)
  const [status, setStatus] = useState<Status>('loading')

  const student = useLiveQuery(async () => {
    const res = await db.students.get(student_id)
    if (res === undefined) setStatus('failed')
    else setStatus('complete')
    return res
  }, [id])

  return { status, student }
}
