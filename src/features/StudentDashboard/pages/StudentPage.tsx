import NewStudentForm from '../components/NewStudentForm'
import StudentTable from '../components/StudentTable'
import FileUpload from '@features/SaveData/components/FileUpload'

import { Student, db } from '@db'
import { parse } from "papaparse";


import FuzzyStudentSearch from '@components/FuzzyStudentSearch'
import useSetTitle from '@hooks/useSetTitle'
import { readZip } from '@features/SaveData/lib/readFile';



async function onUpload(files: FileList) {
  let fileText: { [name: string]: string}= {}
  const analyzeFiles = Array.from(files).map(async file => {
    if (file.name.endsWith(".zip")) {
      const zipFileResult = await readZip(file)
      fileText = {...fileText, ...zipFileResult}
    } else {
      fileText[file.name] = await file.text()
    }

  })

  await Promise.all(analyzeFiles)

  for (let [filename, text] of Object.entries(fileText)) {
    try {
      const parsed = parse<unknown>(text)
      console.log(filename, parsed.data)
      const students: Student[] = parsed.data.map(arr => ({first_name: arr[0], last_name: arr[1], age: arr[2], gender: arr[3]}))
      db.students.bulkAdd(students)
    } catch(e) {
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
    <div className="flex flex-col space-y-5">
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
