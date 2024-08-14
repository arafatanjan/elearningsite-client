import React, { useEffect, useState } from 'react'
import { getServerData } from '../Quiz/Helper'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAllSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
//import AreaField from '@mui/material/TextField';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system'; // Import styled from @mui/system
import remarks from './Remark'


const Segmentation = () => {
const dispatch = useDispatch();
const [data, setData] = useState([])
const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
const { subjectDetails, subjectsList } = useSelector((state) => state.sclass);
//console.log(currentUser)
const [studentID, setStudentID] = useState("");
const [singleStdData, setSingleStdData] = useState(null);
const [dataSet, setDataSet] = useState(null);
const [results, setResults] = useState([]);
const [subjectID, setsubjectID] = useState();
const [subject, setSubject] = useState();
const [comment, setComment] = useState();
const [remarkArray, setRemarkArray] = useState([]);
//console.log(userDetails);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://elearningsite-server.onrender.com/Student/suggestion/${currentUser.sclassName._id}`);
        const data = response.data;
        setDataSet(data)
        //console.log('Data:', data);
        // Find the student data based on currentUser._id
        //const foundStudent = data.filter(student => student.Student_id === currentUser._id);
        const averageStudent = data.filter(student => student.Student_id === currentUser._id);
        //console.log('foundStudent:', foundStudent);
        // Update the state with the found student data
        if (foundStudent) {
          setSingleStdData(foundStudent);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData when currentUser._id or currentUser.sclassName._id changes
    fetchData();
  }, [currentUser._id, currentUser.sclassName._id]);

  // This useEffect will log the updated value of singleStdData whenever it changes
//   useEffect(() => {
//     console.log('Single Student Data:', singleStdData);
//   }, [singleStdData]);

//console.log('Data:', dataSet);
//console.log('Single Student Data:', singleStdData);

// const dataa=[
//   {
//     "_id": "662bf5b7f20271fabd675252",
//     "Student_id": "653566902d54c8f8058ab3e9",
//     "name": "arafat",
//     "rollNum": 2,
//     "school": "6535658d2d54c8f8058ab3a8",
//     "teachSubject_id": "653566402d54c8f8058ab3ca",
//     "teachSubject_subName": "Bangla",
//     "sclassName": "653566192d54c8f8058ab3be",
//     "examResult": [
//       {
//         "subName": "653566402d54c8f8058ab3ca",
//         "marksObtained": 11.25,
//         "examNewMarks": 60,
//         "marksProgress": 10,
//         "progressNewMarks": 20,
//         "QuizAvg": 26.67,
//         "quizNewMarks": 10,
//         "_id": "6535672b2d54c8f8058ab432"
//       }
//     ],
//     "attendancePercentage": 6.25,
//     "attendanceNewMarks": 10,
//     "createdAt": "2024-04-26T18:43:03.190Z",
//     "updatedAt": "2024-04-26T18:43:03.190Z",
//     "__v": 0
//   },
//   {
//     "_id": "662bf5b7f20271fabd675256",
//     "Student_id": "653567cf2d54c8f8058ab46f",
//     "name": "anju",
//     "rollNum": 3,
//     "school": "6535658d2d54c8f8058ab3a8",
//     "teachSubject_id": "653566402d54c8f8058ab3ca",
//     "teachSubject_subName": "Bangla",
//     "sclassName": "653566192d54c8f8058ab3be",
//     "examResult": [
//       {
//         "subName": "653566402d54c8f8058ab3ca",
//         "marksObtained": 66,
//         "examNewMarks": 60,
//         "marksProgress": 13.33,
//         "progressNewMarks": 20,
//         "QuizAvg": 30,
//         "quizNewMarks": 10,
//         "_id": "6535684f2d54c8f8058ab4c3"
//       }
//     ],
//     "attendancePercentage": 7.5,
//     "attendanceNewMarks": 10,
//     "createdAt": "2024-04-26T18:43:03.830Z",
//     "updatedAt": "2024-04-26T18:43:03.830Z",
//     "__v": 0
//   },
//   {
//     "_id": "662bf644f20271fabd67528d",
//     "Student_id": "653566902d54c8f8058ab3e9",
//     "name": "arafat",
//     "rollNum": 2,
//     "school": "6535658d2d54c8f8058ab3a8",
//     "teachSubject_id": "6535687a2d54c8f8058ab4e4",
//     "teachSubject_subName": "English",
//     "sclassName": "653566192d54c8f8058ab3be",
//     "examResult": [
//       {
//         "subName": "6535687a2d54c8f8058ab4e4",
//         "marksObtained": 48.75,
//         "examNewMarks": 60,
//         "marksProgress": 13.33,
//         "progressNewMarks": 20,
//         "QuizAvg": 2.83,
//         "quizNewMarks": 10,
//         "_id": "6535689e2d54c8f8058ab52d"
//       }
//     ],
//     "attendancePercentage": 6.25,
//     "attendanceNewMarks": 10,
//     "createdAt": "2024-04-26T18:45:24.725Z",
//     "updatedAt": "2024-04-26T18:45:24.725Z",
//     "__v": 0
//   },
//   {
//     "_id": "662bf645f20271fabd675291",
//     "Student_id": "653567cf2d54c8f8058ab46f",
//     "name": "anju",
//     "rollNum": 3,
//     "school": "6535658d2d54c8f8058ab3a8",
//     "teachSubject_id": "6535687a2d54c8f8058ab4e4",
//     "teachSubject_subName": "English",
//     "sclassName": "653566192d54c8f8058ab3be",
//     "examResult": [
//       {
//         "subName": "6535687a2d54c8f8058ab4e4",
//         "marksObtained": 60,
//         "examNewMarks": 60,
//         "marksProgress": 10,
//         "progressNewMarks": 20,
//         "QuizAvg": 2,
//         "quizNewMarks": 10,
//         "_id": "653568b02d54c8f8058ab557"
//       }
//     ],
//     "attendancePercentage": 7.5,
//     "attendanceNewMarks": 10,
//     "createdAt": "2024-04-26T18:45:25.361Z",
//     "updatedAt": "2024-04-26T18:45:25.361Z",
//     "__v": 0
//   }
// ];

// Step 1: Group data by examResult.subName
// if(){}
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
  //console.log('groupedData:', groupedData);
  
  // Step 2: Filter groups with common examResult.subName
  const commonStudents = [];
  for (const subName in groupedData) {
    if (groupedData[subName].length > 1) {
      commonStudents.push(...groupedData[subName]);
    }
  }
  
  //console.log('commonStudents:', commonStudents);

// useEffect(() => {
//     const fetchSubjectNames = async () => {
//         const subjectID = currentUser.school._id;
//         console.log(subjectID);
//         try {
//           await dispatch(getAllSubjectDetails(subjectID, 'AllSubjects'));
//         } catch (error) {
//           console.error(`Error fetching subject details for ${subjectID}:`, error);
//           // Handle error if needed
//         }
//     };
  
//     // Call fetchSubjectNames only when chartData or dispatch changes
    
//       fetchSubjectNames();
    
//   }, []);

//     //console.log('results:', results) 
//     console.log('subjectsList:', subjectsList) 
      


  

let transformedData = [];

for (let key in groupedData) {
  if (groupedData.hasOwnProperty(key)) {
    
    let students = groupedData[key];
//console.log('students:',students)


let totalMarksObtained = 0;
    let totalQuizAvg = 0;
    let totalMarksProgress = 0;
    let totalAttendace = 0;

students.forEach(student => {
    // Extract relevant information from the student object
    const { Student_id, name, teachSubject_subName } = student;
    
    totalMarksObtained += student.examResult[0].marksObtained;
        totalQuizAvg += student.examResult[0].QuizAvg;
        totalMarksProgress += student.examResult[0].marksProgress;
        totalAttendace += student.attendancePercentage;

  });
    
  students.forEach(student => {   
    const { Student_id, name, teachSubject_subName } = student;
    const averageMarksObtained = totalMarksObtained / students.length;
    const averageQuizAvg = totalQuizAvg / students.length;
    const averageMarksProgress = totalMarksProgress / students.length;
    const averageAttendace= totalAttendace / students.length;

    // Create a new object containing the desired information
    const studentInfo = {
        Student_id,
        name,
        teachSubject_subName,
        "marksObtained": student.examResult[0].marksObtained,
        "quizAvg": student.examResult[0].QuizAvg,
        "marksProgress": student.examResult[0].marksProgress,
        "averageMarksObtained": averageMarksObtained.toFixed(2),
        "averageQuizAvg": averageQuizAvg.toFixed(2),
        "averageMarksProgress": averageMarksProgress.toFixed(2),
        "attendance":student.attendancePercentage,
        "averageAttendance": averageAttendace.toFixed(2)
    };

    // Push this object into the result array
    transformedData.push(studentInfo);
});

// Display the final result array
//console.log("resultArray:",resultArray);

  
  }
}
// Log the resulting transformedData array
//console.log('transformedData:',transformedData);

const foundStudent = transformedData.filter(student => student.Student_id === currentUser._id);
//console.log('foundStudent:',foundStudent);

const getAllResults = () => {
  axios
    .get(`https://elearningsite-server.onrender.com/students/PlayCount/${currentUser._id}`)
    .then((result) => {
      setResults(result.data);
    })
    .catch((error) => {
      setResults([]);
      alert('Error happened!');
    });
};

useEffect(() => {
  // Call getAllResults when component mounts or when currentUser changes
  getAllResults();
}, [currentUser]);

console.log(results);

const percentageData = results.map(student => {
  const percentage = (student.playCount / student.totalCount) * 100;
  return {
    student_id: student.student_id,
    percentage: percentage,
  };
});

const averagePercentage = percentageData.reduce((sum, student) => sum + student.percentage, 0) / percentageData.length;

//console.log(percentageData);
//console.log(averagePercentage);
const foundpercentageData = percentageData.filter(student => student.student_id === currentUser._id);
//console.log('foundpercentageData',foundpercentageData);
// Convert foundpercentageData array into an object
const percentageObject = foundpercentageData[0];



const resultArray = [];

const resultObj = {};

if (foundStudent && foundStudent.length > 0) {
    foundStudent.forEach(student => {
    const marksObtainedFeedback = (student.marksObtained >= student.averageMarksObtained) ? 'average' : 'less than average';
    const objExam = {
      Subject : student.teachSubject_subName,
      Segment : 'Examination',
      Feedback : marksObtainedFeedback
    };
    // Determine marksObtained feedback  
  
    resultArray.push(objExam);

 
  const objProgress = {   
  };
    // Determine marksProgress feedback
    objProgress.Subject = student.teachSubject_subName;
    objProgress.Segment = 'Class Progress';
    objProgress.Feedback = (student.marksProgress >= student.averageMarksProgress) ? 'average' : 'less than average';
    resultArray.push(objProgress);
  

  
    const objQuiz = {
      Subject : student.teachSubject_subName
    };
    // Determine quizAvg feedback
    //resultObjC.Subject = student.teachSubject_subName;
    objQuiz.Segment = 'Quiz';
    objQuiz.Feedback = (student.quizAvg >= student.averageQuizAvg) ? 'average' : 'less than average';
    resultArray.push(objQuiz);
 

  
    const objAttendance = {
      
    };

    objAttendance.Subject = student.teachSubject_subName;
    objAttendance.Segment = 'Attendance';
    objAttendance.Feedback = (student.attendance >= student.averageAttendance) ? 'average' : 'less than average';
    resultArray.push(objAttendance);
    
    const objTutorial = {  };
   
    objTutorial.Subject = student.teachSubject_subName;
    objTutorial.Segment = 'Tutorial Watched';
    objTutorial.Feedback = (percentageObject?.percentage >= averagePercentage) ? 'average' : 'less than average';
    resultArray.push(objTutorial);
  
})
}

//console.log("resultObj", resultObj);
console.log("resultArray", resultArray);
const subjects = [...new Set(resultArray.map(item => item.Subject))];
//console.log(subjects)



//percentageObject.Feedback = (percentageObject.percentage >= averagePercentage) ? 'average' : 'less than average';
//console.log(percentageObject);

//const a= subjects.map(b=>{ percentageObject.Subject:b; resultArray.push(percentageObject)})

// subjects.forEach(subject => {
//   
//   const newObj = {
//     Subject: subject,
//     Segment: "Tutorial watched" ,
//     Feedback: percentageObject.Feedback, 
//   };
//   // Add the new object to 'resultArray'
//   resultArray.push(newObj);
// });

// console.log('NewresultArray',resultArray);

const groupedArrays = subjects.map(subject => {
  const filteredItems = resultArray?.filter(item => item.Subject === subject);
  return filteredItems; // Return the filtered array directly
});

// Output the groupedArrays
console.log('groupedArrays',groupedArrays);
//console.log('remarks[0].message',remarks[26].message)

useEffect(() => {
  if (groupedArrays && groupedArrays.length > 0) {
    const newRemarkArray = [];

    groupedArrays.forEach((sub) => {
      const feedbackValues = sub.map((item) => item.Feedback);
      //console.log('p',feedbackValues)
      
      if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[0].message;
        newRemarkArray.push({ subject, comment });
      } else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === ' average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[1].message;
        newRemarkArray.push({ subject, comment });
      } else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[2].message;
        newRemarkArray.push({ subject, comment });
      } else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[3].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[4].message;
        newRemarkArray.push({ subject, comment });
      }
       
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[5].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[6].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[7].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[8].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[9].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[10].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[11].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[12].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[13].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[14].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[15].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[16].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[17].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[18].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[19].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[20].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[21].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[22].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[23].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[24].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[25].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[26].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[27].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[28].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'less than average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[29].message;
        newRemarkArray.push({ subject, comment });
      }
       else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[30].message;
        newRemarkArray.push({ subject, comment });
      }
      else if (
        feedbackValues[0] === 'less than average' &&
        feedbackValues[1] === 'average' &&
        feedbackValues[2] === 'less than average' &&
        feedbackValues[3] === 'less than average' &&
        feedbackValues[4] === 'less than average'
      ) {
        const subject = sub[0].Subject;
        const comment = remarks[31].message;
        newRemarkArray.push({ subject, comment });
      }
    });

    // Update the state with the new remarkArray
    setRemarkArray(newRemarkArray);
  }
}, [dataSet]); 

 
console.log(remarkArray);   

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
              <td>{data.Feedback} </td>
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
              {data.subject}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {data.comment}
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
        </div>
    );
};

export default Segmentation;


// Create a custom styled Card component
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  margin: 'auto',
  marginTop: theme.spacing(2),
}));

// Create a custom styled Typography for the title
const StyledTitle = styled(Typography)({
  color: 'blue',
});