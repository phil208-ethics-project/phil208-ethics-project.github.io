import useDelayedValue from '@hooks/useDelayedValue'
import useOnClickOutside from '@hooks/useOnClickOutside'

interface Props {
  isOpen: boolean
  exit: () => void
}

export default function InformationalGradesDialog({ isOpen, exit }: Props) {
  const open = useDelayedValue(isOpen)
  const ref = useOnClickOutside<HTMLDivElement>(
    () => open && exit(),
    [isOpen, open],
  )
  return (
    <div
      data-isopen={isOpen}
      className='absolute w-full h-full bg-opacity-70 bg-black top-0 right-0 p-28 data-[isopen=false]:hidden'
    >
      <div ref={ref} className='bg-white rounded'>
        <button onClick={exit}>Exit</button>
      </div>
    </div>
  )
}
