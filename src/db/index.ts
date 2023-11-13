import Dexie, { Table } from 'dexie'

export interface Session {
  id?: number
  date: number
  name?: string
}

export interface Student {
  id?: number
  first_name: string
  last_name: string
  gender: 'male' | 'female' | 'nonbinary' | 'other'
  age: number
}

export interface FictionalGrade {
  session_id: number
  student_id: number
  v: boolean
  kd: boolean
  ca: boolean
  i: boolean
  e: boolean
  l: boolean
  go: boolean
  mi: boolean
}

export interface InformationalGrade {
  session_id: number
  student_id: number
  v: boolean
  kd: boolean
  ar: boolean
  i: boolean
  e: boolean
  l: boolean
  tf: boolean
  mi: boolean
}

export interface SpellingGrade {
  session_id: number
  student_id: number
  phonetic_short_vowels: string
  phonetic_consonant_blends: string
  phonetic_consonant_digraphs: string
  transitional_long_vowels: string
  transitional_complex_vowels: string
  fluent_inflectional_endings: string
  fluent_multisyllabic_words_2_syllabes: string
  advanced_multisyllabic_words_3_syllabes: string
}

export interface ReadingLevelGrade {
  session_id: number
  student_id: number
  reading_level: number
}

export class StudentGradesDB extends Dexie {
  sessions!: Table<Session, number>
  students!: Table<Student, number>
  fictional_grades!: Table<FictionalGrade, [number, number]>
  informational_grades!: Table<InformationalGrade, [number, number]>
  spelling_grades!: Table<SpellingGrade, [number, number]>
  reading_grades!: Table<ReadingLevelGrade, [number, number]>

  constructor() {
    super('StudentGrades')
    this.version(1).stores({
      sessions: '++id,date,name',
      students: '++id,[first_name+last_name]',
      fictional_grades: '[session_id+student_id]',
      informational_grades: '[session_id+student_id]',
      spelling_grades: '[session_id+student_id]',
      reading_grades: '[session_id+student_id]',
    })
  }
}

export const db = new StudentGradesDB()
