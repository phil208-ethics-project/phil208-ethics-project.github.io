import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'

import FuzzyStudentSearch from '@components/FuzzyStudentSearch'
import {
  db,
  FictionalGrade,
  InformationalGrade,
  ReadingLevelGrade,
  SpellingGrade,
  Student,
  studentSchema,
} from '@db'
import FileUpload from '@features/SaveData/components/FileUpload'
import { readZip } from '@features/SaveData/lib/readFile'
import useSetTitle from '@hooks/useSetTitle'

import { parse } from 'papaparse'
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

  // Table Schemas
  const student: string = ['first_name', 'last_name', 'gender', 'age']
    .sort()
    .toString()
  const fictionalGrade: string = [
    'session_id',
    'student_id',
    'v',
    'kd',
    'ca',
    'i',
    'e',
    'l',
    'go',
    'mi',
  ]
    .sort()
    .toString()
  const informationalGrade: string = [
    'session_id',
    'student_id',
    'v',
    'kd',
    'ar',
    'i',
    'e',
    'l',
    'tf',
    'mi',
  ]
    .sort()
    .toString()
  const spellingGrade: string = [
    'session_id',
    'student_id',
    'phonetic_short_vowels',
    'phonetic_consonant_blends',
    'phonetic_consonant_digraphs',
    'transitional_long_vowels',
    'transitional_complex_vowels',
    'fluent_inflectional_endings',
    'fluent_multisyllabic_words_2_syllabes',
    'advanced_multisyllabic_words_3_syllabes',
  ]
    .sort()
    .toString()
  const readingLevel: string = ['session_id', 'student_id', 'reading_level']
    .sort()
    .toString()

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

      const studentResult = z.array(studentSchema).safeParse(csvDict)
      if (studentResult.success == true) {
        studentResult.data
      }

      console.log('csvDict', csvDict)

      console.log(filename, data)
      const columns: string = parsed.data[0].sort().toString()
      console.log('hellooooooo')
      console.log(parsed.data)
      console.log(columns)

      switch (columns) {
        case student:
          // NOTE FOR MAX REVIEW
          // If an error occurs at this point, either type inference fails or column order fails
          // Can we make this so we depend less on column order?

          // NOTE FOR MAX REVIEW
          // I think the export student thing is exporting the header twice
          const students: Student[] = parsed.data.map(arr => ({
            first_name: arr[0],
            last_name: arr[1],
            age: arr[2],
            gender: arr[3],
          }))
          db.students.bulkAdd(students)
          break

        case fictionalGrade:
          // NOTE FOR MAX REVIEW
          // I think this is throiwng errors because the false's are encoded to empty strings?
          const fictionalGrades: FictionalGrade[] = parsed.data.map(arr => ({
            session_id: arr[0],
            student_id: arr[1],
            v: arr[2],
            kd: arr[3],
            ca: arr[4],
            i: arr[5],
            e: arr[6],
            l: arr[7],
            go: arr[8],
            mi: arr[9],
          }))
          console.log(fictionalGrades)
          db.fictional_grades.bulkAdd(fictionalGrades)
          break

        case informationalGrade:
          // NOTE FOR MAX REVIEW
          // I think this is throiwng errors because the false's are encoded to empty strings?
          const informationalGrades: InformationalGrade[] = parsed.data.map(
            arr => ({
              session_id: arr[0],
              student_id: arr[1],
              v: arr[2],
              kd: arr[3],
              ar: arr[4],
              i: arr[5],
              e: arr[6],
              l: arr[7],
              tf: arr[8],
              mi: arr[9],
            }),
          )
          db.informational_grades.bulkAdd(informationalGrades)
          break

        case spellingGrade:
          const spellingGrades: SpellingGrade[] = parsed.data.map(arr => ({
            session_id: arr[0],
            student_id: arr[1],
            phonetic_short_vowels: arr[2],
            phonetic_consonant_blends: arr[3],
            phonetic_consonant_digraphs: arr[4],
            transitional_long_vowels: arr[5],
            transitional_complex_vowels: arr[6],
            fluent_inflectional_endings: arr[7],
            fluent_multisyllabic_words_2_syllabes: arr[8],
            advanced_multisyllabic_words_3_syllabes: arr[9],
          }))
          db.spelling_grades.bulkAdd(spellingGrades)
          break

        case readingLevel:
          const readingLevels: ReadingLevelGrade[] = parsed.data.map(arr => ({
            session_id: arr[0],
            student_id: arr[1],
            reading_level: arr[2],
          }))
          db.reading_grades.bulkAdd(readingLevels)
          break

        default:
          console.error('Columns dont match expected schema');
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default function StudentDastboard() {
  useSetTitle('Students | PHIL 208 Ethics Project')

  // const onUpload = (file: any) => {  // Dummy place holder
  //   console.log('Uploaded files:', file);
  // };
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
    </div>
  )
}
