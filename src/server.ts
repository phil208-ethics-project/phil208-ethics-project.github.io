// server.ts
import express from 'express';
import bodyParser from 'body-parser';
import { db, Student, FictionalGrade, InformationalGrade, SpellingGrade, ReadingLevelGrade } from './db';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Define API routes for inserting data into Dexie tables. Always return the student id back to front end so we
// can continue using that for querying later.

app.post('/api/add-student', async (req, res) => {
    try {
      const { first_name, last_name, gender, age } = req.body;
      const newStudent: Student = { first_name, last_name, gender, age };
      const insertedStudent = await db.students.add(newStudent);
      res.json({ success: true,  studentId: insertedStudent });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

  app.post('/api/add-fictional-grade', async (req, res) => {
    try {
      const { student_id, v, kd, ca, i, e, l, go, mi } = req.body;
      const newFictionalGrade: FictionalGrade = { student_id, v, kd, ca, i, e, l, go, mi };
      const insertedStudentId = await db.fictional_grades.add(newFictionalGrade);
      const fictional_grade = await db.fictional_grades.get(insertedStudentId);
      res.json({ success: true, studentId: fictional_grade?.student_id });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/add-informational-grade', async (req, res) => {
    try {
      const { student_id, v, kd, ca, i, e, l, go, mi } = req.body;
      const newInformationalGrade: InformationalGrade = { student_id, v, kd, ca, i, e, l, go, mi };
      const insertedStudentId = await db.informational_grades.add(newInformationalGrade);
      const informational_grade = await db.informational_grades.get(insertedStudentId);
      res.json({ success: true, studentId: informational_grade?.student_id });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/add-spelling-grade', async (req, res) => {
    try {
      const { student_id, phonetic_short_vowels, phonetic_consonant_blends, phonetic_consonant_digraphs, transitional_long_vowels, transitional_complex_vowels, fluent_inflectional_endings, fluent_multisyllabic_words_2_syllabes, advanced_multisyllabic_words_3_syllabes } = req.body;
      const newSpellingGrade: SpellingGrade = { student_id, phonetic_short_vowels, phonetic_consonant_blends, phonetic_consonant_digraphs, transitional_long_vowels, transitional_complex_vowels, fluent_inflectional_endings, fluent_multisyllabic_words_2_syllabes, advanced_multisyllabic_words_3_syllabes };
      const insertedStudentId = await db.spelling_grades.add(newSpellingGrade);
      const spelling_grade = await db.spelling_grades.get(insertedStudentId);
      res.json({ success: true, studentId: spelling_grade?.student_id });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/add-reading-grade', async (req, res) => {
    try {
      const { student_id, reading_level } = req.body;
      const newReadingGrade: ReadingLevelGrade = { student_id, reading_level };
      await db.reading_grades.add(newReadingGrade);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // The idea here is to use the student id that we were returning earlier to query all the elements for that
  // student id. Needs work to account for multiple student id entries but the basis is this-
  // Gonna be used for updating later.

  app.post('/api/get-student', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
      const student = await db.getStudentById(studentId);
      res.json({ success: true, data: student });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/get-fictional-grade', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
      const fictionalGrade = await db.getFictionalGradeByStudentId(studentId);
      res.json({ success: true, data: fictionalGrade });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/get-informational-grade', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
      const informationalGrade = await db.getInformationalGradeByStudentId(studentId);
      res.json({ success: true, data: informationalGrade });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/get-spelling-grade', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
      const spellingGrade = await db.getSpellingGradeByStudentId(studentId);
      res.json({ success: true, data: spellingGrade });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/get-reading-grade', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
      const readingGrade = await db.getReadingLevelGradeByStudentId(studentId);
      res.json({ success: true, data: readingGrade });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });


  // Update works on this idea- You query all the values for a student id together. Update whichever one you want
  // and return that alongside all the original stuff. Not the best for space or runtime, but allows us to 
  // use one size fits all approach to updating. We can update one or more or all elements with just this logic

  app.post('/api/update-student', async (req, res) => {
    try {
      const { id, first_name, last_name, gender, age } = req.body;
      const studentId = parseInt(id, 10);
      
      // Update the student data
      await db.students.update(studentId, {first_name, last_name, gender, age});
      
      const fictional_grade = await db.students.get(studentId);
      res.json({ success: true, studentId: fictional_grade?.id })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/update-fictional-grade', async (req, res) => {
    try {
      const { id, student_id, v, kd, ca, i, e, l, go, mi } = req.body;
      const gradeId = parseInt(id, 10);
  
      // Update the fictional grade data
      await db.fictional_grades.update(gradeId, {student_id, v, kd, ca, i, e, l, go, mi});
  
      const fictional_grade = await db.fictional_grades.get(gradeId);
      res.json({ success: true, studentId: fictional_grade?.student_id })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/update-informational-grade', async (req, res) => {
    try {
      const { id, student_id, v, kd, ca, i, e, l, go, mi } = req.body;
      const gradeId = parseInt(id, 10);
  
      // Update the informational grade data
      await db.informational_grades.update(gradeId, {student_id, v, kd, ca, i, e, l, go, mi });
  
      const fictional_grade = await db.informational_grades.get(gradeId);
      res.json({ success: true, studentId: fictional_grade?.student_id })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/update-spelling-grade', async (req, res) => {
    try {
      const { id, student_id, phonetic_short_vowels, phonetic_consonant_blends, phonetic_consonant_digraphs, transitional_long_vowels, transitional_complex_vowels, fluent_inflectional_endings, fluent_multisyllabic_words_2_syllabes, advanced_multisyllabic_words_3_syllabes } = req.body;
      const gradeId = parseInt(id, 10);
  
      // Update the spelling grade data
      await db.spelling_grades.update(gradeId, {student_id, phonetic_short_vowels, phonetic_consonant_blends, phonetic_consonant_digraphs, transitional_long_vowels, transitional_complex_vowels, fluent_inflectional_endings, fluent_multisyllabic_words_2_syllabes, advanced_multisyllabic_words_3_syllabes});
  
      const fictional_grade = await db.spelling_grades.get(gradeId);
      res.json({ success: true, studentId: fictional_grade?.student_id })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/update-reading-grade', async (req, res) => {
    try {
      const { student_id, reading_level } = req.body;
      const gradeId = parseInt(student_id, 10);
  
      // Update the reading grade data
      await db.reading_grades.update(gradeId, {reading_level});
  
      const fictional_grade = await db.fictional_grades.get(gradeId);
      res.json({ success: true, studentId: fictional_grade?.student_id })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Delete needs more work as currently just deleting all record values for student id instead of individual
  // element for entry

  app.post('/api/delete-student', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
  
      // Delete the student record
      await db.students.where({ id: studentId }).delete();
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/delete-fictional-grade', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
  
      // Delete the fictional grade record
      await db.fictional_grades.where({ student_id: studentId }).delete();
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/delete-informational-grade', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
  
      // Delete the informational grade record
      await db.informational_grades.where({ student_id: studentId }).delete();
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/delete-spelling-grade', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
  
      // Delete the spelling grade record
      await db.spelling_grades.where({ student_id: studentId }).delete();
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.post('/api/delete-reading-grade', async (req, res) => {
    try {
      const { student_id } = req.body;
      const studentId = parseInt(student_id, 10);
  
      // Delete the reading grade record
      await db.reading_grades.where({ student_id: studentId }).delete();
  
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
