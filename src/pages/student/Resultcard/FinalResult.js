import React, { useEffect, useState } from 'react'
import { getServerData } from '../Quiz/Helper'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAllSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
//import AreaField from '@mui/material/TextField';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import { styled } from '@mui/system'; // 
import Classroom from "../../../assets/grading.jpeg";


const FinalResult = () => {
    const dispatch = useDispatch();
const [data, setData] = useState([])
const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
const { subjectDetails, subjectsList } = useSelector((state) => state.sclass);
////console.log(currentUser)
const [studentID, setStudentID] = useState("");
const [singleStdData, setSingleStdData] = useState(null);
const [dataSet, setDataSet] = useState(null);
const [results, setResults] = useState([]);
const [subjectID, setsubjectID] = useState();
const [subject, setSubject] = useState();
const [comment, setComment] = useState();
//const [remarkArray, setRemarkArray] = useState([]);


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://elearningsite-server.onrender.com/Student/suggestion/${currentUser.sclassName._id}`);
        const data = response.data;
        setDataSet(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentUser._id, currentUser.sclassName._id]);
//console.log(dataSet)


const groupedData = dataSet?.reduce((acc, student) => {
    const examResults = student.examResult || [];
    if (examResults && examResults.length > 0) {
      // Assuming each student can have multiple examResult entries
      examResults.forEach(result => {
        const examSubName = result.subName;
        if (!acc[examSubName]) {
          acc[examSubName] = []; // Initialize array for the subName if it doesn't exist
        }
        acc[examSubName].push(student);
      });
    }
    return acc;
  }, {});
  

  const commonStudents = [];
  for (const subName in groupedData) {
    if (groupedData[subName].length > 1) {
      commonStudents.push(...groupedData[subName]);
    }
  }
  
  let transformedData = [];

for (let key in groupedData) {
if (groupedData.hasOwnProperty(key)) {
    
    let students = groupedData[key];

    let totalMarksObtained = 0;
    let totalQuizAvg = 0;
    let totalMarksProgress = 0;
    let totalAttendace = 0;

students.forEach(student => {
    
    const { Student_id, name, teachSubject_subName } = student;
    
    totalMarksObtained += student.examResult[0].marksObtained;
        totalQuizAvg += student.examResult[0].QuizAvg;
        totalMarksProgress += student.examResult[0].marksProgress;
        totalAttendace += student.attendancePercentage;

        const studentInfo = {
            Student_id,
            name,
            teachSubject_subName,
            "marksObtained": student.examResult[0].marksObtained,
            "quizAvg": student.examResult[0].QuizAvg,
            "marksProgress": student.examResult[0].marksProgress,
            "attendance":student.attendancePercentage,          
        };
        transformedData.push(studentInfo);
  });     
}
}
const foundStudent = transformedData.filter(student => student.Student_id === currentUser._id);
//console.log('foundStudent:',foundStudent);

const resultArray = [];

const resultObj = {};

if (foundStudent && foundStudent.length > 0) {
    foundStudent.forEach(student => {
    
 
    const objExam = {
      Subject : student.teachSubject_subName,
      Segment : 'Examination',
      Marks : student.marksObtained
    };

    resultArray.push(objExam);

 
  const objProgress = {   
  };
    
    objProgress.Subject = student.teachSubject_subName;
    objProgress.Segment = 'Class Progress';
    objProgress.Marks = student.marksProgress;
    resultArray.push(objProgress);

  
    const objQuiz = {
      Subject : student.teachSubject_subName
    };
    objQuiz.Segment = 'Quiz';
    objQuiz.Marks = student.quizAvg;
    resultArray.push(objQuiz);
 

  
    const objAttendance = {
      
    };

    objAttendance.Subject = student.teachSubject_subName;
    objAttendance.Segment = 'Attendance';
    objAttendance.Marks = student.attendance; 
    resultArray.push(objAttendance);   
  
})
}

// Initialize an empty object to store total marks for each subject
let subjectTotals = {};

// Iterate through each item in resultArray
resultArray.forEach(item => {
    const { Subject, Marks } = item;

    // If the subject is already in subjectTotals, add the marks to its total
    if (subjectTotals[Subject]) {
        subjectTotals[Subject] += Marks;
    } else {
        // Otherwise, initialize the subject's total marks
        subjectTotals[Subject] = Marks;
    }
});

// Convert subjectTotals object into the desired array format
let totalMarksArray = [];

// Iterate through subjectTotals and format the data into an array of objects
for (let subject in subjectTotals) {
    if (subjectTotals.hasOwnProperty(subject)) {
        totalMarksArray.push({
            "Subject": subject.trim(), // Trim subject name to remove extra spaces
            "TotalMarks": subjectTotals[subject]
        });
    }
}

//console.log("totalMarksArray",totalMarksArray)

let remarkArray = [];

// Define a function to calculate the remark based on total marks
function calculateRemark(totalMarks) {
    let remark = '';

    // Determine the letter grade and grade point based on total marks
    if (totalMarks >= 90) {
        remark = 'Your Letter Grade is A and Your Grade Point is 4';
    } else if (totalMarks >= 86) {
        remark = 'Your Letter Grade is A- and Your Grade Point is 3.67';
    } else if (totalMarks >= 82) {
        remark = 'Your Letter Grade is B+ and Your Grade Point is 3.33';
    } else if (totalMarks >= 78) {
        remark = 'Your Letter Grade is B and Your Grade Point is 3.00';
    } else if (totalMarks >= 74) {
        remark = 'Your Letter Grade is B- and Your Grade Point is 2.67';
    } else if (totalMarks >= 70) {
        remark = 'Your Letter Grade is C+ and Your Grade Point is 2.33';
    } else if (totalMarks >= 66) {
        remark = 'Your Letter Grade is C and Your Grade Point is 2.00';
    } else if (totalMarks >= 62) {
        remark = 'Your Letter Grade is C- and Your Grade Point is 1.67';
    } else if (totalMarks >= 58) {
        remark = 'Your Letter Grade is D+ and Your Grade Point is 1.33';
    } else if (totalMarks >= 55) {
        remark = 'Your Letter Grade is D and Your Grade Point is 1.00';
    } else {
        remark = 'Your Letter Grade is F and Your Grade Point is 0.00';
    }

    return remark;
}

// Iterate through each subject in resultArray
totalMarksArray.forEach(item => {
    const { Subject, TotalMarks } = item;

    // Calculate the remark based on the total marks
    const remark = calculateRemark(TotalMarks);

    // Push the subject and its remark to remarkArray
    remarkArray.push({
        "Subject": Subject.trim(), // Trim subject name to remove extra spaces
        "Remark": remark,
        "TotalMarks":TotalMarks
    });
});

// Display the final remarkArray containing remarks for each subject
//console.log(remarkArray);

    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Course Name</td>
                        <td>Segments</td>
                        <td>Performance</td>
                       
                    </tr>
                </thead>
                <tbody>
        {resultArray?.length > 0 ? (
          resultArray.map((data, index) => (
            <tr key={index} className="table-body">
              <td>{data.Subject}</td>
              <td>{data.Segment}</td>
              <td>{data.Marks} </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No Data Found</td>
          </tr>
        )}
      </tbody>
      </table>    
      <br/>
      <br/>

      <Card>
      {remarkArray.length > 0 ? (
        remarkArray.map((data, index) => (
          <CardContent key={index}>
            <Typography variant="h5" component="div" gutterBottom>
              {data.Subject}
            </Typography>
            <Typography variant="body1" gutterBottom>
            Your total mark is {data.TotalMarks}. {data.Remark} 
            </Typography>
          </CardContent>
        ))
      ) : (
        <CardContent>
          <Typography variant="body1" gutterBottom>
            No remarks available.
          </Typography>
        </CardContent>
      )}
    </Card>   
    <Stack sx={{
                        alignItems: 'center',
                        mb: 3,
                        mt: 3
                    }}>
                        <img
                            src={Classroom}
                            alt="classroom"
                            style={{ width: '50%' }}
                        />
                    </Stack>
            
        </div>
    );
};

export default FinalResult;