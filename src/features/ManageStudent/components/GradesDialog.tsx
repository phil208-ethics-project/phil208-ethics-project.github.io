import Dialog from '@components/Dialog'
import { SessionContext } from '@components/SessionContext'
import { db, FictionalGrade, InformationalGrade } from '@db'

import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

interface Props {
  isOpen: boolean
  exit: () => void
}

async function getInitalInformational(
  session_id: number,
  student_id: number,
): Promise<InformationalGrade> {
  const result = await db.informational_grades.get([session_id, student_id])
  if (result) return result
  return {
    student_id,
    session_id,
    ar: false,
    e: false,
    tf: false,
    i: false,
    kd: false,
    l: false,
    mi: false,
    v: false,
  }
}

async function getInitalFictional(
  session_id: number,
  student_id: number,
): Promise<FictionalGrade> {
  const result = await db.fictional_grades.get([session_id, student_id])
  if (result) return result
  return {
    student_id,
    session_id,
    ca: false,
    e: false,
    go: false,
    i: false,
    kd: false,
    l: false,
    mi: false,
    v: false,
  }
}

export default function InformationalGradesDialog({ isOpen, exit }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { session } = useContext(SessionContext)

  const [informationalGrades, setInformationalGrades] =
    useState<InformationalGrade>()
  const [fictionalGrades, setFictionalGrades] = useState<FictionalGrade>()
  const informationalSum =
    (informationalGrades &&
      +informationalGrades.ar +
        +informationalGrades.e +
        +informationalGrades.i +
        +informationalGrades.kd +
        +informationalGrades.l +
        +informationalGrades.mi +
        +informationalGrades.tf +
        +informationalGrades.v) ||
    0

  const fictionalSum =
    (fictionalGrades &&
      +fictionalGrades.ca +
        +fictionalGrades.e +
        +fictionalGrades.i +
        +fictionalGrades.kd +
        +fictionalGrades.l +
        +fictionalGrades.mi +
        +fictionalGrades.go +
        +fictionalGrades.v) ||
    0

  useEffect(() => {
    if (!isOpen) return
    console.log(session)
    const student_id = parseInt(id ?? '')
    const session_id = session ?? NaN
    if (isNaN(student_id) || isNaN(session_id)) return navigate('/')
    getInitalInformational(session_id, student_id).then(v => {
      setInformationalGrades(v)
    })
    getInitalFictional(session_id, student_id).then(v => {
      setFictionalGrades(v)
    })
  }, [isOpen])

  return (
    <Dialog exit={exit} isOpen={isOpen}>
      <h1 className='text-xl font-extrabold dark:text-white'>
        Grades
        <small className='ms-2 font-semibold text-gray-500 dark:text-gray-400'>
          Enter student scores here
        </small>
      </h1>

      <table className='text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 table-auto'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-100'>
          <tr>
            <th className='px-2 py-3'></th>
            <th className='px-2 py-3'>V</th>
            <th className='px-2 py-3'>KD</th>
            <th className='px-2 py-3'>AR</th>
            <th className='px-2 py-3'>I</th>
            <th className='px-2 py-3'>E</th>
            <th className='px-2 py-3'>L</th>
            <th className='px-2 py-3'>TF</th>
            <th className='px-2 py-3'>MI</th>
            <th className='px-2 py-3'>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700'>
            <th className='px-2 py-3'>Informational</th>

            <td>
              <input
                checked={informationalGrades?.v ?? false}
                onChange={({ target }) =>
                  setInformationalGrades(v => v && { ...v, v: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={informationalGrades?.kd ?? false}
                onChange={({ target }) =>
                  setInformationalGrades(v => v && { ...v, kd: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={informationalGrades?.ar ?? false}
                onChange={({ target }) =>
                  setInformationalGrades(v => v && { ...v, ar: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={informationalGrades?.i ?? false}
                onChange={({ target }) =>
                  setInformationalGrades(v => v && { ...v, i: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={informationalGrades?.e ?? false}
                onChange={({ target }) =>
                  setInformationalGrades(v => v && { ...v, e: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={informationalGrades?.l ?? false}
                onChange={({ target }) =>
                  setInformationalGrades(v => v && { ...v, l: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={informationalGrades?.tf ?? false}
                onChange={({ target }) =>
                  setInformationalGrades(v => v && { ...v, tf: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={informationalGrades?.mi ?? false}
                onChange={({ target }) =>
                  setInformationalGrades(v => v && { ...v, mi: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>{informationalSum}</td>
          </tr>
        </tbody>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-100'>
          <tr>
            <th className='px-2 py-3'></th>

            <th className='px-2 py-3'>V</th>
            <th className='px-2 py-3'>KD</th>
            <th className='px-2 py-3'>CA</th>
            <th className='px-2 py-3'>I</th>
            <th className='px-2 py-3'>E</th>
            <th className='px-2 py-3'>L</th>
            <th className='px-2 py-3'>GO</th>
            <th className='px-2 py-3'>MI</th>
            <th className='px-2 py-3'></th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  dark:border-gray-700'>
            <th className='px-2 py-3'>Fictional</th>

            <td>
              <input
                checked={fictionalGrades?.v ?? false}
                onChange={({ target }) =>
                  setFictionalGrades(v => v && { ...v, v: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={fictionalGrades?.kd ?? false}
                onChange={({ target }) =>
                  setFictionalGrades(v => v && { ...v, kd: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={fictionalGrades?.ca ?? false}
                onChange={({ target }) =>
                  setFictionalGrades(v => v && { ...v, ca: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={fictionalGrades?.i ?? false}
                onChange={({ target }) =>
                  setFictionalGrades(v => v && { ...v, i: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={fictionalGrades?.e ?? false}
                onChange={({ target }) =>
                  setFictionalGrades(v => v && { ...v, e: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={fictionalGrades?.l ?? false}
                onChange={({ target }) =>
                  setFictionalGrades(v => v && { ...v, l: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={fictionalGrades?.go ?? false}
                onChange={({ target }) =>
                  setFictionalGrades(v => v && { ...v, go: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={fictionalGrades?.mi ?? false}
                onChange={({ target }) =>
                  setFictionalGrades(v => v && { ...v, mi: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>{fictionalSum}</td>
          </tr>
        </tbody>
      </table>
      <button
        className='border-2 rounded p-2 hover:bg-gray-100 transition-colors text-xs text-gray-700 uppercase font-bold m-2'
        onClick={async () => {
          informationalGrades &&
            db.informational_grades.put(informationalGrades)
          fictionalGrades && db.fictional_grades.put(fictionalGrades)
          exit()
        }}
      >
        Submit
      </button>
      <button
        className='border-2 rounded p-2 hover:bg-gray-100 transition-colors text-xs text-gray-700 uppercase font-bold'
        onClick={exit}
      >
        Exit
      </button>
    </Dialog>
  )
}
