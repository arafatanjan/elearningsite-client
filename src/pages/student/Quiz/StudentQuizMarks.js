import React, { useEffect, useState } from 'react'
import { getServerData } from './Helper'
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentQuizFields } from '../../../redux/studentRelated/studentHandle';
import { useNavigate } from 'react-router-dom';

const StudentQuizMarks = () => {
    const [data, setData] = useState([])
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
//console.log(currentUser._id)
const [studentID, setStudentID] = useState("");
const [chosenSubName, setChosenSubName] = useState("");
    const [marksProgress, setMarksProgress] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const sclass = useSelector((state) => state.sclass);
    const navigate = useNavigate();
//console.log(sclass)


useEffect(() => {
  fetchData(); // Fetch data from server on component mount
}, []);

useEffect(() => {
  if (currentUser && currentUser._id && data.length > 0) {
      processAndDispatchData(currentUser._id, data);
  }
}, [currentUser, data, dispatch]);

const fetchData = () => {
  // Fetch data from server
  getServerData('http://localhost:5000/result', (res) => {
      setData(res);
  });
};
console.log(data)

const processAndDispatchData = (studentID, rawData) => {
  // Process the data to calculate averages or "student_id": "653566902d54c8f8058ab3e9","average": {"653566402d54c8f8058ab3ca": 30,"6535687a2d54c8f8058ab4e4": 30}

  const processedData = processAssessmentData(rawData);
  console.log(processedData)
  
  
  // Function to filter data by student_id and map subjects and quiz averages return subName: "653566402d54c8f8058ab3ca", QuizAvg: "30" 
const filterAndMapData = (studentId) => {
  const studentData = processedData.find(item => item.student_id === studentId);
  if (!studentData) {
    return []; // Return empty array if student_id not found
  }
  const { average } = studentData;
  const mappedData = Object.entries(average).map(([subjectName, points]) => {
    return { subName: subjectName, QuizAvg: points.toString() }; // Store subject and points in an object
    
  });
  console.log(mappedData);
  return mappedData;

};

const result = filterAndMapData(studentID);
console.log(result);


 

  // Dispatch action to update student quiz fields when filteredData changes
  if (result.length > 0) {
    result.forEach(({ subName, QuizAvg }) => {
      const fields = { subName, QuizAvg }; // Convert QuizAvg to string
      dispatch(updateStudentQuizFields(studentID, fields, "updateQuizResult")); 
      //console.log(subName, QuizAvg); // Log as string
      console.log(fields); // Log as string
      navigate('/Student/quiz');
    });  
  }

  // Dispatch actions based on the processed data
  // if (processedData.length > 0) {
  //     processedData.forEach(({ subName, QuizAvg }) => {
  //         const fields = { subName, QuizAvg: QuizAvg.toString() };
  //         dispatch(updateStudentQuizFields(studentID, fields, 'updateQuizResult'));
  //         console.log(fields)

  //     });
  // }
};

const processAssessmentData = (rawData) => {
  // Placeholder function for data processing (replace with your logic)
  const groupedByStudentID = groupDataByStudentID(rawData);
  const averagesByStudentID = calculateAverages(groupedByStudentID);
  return averagesByStudentID;
};

const groupDataByStudentID = (rawData) => {
  // Placeholder function to group data by student_id (replace with your logic)
  const groupedData = {};
  rawData.forEach((item) => {
      const studentID = item.student_id;
      if (!groupedData[studentID]) {
          groupedData[studentID] = [];
      }
      groupedData[studentID].push(item);
  });
  return groupedData;
};

const calculateAverages = (groupedData) => {
  const averages = [];
  for (const studentID in groupedData) {
      const courses = {};
      groupedData[studentID].forEach((item) => {
          const course = item.property.course;
          if (!courses[course]) {
              courses[course] = [];
          }
          courses[course].push(item.points);
      });
      const averageCoursePoints = {};
      for (const course in courses) {
          const totalPoints = courses[course].reduce((acc, curr) => acc + curr, 0);
          const averagePoints = totalPoints / courses[course].length;
          averageCoursePoints[course] = averagePoints;
      }
      averages.push({ student_id: studentID, average: averageCoursePoints?.toFixed(2) });
      console.log(averages)
  }
  return averages;
}
};

export default StudentQuizMarks;

// // useEffect to update filteredData whenever studentID or processedData changes
// useEffect(() => {
//   if (studentID && processedData) {
//     const result = filterAndMapData(studentID);
//     setFilteredData(result);
//   }
// }, [studentID]);

//  // Conditional logging of filteredData when it changes
// useEffect(() => {
//   if (filteredData) {
//     console.log(filteredData); // Log filteredData only when it is not null
//   }
// }, [filteredData]);




// const fields = { subName: chosenSubName, marksProgress }

//   useEffect(() => {
//     dispatch(updateStudentProgressFields(studentID, fields, "updateProgessResult"));
// }, [dispatch, userDetails]);


// const StudentQuizMarks = () => {
//   const [data, setData] = useState([])
//   const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
// //console.log(currentUser._id)
// const [studentID, setStudentID] = useState("");
// const [chosenSubName, setChosenSubName] = useState("");
//   const [marksProgress, setMarksProgress] = useState("");
//   const [filteredData, setFilteredData] = useState(null);
//   const sclass = useSelector((state) => state.sclass);
// //console.log(sclass)

//    useEffect(() => {
//       getServerData(`http://localhost:5000/result`, (res) => {
//           setData(res)
//        })
//       }, [])
// //console.log(data)
//  // Function to process assessment data
// const processAssessmentData = () => {
  
//   // Step 1: Group data by student_id
//   const groupedBystudent_id = {};

//   data.forEach(item => {
//     if (!groupedBystudent_id[item.student_id]) {
//       groupedBystudent_id[item.student_id] = [];
//     }
//     groupedBystudent_id[item.student_id].push(item);
//   });

//   // Step 2: Calculate average points for each course for each user
//   const averagesBystudent_id = [];
//   for (const student_id in groupedBystudent_id) {
//     const courses = {};
//     groupedBystudent_id[student_id].forEach(item => {
//       const course = item.property.course;
//       if (!courses[course]) {
//         courses[course] = [];
//       }
//       courses[course].push(item.points);
//     });

//     const averageCoursePoints = {};
//     for (const course in courses) {
//       const totalPoints = courses[course].reduce((acc, curr) => acc + curr, 0);
//       const averagePoints = totalPoints / courses[course].length;
//       averageCoursePoints[course] = averagePoints;
//     }

//     averagesBystudent_id.push({ student_id, average: averageCoursePoints });
//   }

//   return averagesBystudent_id; // Move this line outside of the loop
// };

// // Step 4: Render the processed data
// const processedData = processAssessmentData();

// console.log(processedData);


// // Function to filter data by student_id and map subjects and quiz averages
// const filterAndMapData = (studentId) => {
//   const studentData = processedData.find(item => item.student_id === studentId);
//   if (!studentData) {
//     return []; // Return empty array if student_id not found
//   }
//   const { average } = studentData;
//   const mappedData = Object.entries(average).map(([subjectName, points]) => {
//     return { subName: subjectName, QuizAvg: points.toString() }; // Store subject and points in an object
//   });

//   return mappedData;

// };


// // useEffect to update studentID when currentUser._id changes
// useEffect(() => {
//   if (currentUser && currentUser._id) {
//     setStudentID(currentUser._id);
//     console.log(studentID);
//   }
// }, [currentUser]);



// // useEffect to update filteredData whenever studentID or processedData changes

// useEffect(() => {
// if (studentID && processedData) {
//   const result = filterAndMapData(studentID);
//   // setFilteredData(result);
//   console.log(result);

//   // Dispatch action to update student quiz fields when filteredData changes
//   if (result.length > 0) {
//     result.forEach(({ subName, QuizAvg }) => {
//       const fields = { subName, QuizAvg }; // Convert QuizAvg to string
//       dispatch(updateStudentQuizFields(studentID, fields, "updateQuizResult")); 
//       //console.log(subName, QuizAvg); // Log as string
//       console.log(fields); // Log as string
//     });  
//   }
// }
// }, [studentID, dispatch, filterAndMapData, processedData]);



// };

// export default StudentQuizMarks;