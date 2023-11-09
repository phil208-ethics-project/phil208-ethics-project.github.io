import { useLiveQuery } from 'dexie-react-hooks'
import Fuse, { FuseResult } from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'

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
    <div>
      {student.item.first_name} {student.item.last_name}
    </div>
  )
}

export default function FuzzyStudentSearch() {
  const [value, setValue] = useState('')
  const search = useDebounce(value, 350)
  const [results, setResults] = useState<FuseResult<Student>[]>([])

  const students = useLiveQuery(async () => {
    return await db.students.toArray()
    // return new Fuse(students, { keys: ['first_name', 'last_name'] })
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
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        className='border-2'
      ></input>
      <div>
        {results.map((student, index) => (
          <Item key={index} student={student} />
        ))}
      </div>
    </div>
  )
}
