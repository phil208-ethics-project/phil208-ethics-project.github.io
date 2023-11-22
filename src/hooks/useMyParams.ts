import { db, Session, Student } from '@db'

import { useLiveQuery } from 'dexie-react-hooks'
import { useParams } from 'react-router'

type StudentResult =
  | { status: 'failed'; student: never; id: never }
  | {
      status: 'loading'
      student: never
      id: number
    }
  | { status: 'success'; student: Student; id: number }

export function useStudent(): StudentResult {
  const { student } = useParams()
  const studentId = student === undefined ? NaN : parseInt(student)

  const query = useLiveQuery(async () => {
    if (isNaN(studentId)) return { status: 'failed' }
    const res = await db.students.get(studentId)
    if (res == null) return { status: 'failed' }
    return { status: 'success', student: res, id: studentId }
  }, [studentId]) ?? { status: 'loading', id: studentId }

  return query as StudentResult
}

type SessionResult =
  | { status: 'failed'; session: never; id: never }
  | {
      status: 'loading'
      session: never
      id: number
    }
  | { status: 'success'; session: Session; id: number }

export function useSession(): SessionResult {
  const { session } = useParams()
  const sessionId = session === undefined ? NaN : parseInt(session)

  const query = useLiveQuery(async () => {
    if (isNaN(sessionId)) return { status: 'failed' }
    const res = await db.sessions.get(sessionId)
    if (res == null) return { status: 'failed' }
    return { status: 'success', session: res, id: sessionId }
  }, [sessionId]) ?? { status: 'loading', id: sessionId }

  return query as SessionResult
}
