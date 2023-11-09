import { useLiveQuery } from 'dexie-react-hooks'
import Fuse, { FuseResult } from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { db, Student } from '../db'
import useDebounce from '../hooks/useDebounce'

const fuse = new Fuse<Student>([], {
  keys: ['first_name', 'last_name'],
})

interface ItemProps {
  student: FuseResult<Student>
}

function Item({ student }: ItemProps) {
  return (
    <Link
      className='block hover:bg-gray-100 rounded p-1'
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
    <div className=''>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        className='border-2 peer rounded-full p-2 px-6'
      ></input>
      <div className='hidden peer-focus:block hover:block absolute bg-white rounded border-2 opacity-95 p-2'>
        {results.map((student, index) => (
          <Item key={index} student={student} />
        ))}
      </div>
    </div>
  )
}
