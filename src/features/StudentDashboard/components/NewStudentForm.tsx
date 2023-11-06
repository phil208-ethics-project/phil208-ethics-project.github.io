import { useState } from 'react'

import { db } from '../../../db'

type Gender = 'male' | 'female' | 'nonbinary' | 'n/a'

export default function NewStudentForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState<Gender>('n/a')

  return (
    <div className='m-16'>
      <form
        onSubmit={e => {
          console.log(e.target)
          e.preventDefault()
          db.students.add({
            first_name: firstName,
            last_name: lastName,
            age,
            gender,
          })
        }}
      >
        <div className='grid gap-6 mb-6 md:grid-cols-2'>
          <div>
            <label
              htmlFor='first_name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              First name
            </label>
            <input
              type='text'
              id='first_name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='John'
              required
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
              onChange={e => setGender((e.target.value || 'n/a') as Gender)}
            >
              <option value='' disabled selected hidden>
                Choose...
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='nonbinary'>Non-Binary</option>
              <option value='n/a'>I'd prefer not to say</option>
            </select>
          </div>
        </div>
        <button
          className='border-2 border-neutral-400 p-2 hover:bg-neutral-100 transition-colors'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}