interface Props {
  isOpen: boolean
  exit: () => void
}

export default function InformationalGradesDialog({ isOpen, exit }: Props) {
  return (
    <div
      data-isopen={isOpen}
      className='absolute w-full h-full bg-opacity-70 bg-black top-0 right-0 p-28 data-[isopen=false]:hidden'
    >
      <div className='bg-white rounded'>
        <button onClick={exit}>Exit</button>
      </div>
    </div>
  )
}
