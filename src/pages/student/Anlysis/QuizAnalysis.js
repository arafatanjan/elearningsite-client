import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

const studentsData = 
[
  {
    "_id": "6598ef1b704a36fe265ee6f8",
    "property": {
      "semester": "z",
      "year": "z",
      "course": "z",
      "category": "z"
    },
    "username": "arafat",
    "result": [
      0
    ],
    "attempts": 1,
    "points": 20,
    "achived": "",
    "createdAt": "2024-01-06T06:11:39.132Z",
    "__v": 0
  },
  {
    "_id": "6598ef1b704a36fe265ee6f6",
    "property": {
      "semester": "z",
      "year": "z",
      "course": "z",
      "category": "z"
    },
    "username": "arafatt",
    "result": [
      0
    ],
    "attempts": 1,
    "points": 50,
    "achived": "",
    "createdAt": "2024-01-06T06:11:39.131Z",
    "__v": 0
  },
  {
    "_id": "65995f86cf67f5a3e5e587e8",
    "property": {
      "semester": "First",
      "year": "2023",
      "course": "General knowledge",
      "category": "BANGLADESH"
    },
    "username": "arafat",
    "result": [
      0
    ],
    "attempts": 1,
    "points": 30,
    "achived": "",
    "createdAt": "2024-01-06T14:11:18.560Z",
    "__v": 0
  },
  {
    "_id": "65995f86cf67f5a3e5e587ea",
    "property": {
      "semester": "First",
      "year": "2023",
      "course": "General knowledge",
      "category": "BANGLADESH"
    },
    "username": "arafatt",
    "result": [
      0
    ],
    "attempts": 1,
    "points": 20,
    "achived": "",
    "createdAt": "2024-01-06T14:11:18.566Z",
    "__v": 0
  }
]
  ;

const QuizAnalysis = ({ }) => {

  const [results, setResults] = useState([]);
const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    getAllResults();
    //console.log(na?.property?.semester);
    //console.log(currentUser.name)
  }, []);

  const getAllResults = () => {
    axios
      .get(`https://elearningsite-server.onrender.com/result`)
      .then((result) => {
        setResults(result.data);
      })
      .catch((error) => {
        setResults([]);
        console.log(error);
        alert("Error happened!");
      });
      
  };

  const datasetBySemester = studentsData.reduce((accumulator, currentItem) => {
    const semester = currentItem.property.semester;

    // If the semester is not in the accumulator, create an array for it
    if (!accumulator[semester]) {
      accumulator[semester] = [];
    }

    // Push the current item to the array for the corresponding semester
    accumulator[semester].push(currentItem);

    return accumulator;
  }, {});

  // Now datasetBySemester is an object where keys are semesters
  // and values are arrays of items for each semester
  const nam = results.map(student => student.username);
  console.log(nam);
   //const semester = results.map(s => s.property.semester)
   //const semester = nam.includes(currentUser.name) ? results.map(s => s.property.semester): ''; 
   let semester = [];

if (nam.includes(currentUser.name)) {
  semester = studentsData.map(s => s.property.semester);
}

   console.log(semester);
  // console.log(datasetBySemester[semester]);

  const latestData= [];
  semester.forEach(semester => {
    //latestData = datasetBySemester[semester]
    latestData.push(...datasetBySemester[semester]);
    console.log(datasetBySemester[semester]);
  });
  console.log(latestData);

  const course = results.map(s => s.property.course)
  const courseOne = course.map(c => c)
  console.log(courseOne );
  const category = results.map(s => s.property.category)
  const categoryOne = course.map(ca => ca)
  console.log(categoryOne);

    // const data = studentsData.students.map(student => ({
    //     name: student.name,
    //     Bangla: student.subjects.Bangla,
    //   }));

    //   const a_bangla_quiz_mark = studentsData.students.find(student => student.name === 'A').subjects.Bangla;
    //   const all_bangla_quiz_marks = studentsData.students.map(student => student.subjects.Bangla);
    //   const highest_bangla_quiz_mark = Math.max(...all_bangla_quiz_marks);
    //   const average_bangla_quiz_mark = all_bangla_quiz_marks.reduce((sum, mark) => sum + mark, 0) / all_bangla_quiz_marks.length;

    //   const data = [
    //     { name: 'A', Bangla: a_bangla_quiz_mark },
    //     { name: 'Highest', Bangla: highest_bangla_quiz_mark },
    //     { name: 'Average', Bangla: average_bangla_quiz_mark },
    //   ];

    // const data = studentsData.students.map(student => ({
    //     name: student.name,
    //     Bangla: student.subjects.Bangla,
    //     English: student.subjects.English,
    //   }));

// const [results, setResults] = useState([]);
// const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     getAllResults();
//     //console.log(na?.property?.semester);
//     //console.log(currentUser.name)
//   }, []);

//   const getAllResults = () => {
//     axios
//       .get(`https://elearningsite-server.onrender.com/result`)
//       .then((result) => {
//         setResults(result.data);
//       })
//       .catch((error) => {
//         setResults([]);
//         console.log(error);
//         alert("Error happened!");
//       });
      
//   };
    
      //const all_bangla_quiz_marks = studentsData.students.map(student => student.subjects.Bangla);
      //const na =results.username.includes(currentUser.name)? results.map(s => s.username): [];
      const na = results.map(s => s.username)
      //console.log(na);
      const arafatPoints = results.find(student => student.username === currentUser.name)?.points || 0;
      //const arafatPoints = Object.values(datasetBySemester).flat().find(student => student.username === currentUser.name)?.points || 0;
      //const arafatPoints = Object.values(datasetBySemester).flat().filter(student => student.username === 'arafat').map(student => student.points);
      console.log(arafatPoints);
      const arafatSemester = results.find(student => student.username === currentUser.name)?.property.semester || '';
      
      //console.log(nam)
      //const all_bangla_quiz_marks = Object.values(datasetBySemester).flatMap((semesterData) => semesterData.map((student) => student.points));
      const all_bangla_quiz_marks = latestData.map(student => student.points);
      console.log(all_bangla_quiz_marks);
      const highest_bangla_quiz_mark = Math.max(...all_bangla_quiz_marks);
      console.log(highest_bangla_quiz_mark);
      const average_bangla_quiz_mark = all_bangla_quiz_marks.reduce((sum, mark) => sum + mark, 0) / all_bangla_quiz_marks.length;
    
      // const all_english_quiz_marks = studentsData.students.map(student => student.subjects.English);
      // const highest_english_quiz_mark = Math.max(...all_english_quiz_marks);
      // const average_english_quiz_mark = all_english_quiz_marks.reduce((sum, mark) => sum + mark, 0) / all_english_quiz_marks.length;
    
    //   const banglaData = [
    //     { name: 'A', Bangla: studentsData.students[0].subjects.Bangla },
    //     { name: 'Highest', Bangla: highest_bangla_quiz_mark },
    //     { name: 'Average', Bangla: average_bangla_quiz_mark },
    //   ];
    
    //   const englishData = [
    //     { name: 'A', English: studentsData.students[0].subjects.English },
    //     { name: 'Highest', English: highest_english_quiz_mark },
    //     { name: 'Average', English: average_english_quiz_mark },
    //   ];

    // const banglaData = [];
    // if (nam.includes(currentUser.name)){
    //  banglaData = [
    //     //{ name: 'A', Bangla: studentsData?.student[0].points },
    //     { name: 'A', Ban: all_bangla_quiz_marks},
    //     { name: 'Highest', Ban: highest_bangla_quiz_mark },
    //     { name: 'Average', Ban: average_bangla_quiz_mark } 
    //   ];
    // }
    const filteredData = studentsData.filter((stu) => (
      stu.property.course === courseOne  && stu.property.category === categoryOne
    ));
    console.log(filteredData);
    
const a= nam.includes(currentUser.name) ? currentUser.name : '';
//console.log(a)
    const banglaData = nam.includes(currentUser.name)
  ? [
      //{ name: 'A', Bangla: studentsData?.student[0].points },
      { name: `${a}`, Ban: `${arafatPoints}`},
      { name: 'Average', Ban: average_bangla_quiz_mark },
      { name: 'Highest', Ban: highest_bangla_quiz_mark }
      
    ]
  : [];

// Now you can use banglaData
//console.log(all_bangla_quiz_marks);
    
      // const englishData = [
      //   { name: 'A', English: studentsData.students[0].subjects.English },
      //   { name: 'Highest', English: highest_english_quiz_mark },
      //   { name: 'Average', English: average_english_quiz_mark },
      // ];

    return (
        <div>
          <h2>Quiz</h2>
        <h4>{arafatSemester}</h4>
        <BarChart width={400} height={300} data={banglaData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Ban" fill="#8884d8" />
        </BarChart>
  
        {/* <h2>English Marks</h2>
        <BarChart width={400} height={300} data={englishData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="English" fill="#82ca9d" />
        </BarChart> */}
      </div>
    );
};

export default QuizAnalysis;
