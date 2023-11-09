import { useLiveQuery } from 'dexie-react-hooks'
import Fuse, { FuseResult } from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'

import { db, Student } from '../db'
import useDebounce from '../hooks/useDebounce'
import useFocused from '../hooks/useFocused'

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
  const [value, setValue] = useState('')
  const search = useDebounce(value, 350)
  const [results, setResults] = useState<FuseResult<Student>[]>([])
  const focus = useFocused()
  const optionsAvailible = useMemo(
    () => focus.isFocused || value !== '',
    [focus.isFocused, value],
  )

  const students = useLiveQuery(async () => {
    return await db.students.toArray()
  }, [])

  const allStudentsFuseResults = useMemo(
    () => students?.map((student, refIndex) => ({ item: student, refIndex })),
    [students],
  )

  useEffect(() => fuse.setCollection(students || []), [students])

  useEffect(() => {
    const res = fuse.search(search)
    if (res.length == 0) return setResults(allStudentsFuseResults || [])
    setResults(res)
  }, [search, students])

  return (
    <div className='inline-block relative w-full'>
      <div className='relative border-2 peer rounded-full p-2 ps-6 flex flex-row items-center'>
        <input
          {...focus.props}
          placeholder='Search...'
          value={value}
          onChange={e => setValue(e.target.value)}
          className='outline-none inline w-full'
        />
        <ImCancelCircle
          data-isFocused={optionsAvailible}
          onClick={() => setValue('')}
          className='opacity-0 text-gray-200 hover:text-gray-300 cursor-pointer transition-all text-xl data-[isFocused=true]:opacity-100'
        />
      </div>

      <div
        data-isFocused={optionsAvailible}
        className='z-10 hidden hover:block focus:block absolute w-full bg-white rounded-lg border-2 opacity-95 p-2 data-[isFocused=true]:block'
      >
        {results.map((student, index) => (
          <Item key={index} student={student} />
        ))}
      </div>
    </div>
  )
}
