import useDelayedValue from '@hooks/useDelayedValue'
import { useEscPressed } from '@hooks/useKeyPressed'
import useOnClickOutside from '@hooks/useOnClickOutside'

interface DialogProps {
  isOpen: boolean
  exit: () => void
  children?: React.ReactNode
}

export default function Dialog({ isOpen, exit, children }: DialogProps) {
  const open = useDelayedValue(isOpen)
  useEscPressed(() => exit(), [exit])
  const ref = useOnClickOutside<HTMLDivElement>(
    () => open && exit(),
    [isOpen, open],
  )
  return (
    <div
      data-isopen={isOpen}
      className='absolute w-full h-full bg-opacity-70 z-50 bg-black top-0 right-0 data-[isopen=false]:hidden flex justify-center'
    >
      <div
        ref={ref}
        className='bg-white rounded md:mx-28 my-28 p-6 shadow-2xl border-gray-200 border-4 h-fit'
      >
        {children}
        <button
          className='border-2 rounded p-2 hover:bg-gray-100 transition-colors text-xs text-gray-700 uppercase font-bold'
          onClick={exit}
        >
          Exit
        </button>
      </div>
    </div>
  )
}
