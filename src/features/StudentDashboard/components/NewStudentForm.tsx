import { useState } from 'react'

import { db } from '../../../db'

type Gender = 'male' | 'female' | 'nonbinary' | 'other'

export default function NewStudentForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState<number>(NaN)
  const [gender, setGender] = useState<Gender | ''>('')

  return (
    <div className='mx-8 my-8 flex-grow max-w-2xl'>
      <form
        onSubmit={e => {
          e.preventDefault()
          db.students.add({
            first_name: firstName,
            last_name: lastName,
            age: age,
            gender: gender || 'other',
          })
          setFirstName('')
          setLastName('')
          setAge(NaN)
          setGender('')
        }}
      >
        <div className='grid gap-6 mb-6 lg:grid-cols-2'>
          <div>
            <label
              htmlFor='first_name'
              className='block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white'
            >
              First name
            </label>
            <input
              type='text'
              id='first_name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='John'
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='last_name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Last name
            </label>
            <input
              type='text'
              id='last_name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Doe'
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='age'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Age
            </label>
            <input
              type='number'
              id='age'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='10'
              required
              value={age.toString()}
              onChange={e => setAge(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor='gender'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Gender
            </label>
            <select
              required
              id='gender'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 invalid:text-gray-400'
              value={gender}
              onChange={e => setGender(e.target.value as Gender)}
            >
              <option value='' disabled hidden>
                Choose...
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='nonbinary'>Non-Binary</option>
              <option value='other'>I'd prefer not to say</option>
            </select>
          </div>
        </div>
        <button
          className='border-2 rounded p-2 hover:bg-gray-100 transition-colors text-xs text-gray-700 uppercase font-bold'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
