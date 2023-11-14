// db.ts
import Dexie, { Table } from 'dexie'

export interface Student {
  id?: number
  first_name: string
  last_name: string
  gender: 'male' | 'female' | 'nonbinary' | 'other'
  age: number
}

export interface FictionalGrade {
  id?: number
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
  id?: number
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

export interface SpellingGrade {
  id?: number
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
  student_id: number
  reading_level: number
}

export class StudentGradesDB extends Dexie {
  students!: Table<Student, number>
  fictional_grades!: Table<FictionalGrade, number>
  informational_grades!: Table<InformationalGrade, number>
  spelling_grades!: Table<SpellingGrade, number>
  reading_grades!: Table<ReadingLevelGrade, number>

  constructor() {
    super('StudentGrades')
    this.version(1).stores({
      students: '++id,[first_name+last_name]',
      fictional_grades: '++id, student_id',
      informational_grades: '++id, student_id',
      spelling_grades: '++id, student_id',
      reading_grades: '++id, student_id',
    })
  }

  async addStudent(first_name: string, last_name: string, gender: Student['gender'], age: number) {
    const newStudent: Student = { first_name, last_name, gender, age };
    const insertedStudent = await db.students.add(newStudent);
    return insertedStudent;
  }

  // Add function for FictionalGrade
    async  addFictionalGrade(
    student_id: number,
    v: boolean,
    kd: boolean,
    ca: boolean,
    i: boolean,
    e: boolean,
    l: boolean,
    go: boolean,
    mi: boolean
  ): Promise<number | undefined> {
    try {
      const newFictionalGrade: FictionalGrade = { student_id, v, kd, ca, i, e, l, go, mi };
      const insertedFictionalGradeId = await db.fictional_grades.add(newFictionalGrade);
      const fictional_grade = await db.fictional_grades.get(insertedFictionalGradeId);
      return fictional_grade?.student_id;
    } catch (error) {
      console.error('Error adding fictional grade:', error);
      return undefined;
    }
  }
  
  // Add function for InformationalGrade
  async addInformationalGrade(
    student_id: number,
    v: boolean,
    kd: boolean,
    ca: boolean,
    i: boolean,
    e: boolean,
    l: boolean,
    go: boolean,
    mi: boolean
  ): Promise<number | undefined> {
    try {
      const newInformationalGrade: InformationalGrade = { student_id, v, kd, ca, i, e, l, go, mi };
      const insertedInformationalGradeId = await db.informational_grades.add(newInformationalGrade);
      const fictional_grade = await db.informational_grades.get(insertedInformationalGradeId);
      return fictional_grade?.student_id; 
    } catch (error) {
      console.error('Error adding informational grade:', error);
      return undefined;
    }
  }
  
  // Add function for SpellingGrade
  async addSpellingGrade(
    student_id: number,
    phonetic_short_vowels: string,
    phonetic_consonant_blends: string,
    phonetic_consonant_digraphs: string,
    transitional_long_vowels: string,
    transitional_complex_vowels: string,
    fluent_inflectional_endings: string,
    fluent_multisyllabic_words_2_syllabes: string,
    advanced_multisyllabic_words_3_syllabes: string
  ): Promise<number | undefined> {
    try {
      const newSpellingGrade: SpellingGrade = {
        student_id,
        phonetic_short_vowels,
        phonetic_consonant_blends,
        phonetic_consonant_digraphs,
        transitional_long_vowels,
        transitional_complex_vowels,
        fluent_inflectional_endings,
        fluent_multisyllabic_words_2_syllabes,
        advanced_multisyllabic_words_3_syllabes,
      };
      const insertedSpellingGradeId = await db.spelling_grades.add(newSpellingGrade);
      const fictional_grade = await db.spelling_grades.get(insertedSpellingGradeId);
      return fictional_grade?.student_id;
    } catch (error) {
      console.error('Error adding spelling grade:', error);
      return undefined;
    }
  }
  
  // Add function for ReadingLevelGrade
  async addReadingGrade(student_id: number, reading_level: number): Promise<number | undefined> {
    try {
      const newReadingGrade: ReadingLevelGrade = { student_id, reading_level };
      await db.reading_grades.add(newReadingGrade);
      // Reading grades don't have a specific ID to return
      return 0;
    } catch (error) {
      console.error('Error adding reading grade:', error);
      return undefined;
    }
}

async updateFictionalGrade(
    id: number,
    student_id: number,
    v: boolean,
    kd: boolean,
    ca: boolean,
    i: boolean,
    e: boolean,
    l: boolean,
    go: boolean,
    mi: boolean
  ): Promise<{ success: boolean; studentId?: number }> {
    try {
  
      // Update the fictional grade data
      await db.fictional_grades.update(id, { student_id, v, kd, ca, i, e, l, go, mi });
  
      const updatedFictionalGrade = await db.fictional_grades.get(id);
      return { success: true, studentId: updatedFictionalGrade?.student_id };
    } catch (error) {
      console.error('Error updating fictional grade:', error);
      return { success: false, studentId: undefined };
    }
  }

  async updateInformationalGrade(
    id: number,
    student_id: number,
    v: boolean,
    kd: boolean,
    ca: boolean,
    i: boolean,
    e: boolean,
    l: boolean,
    go: boolean,
    mi: boolean
  ): Promise<{ success: boolean; studentId?: number }> {
    try {
      // Update the informational grade data
      await db.informational_grades.update(id, { student_id, v, kd, ca, i, e, l, go, mi });
  
      const updatedInformationalGrade = await db.informational_grades.get(id);
      return { success: true, studentId: updatedInformationalGrade?.student_id };
    } catch (error) {
      console.error('Error updating informational grade:', error);
      return { success: false, studentId: undefined };
    }
  }

  async updateSpellingGrade(
    id: number,
    student_id: number,
    phonetic_short_vowels: string,
    phonetic_consonant_blends: string,
    phonetic_consonant_digraphs: string,
    transitional_long_vowels: string,
    transitional_complex_vowels: string,
    fluent_inflectional_endings: string,
    fluent_multisyllabic_words_2_syllabes: string,
    advanced_multisyllabic_words_3_syllabes: string
  ): Promise<{ success: boolean; studentId?: number }> {
    try {
      // Update the spelling grade data
      await db.spelling_grades.update(id, {
        student_id,
        phonetic_short_vowels,
        phonetic_consonant_blends,
        phonetic_consonant_digraphs,
        transitional_long_vowels,
        transitional_complex_vowels,
        fluent_inflectional_endings,
        fluent_multisyllabic_words_2_syllabes,
        advanced_multisyllabic_words_3_syllabes,
      });
  
      const updatedSpellingGrade = await db.spelling_grades.get(id);
      return { success: true, studentId: updatedSpellingGrade?.student_id };
    } catch (error) {
      console.error('Error updating spelling grade:', error);
      return { success: false, studentId: undefined };
    }
  }

  async updateReadingLevelGrade(
    student_id: number,
    reading_level: number
  ): Promise<{ success: boolean; studentId?: number }> {
    try {
      // Update the reading grade data
      await db.reading_grades.where('student_id').equals(student_id).modify({ reading_level });
  
      const updatedReadingGrade = await db.reading_grades.where('student_id').equals(student_id).first();
      return { success: true, studentId: updatedReadingGrade?.student_id };
    } catch (error) {
      console.error('Error updating reading level grade:', error);
      return { success: false, studentId: undefined };
    }
  }
  
  async deleteStudent(student_id: number): Promise<{ success: boolean }> {
    try {
      // Delete the student record
      await db.students.where({ id: student_id }).delete();
    
      return { success: true };
    } catch (error) {
      console.error('Error deleting student:', error);
      return { success: false };
    }
  }

  async deleteFictionalGrade(student_id: number): Promise<{ success: boolean }> {
    try {
      // Delete the fictional grade record
      await db.fictional_grades.where({ student_id: student_id }).delete();
    
      return { success: true };
    } catch (error) {
      console.error('Error deleting fictional grade:', error);
      return { success: false };
    }
  }

  async deleteInformationalGrade(student_id: number): Promise<{ success: boolean }> {
    try {
      // Delete the informational grade record
      await db.informational_grades.where({ student_id: student_id }).delete();
    
      return { success: true };
    } catch (error) {
      console.error('Error deleting informational grade:', error);
      return { success: false };
    }
  }

  async deleteSpellingGrade(student_id: number): Promise<{ success: boolean }> {
    try {
      // Delete the spelling grade record
      await db.spelling_grades.where({ student_id: student_id }).delete();
    
      return { success: true };
    } catch (error) {
      console.error('Error deleting spelling grade:', error);
      return { success: false };
    }
  }
  
  async deleteReadingLevelGrade(student_id: number): Promise<{ success: boolean }> {
    try {
      // Delete the reading grade record
      await db.reading_grades.where({ student_id: student_id }).delete();
    
      return { success: true };
    } catch (error) {
      console.error('Error deleting reading level grade:', error);
      return { success: false };
    }
  }
  

  async getStudentById(studentId: number): Promise<Student | undefined> {
    return this.students.get(studentId);
  }

  async getFictionalGradeByStudentId(studentId: number): Promise<FictionalGrade | undefined> {
    return this.fictional_grades.where('student_id').equals(studentId).first();
  }

  async getInformationalGradeByStudentId(studentId: number): Promise<InformationalGrade | undefined> {
    return this.informational_grades.where('student_id').equals(studentId).first();
  }

  async getSpellingGradeByStudentId(studentId: number): Promise<SpellingGrade | undefined> {
    return this.spelling_grades.where('student_id').equals(studentId).first();
  }

  async getReadingLevelGradeByStudentId(studentId: number): Promise<ReadingLevelGrade | undefined> {
    return this.reading_grades.where('student_id').equals(studentId).first();
  }
}

export const db = new StudentGradesDB()
