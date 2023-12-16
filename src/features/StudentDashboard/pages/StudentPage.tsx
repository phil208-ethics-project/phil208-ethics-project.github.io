// StudentDashboard.tsx

import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'

import FuzzyStudentSearch from '@components/FuzzyStudentSearch'
import {
  db,
  fictionalGradeSchema,
  informationalGradeSchema,
  readingLevelSchema,
  spellingGradeSchema,
  studentSchema,
} from '@db'
import FileUpload from '@features/SaveData/components/FileUpload'
import { readZip } from '@features/SaveData/lib/readFile'
import useSetTitle from '@hooks/useSetTitle'

import { parse } from 'papaparse'
import { Link } from 'react-router-dom'
import { z } from 'zod'

async function onUpload(files: FileList) {
  let fileText: { [name: string]: string } = {}
  const analyzeFiles = Array.from(files).map(async file => {
    if (file.name.endsWith('.zip')) {
      const zipFileResult = await readZip(file)
      fileText = { ...fileText, ...zipFileResult }
    } else {
      fileText[file.name] = await file.text()
    }
  })

  await Promise.all(analyzeFiles)

  for (const [filename, text] of Object.entries(fileText)) {
    try {
      const parsed = parse<unknown>(text)

      const basicSchema = z.array(z.array(z.string())).min(1)
      const data = basicSchema.parse(parsed.data)

      if (data.length == 0) {
        throw new Error('Must include column header row')
      }

      const headers = data[0]
      const rest = data.slice(1)

      const csvDict = rest.map(row => {
        return row.reduce<Record<string, string>>((acc, val, i) => {
          acc[headers[i]] = val
          return acc
        }, {})
      })

      // Check all tables on zod schema and parse file
      const studentParsed = z.array(studentSchema).safeParse(csvDict)
      if (studentParsed.success == true) {
        await db.students.bulkAdd(studentParsed.data)
        continue
      }

      const readingParsed = z.array(readingLevelSchema).safeParse(csvDict)
      if (readingParsed.success) {
        await db.reading_grades.bulkAdd(readingParsed.data)
        continue
      }

      const spellingParsed = z.array(spellingGradeSchema).safeParse(csvDict)
      if (spellingParsed.success) {
        await db.spelling_grades.bulkAdd(spellingParsed.data)
        continue
      }

      const informationalParsed = z
        .array(informationalGradeSchema)
        .safeParse(csvDict)
      if (informationalParsed.success) {
        await db.informational_grades.bulkAdd(informationalParsed.data)
        continue
      }

      const fictionalParsed = z.array(fictionalGradeSchema).safeParse(csvDict)
      if (fictionalParsed.success) {
        await db.fictional_grades.bulkAdd(fictionalParsed.data)
        continue
      }

      throw new Error(`Failed to parse ${filename}`)
    } catch (e) {
      console.error(e)
    }
  }
}

export default function StudentDashboard() {
  useSetTitle('Students | PHIL 208 Ethics Project')

  return (
    <div className='flex flex-col space-y-5'>
      <div className='m-6'>
        <h1 className='mb-4'>Search for a student and view their page!</h1>
        <FuzzyStudentSearch />
      </div>
      <div>
        <div className='mx-0 sm:mx-6 flex sm:flex-row gap-6 sm:gap-0 space-x-10'>
          <div className='w-1/4'>
            <h1 className='mb-4'>Upload Students</h1>
            <FileUpload onUpload={onUpload} />
          </div>
          <div className='w-1/4'>
            <h1 className='mb-4'>Enter Students</h1>
            <NewStudentForm />
          </div>
          <div className='w-1/2'>
            <h1 className='mb-4'>Student Table</h1>
            <StudentTable />
          </div>
        </div>
      </div>

      {/* Button to navigate to StudentBigTable */}
      <Link to='/students'>
        <button className='bg-blue-500 text-white px-4 py-2 mt-4'>
          Go to Student Table
        </button>
      </Link>
    </div>
  )
}
