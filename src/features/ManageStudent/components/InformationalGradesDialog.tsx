import Dialog from '@components/Dialog'
import { db, InformationalGrade } from '@db'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

interface Props {
  isOpen: boolean
  exit: () => void
}

async function getInitalInformational(
  student_id: number,
): Promise<InformationalGrade> {
  const result = await db.informational_grades
    .where('student_id')
    .equals(student_id)
    .first()
  if (result) return result
  return {
    student_id,
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

  const [value, setValue] = useState<InformationalGrade>()

  useEffect(() => {
    getInitalInformational(parseInt(id!)).then(v => setValue(v))
  }, [isOpen])

  return (
    <Dialog exit={exit} isOpen={isOpen}>
      <h1 className='text-xl font-extrabold dark:text-white'>
        Informational
        <small className='ms-2 font-semibold text-gray-500 dark:text-gray-400'>
          Enter grades here
        </small>
      </h1>

      <table className='text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-2 py-3'>V</th>
            <th className='px-2 py-3'>KD</th>
            <th className='px-2 py-3'>CA</th>
            <th className='px-2 py-3'>I</th>
            <th className='px-2 py-3'>E</th>
            <th className='px-2 py-3'>L</th>
            <th className='px-2 py-3'>GO</th>
            <th className='px-2 py-3'>MI</th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700'>
            <td>
              <input
                checked={value?.v ?? false}
                onChange={({ target }) =>
                  setValue(v => v && { ...v, v: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={value?.kd ?? false}
                onChange={({ target }) =>
                  setValue(v => v && { ...v, kd: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={value?.ca ?? false}
                onChange={({ target }) =>
                  setValue(v => v && { ...v, ca: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={value?.i ?? false}
                onChange={({ target }) =>
                  setValue(v => v && { ...v, i: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={value?.e ?? false}
                onChange={({ target }) =>
                  setValue(v => v && { ...v, e: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={value?.l ?? false}
                onChange={({ target }) =>
                  setValue(v => v && { ...v, l: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={value?.go ?? false}
                onChange={({ target }) =>
                  setValue(v => v && { ...v, go: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={value?.mi ?? false}
                onChange={({ target }) =>
                  setValue(v => v && { ...v, mi: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={async () => {
          value && db.informational_grades.put(value)
          exit()
        }}
      >
        Submit
      </button>
    </Dialog>
  )
}
