import useDelayedValue from '@hooks/useDelayedValue'
import { useEscPressed } from '@hooks/useKeyPressed'
import useOnClickOutside from '@hooks/useOnClickOutside'

import { useEffect, useRef } from 'react'

interface DialogProps {
  isOpen: boolean
  exit: () => void
  children?: React.ReactNode
}

export default function Dialog({ isOpen, exit, children }: DialogProps) {
  const open = useDelayedValue(isOpen)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    isOpen && ref.current?.showModal()
    isOpen || ref.current?.close()
  }, [isOpen])

  useEscPressed(() => exit(), [exit])
  const outsideRef = useOnClickOutside<HTMLDivElement>(
    () => open && exit(),
    [open],
  )
  return (
    <dialog className='shadow-2xl border-none bg-transparent' ref={ref}>
      <div
        ref={outsideRef}
        className='bg-white rounded p-6 border-gray-200 border-4 h-fit overflow-x-auto'
      >
        {children}
      </div>
    </dialog>
  )
}
