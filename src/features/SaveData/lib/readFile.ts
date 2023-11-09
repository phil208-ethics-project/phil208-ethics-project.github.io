export default async function readFile(file: File) {
  return new Promise<string | undefined>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')

    reader.onload = () =>
      resolve((reader.result || undefined) as string | undefined)
    reader.onerror = reject
  })
}
