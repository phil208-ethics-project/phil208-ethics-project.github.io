interface NavbarProps {
  children?: React.ReactElement | React.ReactElement[]
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <div className='flex-grow flex justify-around child:text-black child:font-semibold child:uppercase child:border-b-2 child:border-transparent child:hover:border-black child:transition-all child:leading-5'>
      {children}
    </div>
  )
}
