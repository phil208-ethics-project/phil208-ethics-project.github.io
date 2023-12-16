function HomePage() {
  return (
    <>
      <h1 className='text-2xl'>Reading Table: A Free and Open Source Solution to Differentiated Instruction</h1>
      <h2 className="text-2xl">What is Differentiated Instruction?</h2>
      <p>
       Differentiated instruction is 	an instructional strategy in which teachers tailor instruction to meet the needs of students of varying skill and 
       comprehension levels.  This definition is highly generalized; implementation and purpose varies widely between not just different schools but faculty 
       within schools.  The adoption and praise of differentiated instruction has grown significantly among educational theorists and policy makers especially 
       after the adoption of Common Core educational standards brought increased standardized testing.  The most prevalent and praised implementation is a feedback 
       loop with teachers using differing forms of assessments to alter each lesson to match the skills and learning needs of all students. This is most effectively 
       done by continuously redistributing students into small groups with similar skill and understanding levels for each given lesson or topic.  Assessment is 
       done regularly to inform flexible grouping and lesson differentiation as students progress through the year.  This cycle of assessment informs differentiated 
       instruction, and the instructional effectiveness is reflected in assessment scores allowing swift examination of unsuccessful lesson strategies. The distinction
       between Homogenous Small groups and Flexible grouping is important as the first stratifies the class and student’s self-perception by singular or narrow 
       measures of academic ability instead of much more precise skills related to the topic of discussion.  This allows students to non judgmentally examine and 
       embrace their differing educational deficits and excesses.
      </p>
      <h2 className="text-2xl">Mission Statement</h2>
      <p>
        The quality of education that a person receives contributes greatly to their overall standard of living throughout the course of her life.  This is especially
        true for the education received in the earlier years of one’s scholastic journey. The relationship between socioeconomic success and education is clear and
        proven, and socioeconomic success is strongly associated with improved occupational and personal outcomes.  The increased resources and fiscal opportunities 
        available increase medical care access and thereby improve health outcomes as well.  Additionally, better educational achievement has been shown to improve 
        lifelong health independent of socioeconomic success.  One scientifically sound solution to improve educational outcomes is the use of differentiated 
        instruction which is, at its most general, a framework and strategy in which teachers tailor instruction to meet the needs of students with varying skill and 
        comprehension levels. Therefore the use of assessment of some form is integral to differentiation.  No clear or simple  segmentation of an understanding or 
        skill exists, so evaluating students’ varying abilities and learning styles requires deep understanding of educational theory and standard expectations.  
        Formalized assessments remove this burden from teachers and provide tests and materials to gauge student abilities and target lessons accordingly.  Time 
        constraints on primary teachers expounded by increasing societal demands necessitate clear and quick handling and interpretability of the resulting data for 
        effective, flexible differentiation.  Processing test results and then organizing and frequently reviewing that information to shape each lesson prevents 
        many teachers with access to these tests for differentiation from enacting the practice.  As a result, many of these formalized assessments sell additional 
        data management software; but the costs of these resources are prohibitive for many school districts and therefore limit wider and more successful adoption of
        differentiation in elementary classrooms.  Many school districts which purchase testing materials forego the added expense of management software.  This 
        significantly reduces data reflection and utilization in instruction as teachers prioritize other demands when presented with ineffective data systems.  We 
        created an open-source application as an alternative to expensive data management software to help alleviate these roadblocks.  ReadingTable is a freely 
        available web application providing improved data processing and filtering for elementary educators who utilize one common differentiation resource, Scholastic 
        Next Step Guided Reading Assessment.  The application provides data management and filtering capabilities for any teacher whether working in districts which 
        purchase or who personally purchase and use this assessment. By providing an application to improve the frequency and effectiveness of differentiated 
        instruction, we hope to improve elementary educational quality and thereby the lives of the students.
      </p>
      <h2 className='text-2xl'>How To Use Reading Table</h2>
      <p>
        Select the "Student Dashboard" in the top middle. This will take you to a page where you can enter student information manually, enter a zip of csv file of 
        student info to be auto-entered, a search bar to search for the students you have entered, and a "Student Table" to help you keep track of all the students
        there were submitted. Click on a student in the "Student Table" to grade them. On this Student Dahsboard page, there are two buttons: "Export" in the top right
        corner, and "Go to Student Table" in the bottom left. "Export" exports all your student info as a zip file. This will provide an example for how you can format
        your zip and csv files for the drag-and-drop. The "Student Table" button will take you to a page where you can search and filter the student data you entered.
      </p>
      <h2 className='text-2xl'>Limitations</h2>
      <p>
        Lack of some initially desired features also limits the impact of our project.  The Next Step assessment has two tests based upon grade level, one K-2 and 
        another 3-6.  Our application is only usable for third through sixth grade teachers. Further, this is only one standardized assessment.  We were not able to 
        include the reader interest survey either.  This helps teachers tailor reading in a personal way than the other metrics.  Further, our goal was to develop 
        some advanced visualizations to improve data interpretation and integration simpler and more effectively.  Lastly, the teacher input received to prioritize 
        implemented features was provided by a small number of teachers, the majority of whom work at the same school.  All teachers included work in the same 
        community.  This certainly biases the features provided to the structure and pedagogy of the school and community itself. 
      </p>
    </>
  )
}

export default HomePage
