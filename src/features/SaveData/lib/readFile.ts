import JSZip from 'jszip'

export default async function readFile(file: File) {
  return new Promise<string | undefined>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')

    reader.onload = () =>
      resolve((reader.result || undefined) as string | undefined)
    reader.onerror = reject
  })
}

export async function readZip(file: File) {
  const zip = new JSZip()
  const zippedDir = await zip.loadAsync(file)

  const entries = Object.entries(zippedDir.files)
    .filter(([filename, _]) => filename.endsWith('.csv'))
    .map(async ([filename, zipFile]) =>
      zipFile.async('string').then(text => [filename, text]),
    )

  return Object.fromEntries(await Promise.all(entries))
}
