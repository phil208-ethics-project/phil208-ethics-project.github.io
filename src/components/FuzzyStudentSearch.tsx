import { db, Student } from '@db'
import useDebounce from '@hooks/useDebounce'
import useFocused from '@hooks/useFocused'

import { useLiveQuery } from 'dexie-react-hooks'
import Fuse, { FuseResult } from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'

const fuse = new Fuse<Student>([], {
  keys: ['first_name', 'last_name'],
})

interface ItemProps {
  student: FuseResult<Student>
}

function Item({ student }: ItemProps) {
  return (
    <Link
      tabIndex={0}
      className='block hover:bg-gray-100 rounded p-1 truncate'
      to={`/student/${student.item.id}`}
    >
      {student.item.first_name} {student.item.last_name}
    </Link>
  )
}

export default function FuzzyStudentSearch() {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const search = useDebounce(value, 350)
  const [results, setResults] = useState<FuseResult<Student>[]>([])
  const focus = useFocused()
  const optionsAvailible = useMemo(
    () => focus.isFocused && results.length != 0,
    [focus.isFocused, results.length == 0],
  )

  const students = useLiveQuery(async () => {
    return await db.students.toArray()
  }, [])

  useEffect(() => fuse.setCollection(students || []), [students])

  useEffect(() => {
    const res = fuse.search(search)
    setResults(res)
  }, [search, students])

  return (
    <div {...focus.props} className='inline-block relative w-full'>
      <div className='relative border-2 peer rounded-full p-2 ps-6 flex flex-row items-center pe-2'>
        <form
          className='w-full'
          onSubmit={e => {
            e.preventDefault()
            results[0]?.item && navigate(`/student/${results[0].item.id}`)
          }}
        >
          <input
            placeholder='Search...'
            value={value}
            onChange={e => setValue(e.target.value)}
            className='outline-none inline w-full border-0 focus:ring-0'
          />
        </form>

        <ImCancelCircle
          data-isvisible={value !== ''}
          onClick={() => setValue('')}
          className='opacity-0 text-gray-200 hover:text-gray-300 cursor-pointer font-thin hover:font-bold transition-all text-2xl data-[isvisible=true]:opacity-100'
        />
      </div>

      <div
        data-isfocused={optionsAvailible}
        className='z-10 hidden hover:block focus:block absolute w-full bg-white rounded-lg border-2 opacity-95 p-2 data-[isfocused=true]:block'
      >
        {results.map((student, index) => (
          <Item key={index} student={student} />
        ))}
      </div>
    </div>
  )
}
