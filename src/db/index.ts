import Dexie, { Table } from 'dexie'
import { z } from 'zod'

export interface Session {
  id?: number
  date: number
  name?: string
}

export const boolSchema = z
  .string()
  .transform<boolean>((value, ctx) => {
    const char = value.toLowerCase().charAt(0)
    switch (char) {
      case 't':
        return true
      case 'f':
        return false
      default:
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: z.ZodParsedType.boolean,
          received: z.ZodParsedType.string,
          message: `Expected "true" or "false", recieved ${value}`,
        })
        return false
    }
  })
  .or(z.boolean())

export const studentSchema = z.object({
  id: z.coerce.number().optional(),
  first_name: z.string(),
  last_name: z.string(),
  age: z.coerce.number(),
  gender: z.enum(['male', 'female', 'nonbinary', 'other']),
})

export type Student = z.infer<typeof studentSchema>

export const fictionalGradeSchema = z.object({
  session_id: z.coerce.number(),
  student_id: z.coerce.number(),
  v: boolSchema,
  kd: boolSchema,
  ca: boolSchema,
  i: boolSchema,
  e: boolSchema,
  l: boolSchema,
  go: boolSchema,
  mi: boolSchema,
})

export type FictionalGrade = z.infer<typeof fictionalGradeSchema>

export const informationalGradeSchema = z.object({
  session_id: z.coerce.number(),
  student_id: z.coerce.number(),
  v: boolSchema,
  kd: boolSchema,
  ar: boolSchema,
  i: boolSchema,
  e: boolSchema,
  l: boolSchema,
  tf: boolSchema,
  mi: boolSchema,
})

export type InformationalGrade = z.infer<typeof informationalGradeSchema>

export const spellingGradeSchema = z.object({
  session_id: z.coerce.number(),
  student_id: z.coerce.number(),
  phonetic_short_vowels: z.string(),
  phonetic_consonant_blends: z.string(),
  phonetic_consonant_digraphs: z.string(),
  transitional_long_vowels: z.string(),
  transitional_complex_vowels: z.string(),
  fluent_inflectional_endings: z.string(),
  fluent_multisyllabic_words_2_syllabes: z.string(),
  advanced_multisyllabic_words_3_syllabes: z.string(),
})

export type SpellingGrade = z.infer<typeof spellingGradeSchema>

export const readingLevelSchema = z.object({
  session_id: z.coerce.number(),
  student_id: z.coerce.number(),
  reading_level: z.coerce.number(),
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
