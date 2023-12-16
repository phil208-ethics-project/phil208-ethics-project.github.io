import { db } from '@db'

import { saveAs } from 'file-saver'
import JsZip from 'jszip'
import { unparse } from 'papaparse'

export default async function exportCsv(name?: string) {
  const zip = new JsZip()
  const folder = zip.folder('student_grades')
  if (!folder) return

  for (const table of db.tables) {
    const content = await table.toArray()
    const name = table.name
    if (content.length == 0) continue

    const tableStr = unparse(content)
    folder.file(`${name}.csv`, tableStr)
  }
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, name || 'student_grades.zip')
}
