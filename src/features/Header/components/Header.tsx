import Navbar from './Navbar'

import exportCsv from '@features/SaveData/lib/exportCsv'

import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-slate-600 p-3 flex flex-row items-center'>
      <div className='inline'>
        <Link to='' className='text-4xl uppercase font-bold'>
          Phil Project
        </Link>
      </div>
      <Navbar />
      <button
        className='border-2 bg-white rounded p-2 hover:bg-gray-100 transition-colors text-xs text-gray-700 uppercase font-bold'
        onClick={() => exportCsv()}
      >
        Export
      </button>
    </div>
  )
}
