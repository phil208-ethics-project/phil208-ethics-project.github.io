import Dexie, { Table } from 'dexie'
import { z } from 'zod'

// export interface Session {
//   id?: number
//   date: number
//   name?: string
// }

export const sessionSchema = z.object({
  id: z.number().preprocess(Number, z.number()).optional(),
  date: z.number().preprocess(Number, z.number()),
  name: z.string().optional()
})

export type Session = z.infer<typeof sessionSchema>

// export interface Student {
//   id?: number
//   first_name: string
//   last_name: string
//   gender: 'male' | 'female' | 'nonbinary' | 'other'
//   age: number
// }

export const studentSchema = z.object({
  id: z.number().preprocess(Number, z.number()).optional(),
  first_name: z.string(),
  last_name: z.string(),
  age: z.number().preprocess(Number, z.number()),
  gender: z.enum(['male', 'female', 'nonbinary', 'other']),
})

export type Student = z.infer<typeof studentSchema>

// export interface FictionalGrade {
//   session_id: number
//   student_id: number
//   v: boolean
//   kd: boolean
//   ca: boolean
//   i: boolean
//   e: boolean
//   l: boolean
//   go: boolean
//   mi: boolean
// }

export const fictionalGradeSchema = z.object({
  session_id: z.number().preprocess(Number, z.number()),
  student_id: z.number().preprocess(Number, z.number()),
  v: z.boolean().preprocess(Boolean, z.boolean()),
  kd: z.boolean().preprocess(Boolean, z.boolean()),
  ca: z.boolean().preprocess(Boolean, z.boolean()),
  i: z.boolean().preprocess(Boolean, z.boolean()),
  e: z.boolean().preprocess(Boolean, z.boolean()),
  l: z.boolean().preprocess(Boolean, z.boolean()),
  go: z.boolean().preprocess(Boolean, z.boolean()),
  mi: z.boolean().preprocess(Boolean, z.boolean())
})

export type FictionalGrade = z.infer<typeof fictionalGradeSchema>

// export interface InformationalGrade {
//   session_id: number
//   student_id: number
//   v: boolean
//   kd: boolean
//   ar: boolean
//   i: boolean
//   e: boolean
//   l: boolean
//   tf: boolean
//   mi: boolean
// }

export const informationalGradeSchema = z.object({
  session_id: z.number().preprocess(Number, z.number()),
  student_id: z.number().preprocess(Number, z.number()),
  v: z.boolean().preprocess(Boolean, z.boolean()),
  kd: z.boolean().preprocess(Boolean, z.boolean()),
  ar: z.boolean().preprocess(Boolean, z.boolean()),
  i: z.boolean().preprocess(Boolean, z.boolean()),
  e: z.boolean().preprocess(Boolean, z.boolean()),
  l: z.boolean().preprocess(Boolean, z.boolean()),
  tf: z.boolean().preprocess(Boolean, z.boolean()),
  mi: z.boolean().preprocess(Boolean, z.boolean())
})

export type InformationalGrade = z.infer<typeof informationalGradeSchema>

// export interface SpellingGrade {
//   session_id: number
//   student_id: number
//   phonetic_short_vowels: string
//   phonetic_consonant_blends: string
//   phonetic_consonant_digraphs: string
//   transitional_long_vowels: string
//   transitional_complex_vowels: string
//   fluent_inflectional_endings: string
//   fluent_multisyllabic_words_2_syllabes: string
//   advanced_multisyllabic_words_3_syllabes: string
// }

export const spellingGradeSchema = z.object({
  session_id: z.number().preprocess(Number, z.number()),
  student_id: z.number().preprocess(Number, z.number()),
  phonetic_short_vowels: z.string(),
  phonetic_consonant_blends: z.string(),
  phonetic_consonant_digraphs: z.string(),
  transitional_long_vowels: z.string(),
  transitional_complex_vowels: z.string(),
  fluent_inflectional_endings: z.string(),
  fluent_multisyllabic_words_2_syllabes: z.string(),
  advanced_multisyllabic_words_3_syllabes: z.string()
})

export type SpellingGrade = z.infer<typeof spellingGradeSchema>

// export interface ReadingLevelGrade {
//   session_id: number
//   student_id: number
//   reading_level: number
// }

export const readingLevelSchema = z.object({
  session_id: z.number().preprocess(Number, z.number()),
  student_id: z.number().preprocess(Number, z.number()),
  reading_level: z.number().preprocess(Number, z.number())
})

export type ReadingLevelGrade = z.infer<typeof readingLevelSchema>

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
