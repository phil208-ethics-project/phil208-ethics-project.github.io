import { useRef, useState } from 'react'

interface FileUploadProps {
  onUpload: (files: FileList) => void | Promise<void>
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const fileUploadElement = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)
  return (
    <div
      data-over={over}
      className='data-[over=true]:p-64 data-[over=true]:border-4 border-dotted inline-block'
      onDrop={e => {
        e.preventDefault()
        e.stopPropagation()
        setOver(false)
        onUpload(e.dataTransfer.files)
      }}
      onDragOver={e => {
        e.preventDefault()
        e.stopPropagation()
        setOver(true)
      }}
      onDragLeave={e => {
        e.preventDefault()
        e.stopPropagation()
        setOver(false)
      }}
    >
      <input
        ref={fileUploadElement}
        className='hidden'
        type='file'
        accept='.csv'
        multiple
        onChange={e => {
          const target = e.target as HTMLInputElement & { files: FileList }
          onUpload(target.files)
        }}
      />
      <button
        className='border p-2 rounded hover:bg-gray-100 transition-all'
        onClick={() => fileUploadElement.current?.click()}
      >
        Upload File Here
      </button>
    </div>
  )
}
