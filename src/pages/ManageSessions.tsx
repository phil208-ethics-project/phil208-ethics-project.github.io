import { db } from '@db'
import { useSession } from '@hooks/useMyParams'

import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router'

export default function ManageSessions() {
  const { status, session } = useSession()
  const navigate = useNavigate()

  const sessions = useLiveQuery(() => db.sessions.toArray())

  if (status == 'loading') return <>Loading...</>
  const value = status == 'failed' ? '' : session.id

  return (
    <select
      className=' w-full max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 invalid:text-gray-400'
      onChange={e => navigate(`/session/${e.target.value}/change-session`)}
      value={value}
    >
      <option value='' disabled hidden>
        Choose...
      </option>
      {sessions?.map(session => (
        <option key={session.id} value={session.id}>
          {session.name}
        </option>
      ))}
    </select>
  )
}
