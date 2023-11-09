import { saveAs } from 'file-saver'
import JsZip from 'jszip'

import { db } from '../db'

async function getTableString(content: any[]) {
  const columns = Object.keys(content[0])
  const csvRows = [columns.join(',')]

  for (const row of content) {
    const rowArr = columns.map(col => row[col] || '')
    const rowStr = rowArr.join(',')
    csvRows.push(rowStr)
  }

  return csvRows.join('\n')
}

export default async function exportCsv(name?: string) {
  const zip = new JsZip()
  const folder = zip.folder('student_grades')
  if (!folder) return

  for (const table of db.tables) {
    const content = await table.toArray()
    const name = table.name
    if (content.length == 0) continue

    const tableStr = await getTableString(content)
    folder.file(`${name}.csv`, tableStr)
  }
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, name || 'student_grades.zip')
}
