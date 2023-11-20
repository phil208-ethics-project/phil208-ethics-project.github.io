// Import necessary modules and components
import React from 'react';
import { db, Student, FictionalGrade, InformationalGrade, SpellingGrade, ReadingLevelGrade } from '@db';
import { useLiveQuery } from 'dexie-react-hooks';

// Functional component to display student data in a table
function StudentTablePage() {
  // Retrieve the student data using useLiveQuery
  const students = useLiveQuery(() => db.students.toArray());
  const fictionalGrades = useLiveQuery(() => db.fictional_grades.toArray());
  const informationalGrades = useLiveQuery(() => db.informational_grades.toArray());
  const spellingGrades = useLiveQuery(() => db.spelling_grades.toArray());
  const readingLevelGrades = useLiveQuery(() => db.reading_grades.toArray());

  // Combine student data with corresponding grades
  // Combine student data with corresponding grades
  // Combine student data with corresponding grades
const studentsWithGrades = students?.map(student => {
  const studentFictionalGrade = fictionalGrades?.find(grade => grade.student_id === student.id);
  const studentInformationalGrade = informationalGrades?.find(grade => grade.student_id === student.id);
  const studentSpellingGrade = spellingGrades?.find(grade => grade.student_id === student.id);
  const studentReadingLevelGrade = readingLevelGrades?.find(grade => grade.student_id === student.id);

  // Helper function to count true values in a grade
  const countTrueValues = (grade?: FictionalGrade | InformationalGrade | SpellingGrade | ReadingLevelGrade) =>
    grade ? Object.values(grade).filter(value => value === true).length : 0;

  return {
    ...student,
    fictional_grade: studentFictionalGrade,
    informational_grade: studentInformationalGrade,
    spelling_grade: studentSpellingGrade,
    reading_grade_level: studentReadingLevelGrade?.reading_level,
    // Add count of true values for each grade
    fictional_grade_count: countTrueValues(studentFictionalGrade),
    informational_grade_count: countTrueValues(studentInformationalGrade),
    spelling_grade_count: countTrueValues(studentSpellingGrade),
    reading_grade_level_count: countTrueValues(studentReadingLevelGrade),
  };
});



return (
  <div className='items-center min-h-screen overflow-x-hidden'>
    <div className='flex-grow overflow-y-auto rounded border-4'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-200 sticky top-0'>
          <tr>
            <th className='px-6 py-3 text-center'>ID</th>
            <th className='px-6 py-3 text-center'>First Name</th>
            <th className='px-6 py-3 text-center'>Last Name</th>
            <th className='px-6 py-3 text-center'>Gender</th>
            <th className='px-6 py-3 text-center'>Age</th>
            <th className='px-6 py-3 text-center'>Fictional Grade</th>
            <th className='px-6 py-3 text-center'>Informational Grade</th>
            <th className='px-6 py-3 text-center'>Spelling Grade</th>
            <th className='px-6 py-3 text-center'>Reading Grade Level</th>
          </tr>
        </thead>
        <tbody>
          {studentsWithGrades?.map((student) => (
            <tr key={student.id} className='border-b hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors'>
              <td className='px-6 py-4 text-center'>{student.id}</td>
              <td className='px-6 py-4 text-center'>{student.first_name}</td>
              <td className='px-6 py-4 text-center'>{student.last_name}</td>
              <td className='px-6 py-4 text-center'>{student.gender}</td>
              <td className='px-6 py-4 text-center'>{student.age}</td>
              <td className='px-6 py-4 text-center'>{student.fictional_grade_count}</td>
              <td className='px-6 py-4 text-center'>{student.informational_grade_count}</td>
              <td className='px-6 py-4 text-center'>{student.spelling_grade_count}</td>
              <td className='px-6 py-4 text-center'>{student.reading_grade_level_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default StudentTablePage;
