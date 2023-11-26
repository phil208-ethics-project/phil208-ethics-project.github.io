import { db } from '@db'
import { useSession } from '@hooks/useMyParams'

import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function CreateSession() {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  return (
    <>
      <h1 className='text-2xl font-bold'>Create New Session</h1>
      <form
        onSubmit={async e => {
          e.preventDefault()
          if (name === '') return
          const repeat = await db.sessions.filter(s => s.name == name).count()
          if (repeat != 0) return

          const id = await db.sessions.add({ date: Date.now(), name })
          setName('')
          navigate(`/session/${id}/change-session`)
        }}
        className='grid max-w-md gap-2'
      >
        <input value={name} onChange={e => setName(e.target.value)}></input>
        <button className='rounded border-2 hover:bg-gray-100 transition-all'>
          Submit
        </button>
      </form>
    </>
  )
}

export default function ManageSessions() {
  const { status, session } = useSession()
  const navigate = useNavigate()

  const sessions = useLiveQuery(() => db.sessions.toArray())

  if (status == 'loading') return <>Loading...</>
  const value = status == 'failed' ? '' : session.id

  if (sessions?.length === 0) return <CreateSession />

  return (
    <>
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
      <CreateSession />
    </>
  )
}
