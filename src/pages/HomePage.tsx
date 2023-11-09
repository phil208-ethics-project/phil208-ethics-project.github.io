import FileUpload from '../features/SaveData/components/FileUpload'
import readFile from '../features/SaveData/lib/readFile'

function HomePage() {
  return (
    <>
      <h1 className='text-2xl'>Phil 208 Ethics Project</h1>
      <p>Here is some text!!!</p>
      <FileUpload
        onUpload={async files => {
          const fileStr = await readFile(files[0])
          console.log(fileStr)
        }}
      />
    </>
  )
}

export default HomePage
