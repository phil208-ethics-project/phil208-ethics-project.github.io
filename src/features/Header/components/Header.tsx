import Navbar from './Navbar'

import exportCsv from '@features/SaveData/lib/exportCsv'
import useOnClickOutside from '@hooks/useOnClickOutside'
import useOnNavigate from '@hooks/useOnNavigate'

import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link } from 'react-router-dom'

interface HamburgerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Hamburger({ setOpen }: HamburgerProps) {
  return (
    <button
      className='sm:hidden text-4xl transition-all hover:text-gray-800'
      onClick={() => setOpen(v => !v)}
    >
      <RxHamburgerMenu />
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  useOnNavigate(() => setOpen(false))
  const dropdownRef = useOnClickOutside<HTMLDivElement>(() => setOpen(false))

  return (
    <div ref={dropdownRef}>
      <div className='bg-slate-600 p-3 flex flex-row items-center relative z-30 justify-between'>
        <Link
          to='/'
          className='text-4xl uppercase font-bold inline grow-0 whitespace-nowrap'
        >
          <img src='favicon.ico' className='w-16' />
        </Link>
        <Hamburger setOpen={setOpen} />
        <div className='hidden sm:block'>
          <Navbar />
        </div>
        <button
          className='border-2 bg-white rounded p-2 hover:bg-gray-100 transition-colors text-xs text-gray-700 uppercase font-bold hidden sm:block'
          onClick={() => exportCsv()}
        >
          Export
        </button>
      </div>

      <div
        data-open={open}
        className='sm:hidden flex flex-col top-16 left-0 absolute z-20 w-full transition-transform  data-[open=false]:pointer-events-none data-[open=false]:invisible data-[open=false]:-translate-y-[100%] '
      >
        <div className='gap-4 p-4 bg-white shadow-lg'>
          <Navbar />
        </div>
      </div>
    </div>
  )
}
