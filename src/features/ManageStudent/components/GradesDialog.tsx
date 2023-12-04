import Dialog from '@components/Dialog'
import { SessionContext } from '@components/SessionContext'
import { db, FictionalGrade, InformationalGrade, Student, ReadingLevelGrade, SpellingGrade } from '@db'

import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
const readingLevels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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

async function getInitalReadingLevel(
  session_id: number,
  student_id: number,
): Promise<ReadingLevelGrade> {
  const result = await db.reading_grades.get([session_id, student_id]);
  if (result) return result;
  return {
    student_id,
    session_id,
    reading_level: '',
  };
}

async function getInitialSpelling(
  session_id: number,
  student_id: number,
): Promise<SpellingGrade> {
  const result = await db.spelling_grades.get([session_id, student_id])
  if (result) return result;
  return {
    student_id,
    session_id,
    phonetic_short_vowels: false,
    phonetic_consonant_blends: false,
    phonetic_consonant_digraphs: false,
    transitional_long_vowels: false,
    transitional_complex_vowels: false,
    fluent_inflectional_endings: false,
    fluent_multisyllabic_words_2_syllabes: false,
    advanced_multisyllabic_words_3_syllabes: false,
  }
}


interface GradesDialogProps {
  isOpen: boolean
  student: Student | undefined
  exit: () => void
}

export default function GradesDialog({
  isOpen,
  exit,
  student,
}: GradesDialogProps) {
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

    const [spellingGrades, setSpellingGrades] =
    useState<SpellingGrade>()
  const spellingSum =
    (spellingGrades &&
      +spellingGrades.phonetic_short_vowels +
        +spellingGrades.phonetic_consonant_blends +
        +spellingGrades.phonetic_consonant_digraphs +
        +spellingGrades.transitional_long_vowels +
        +spellingGrades.transitional_complex_vowels +
        +spellingGrades.fluent_inflectional_endings +
        +spellingGrades.fluent_multisyllabic_words_2_syllabes +
        +spellingGrades.advanced_multisyllabic_words_3_syllabes) ||
    0

    const [readingLevelGrades, setReadingLevelGrades] = useState<ReadingLevelGrade>();  
  useEffect(() => {
    if (!isOpen) return;
    const session_id = session ?? NaN;
    if (student?.id == null || isNaN(session_id)) {
      return navigate('/');
    }
    getInitalInformational(session_id, student.id).then((v) => {
      setInformationalGrades(v);
    });
    getInitalFictional(session_id, student.id).then((v) => {
      setFictionalGrades(v);
    });
    getInitialSpelling(session_id, student.id).then((v) => {
      setSpellingGrades(v);
    });
    getInitalReadingLevel(session_id, student.id).then((v) => {
      setReadingLevelGrades(v);
    });
  }, [isOpen, navigate]);
  
  

  return (
    <Dialog exit={exit} isOpen={isOpen}>
      <h1 className='text-xl font-extrabold dark:text-white'>
        {student?.first_name} {student?.last_name}
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
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-100'>
          <tr>
            <th className='px-2 py-3'></th>
            <th className='px-2 py-3'>short vowels</th>
            <th className='px-2 py-3'>consonant blends</th>
            <th className='px-2 py-3'>consonant digraphs</th>
            <th className='px-2 py-3'>long vowels</th>
            <th className='px-2 py-3'>complex vowels</th>
            <th className='px-2 py-3'>inflectional endings</th>
            <th className='px-2 py-3'>two syllabes</th>
            <th className='px-2 py-3'>three syllabes</th>
            <th className='px-2 py-3'>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700'>
            <th className='px-2 py-3'>Spelling</th>

            <td>
              <input
                checked={spellingGrades?.phonetic_short_vowels ?? false}
                onChange={({ target }) =>
                  setSpellingGrades(v => v && { ...v, phonetic_short_vowels: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={spellingGrades?.phonetic_consonant_blends ?? false}
                onChange={({ target }) =>
                  setSpellingGrades(v => v && { ...v, phonetic_consonant_blends: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={spellingGrades?.phonetic_consonant_digraphs ?? false}
                onChange={({ target }) =>
                  setSpellingGrades(v => v && { ...v, phonetic_consonant_digraphs: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={spellingGrades?.transitional_long_vowels ?? false}
                onChange={({ target }) =>
                  setSpellingGrades(v => v && { ...v, transitional_long_vowels: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={spellingGrades?.transitional_complex_vowels ?? false}
                onChange={({ target }) =>
                  setSpellingGrades(v => v && { ...v, transitional_complex_vowels: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={spellingGrades?.fluent_inflectional_endings ?? false}
                onChange={({ target }) =>
                  setSpellingGrades(v => v && { ...v, fluent_inflectional_endings: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={spellingGrades?.fluent_multisyllabic_words_2_syllabes ?? false}
                onChange={({ target }) =>
                  setSpellingGrades(v => v && { ...v, fluent_multisyllabic_words_2_syllabes: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>
              <input
                checked={spellingGrades?.advanced_multisyllabic_words_3_syllabes ?? false}
                onChange={({ target }) =>
                  setSpellingGrades(v => v && { ...v, advanced_multisyllabic_words_3_syllabes: target.checked })
                }
                type='checkbox'
                className='w-6 h-6 m-2 rounded-md text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500 dark:focus:emerald-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </td>
            <td>{spellingSum}</td>
          </tr>
          <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700'>
  <th className='px-2 py-3'>Reading</th>
  <td>
    <select
      id={`readingLevelDropdown`}
      value={readingLevelGrades?.reading_level || ''}
      onChange={(e) =>
        setReadingLevelGrades(reading_level => reading_level && { ...reading_level, reading_level: e.target.value })
      }
      className='p-2 border'
    >
      {readingLevels.map((level, index) => (
        <option key={index} value={level}>
          {level}
        </option>
      ))}
    </select>
  </td>
</tr>

        </tbody>

      </table>
      <button
        className='border-2 rounded p-2 hover:bg-gray-100 transition-colors text-xs text-gray-700 uppercase font-bold m-2'
        onClick={async () => {
          informationalGrades &&
            db.informational_grades.put(informationalGrades)
          fictionalGrades && db.fictional_grades.put(fictionalGrades)
          spellingGrades &&
            db.spelling_grades.put(spellingGrades)
          readingLevelGrades && db.reading_grades.put(readingLevelGrades)
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
