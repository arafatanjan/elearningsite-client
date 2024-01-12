import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useSelector } from 'react-redux';
import axios from "axios";

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

const QuizAnalysisSecond = () => {
    const { currentUser } = useSelector((state) => state.user);
    
   
    ////console.log(currentUser.name);
    const [results, setResults] = useState([]);

    useEffect(() => {
        getAllResults();
        ////console.log(na?.property?.semester);
        ////console.log(results)
      }, []);
    
      const getAllResults = () => {
        axios
          .get(`https://elearningsite-server.onrender.com/result`)
          .then((result) => {
            setResults(result.data);
          })
          .catch((error) => {
            setResults([]);
            //console.log(error);
            alert("Error happened!");
          });
          
      };

    const nam = results.map(student => student.username);
    //////console.log(nam);
    const arafatSemester = results.find(student => student.username === currentUser.name)?.property.semester || '';
    const groupedArrays = results.reduce((result, student) => {
        const key = `${student.property.course}-${student.property.category}`;
      
        if (!result[key]) {
          result[key] = [];
        }
      
        result[key].push(student);
        return result;
      }, {});
      
      const finalArray = Object.values(groupedArrays);

      //console.log(finalArray);

      const chartsData = finalArray.map((data, index) => ({
        name: 'Chart ' + (index + 1),
        avg: data.reduce((sum, entry) => sum + entry.points, 0) / data.length,
        highest: Math.max(...data.map(entry => entry.points)),
        points: data.filter(result => result.username === currentUser.name)
        .map((result, index) => result.points),
        //arafatPoints : finalArray.find(student => student.username === currentUser.name)?.points || 0,
      }));
      //const arafatPoints = finalArray.find(student => student.username === currentUser.name)?.points || 0;
      const pointsForArafat = finalArray.flatMap(subarray => 
        subarray
          .filter(result => result.username === currentUser.name)
          .map((result, index) => result.points)
      );
      const arafatPoints= pointsForArafat.map((points, index) => (points ))
      //console.log(arafatPoints)
      //console.log(arafatPoints)
      const a= nam.includes(currentUser.name) ? currentUser.name : '';
////console.log(a)
//     const banglaData = nam.includes(currentUser.name)
//   ? [
//       //{ name: 'A', Bangla: studentsData?.student[0].points },
//       { name: `${a}`, Ban: `${arafatPoints}`},
//       { name: 'Average', Ban: average_bangla_quiz_mark },
//       { name: 'Highest', Ban: highest_bangla_quiz_mark }
      
//     ]
//   : [];


  return (
    <>
    <h2>Quiz</h2>
    {nam.includes(currentUser.name) ? (
        <div style={{ display: 'flex' }}>
          {chartsData.map((chartData, index) => (
            <div key={index} style={{ margin: '0 10px' }}>
              <h2>{arafatSemester}</h2>
              <BarChart
                width={600}
                height={300}
                data={
                  nam.includes(currentUser.name)
                    ? [
                        { name: `${a}`, points: chartData.points[0] },
                        { name: 'avg', points: chartData.avg },
                        { name: 'highest', points: chartData.highest },
                      ]
                    : []
                }
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="points" fill="#8884d8" />
              </BarChart>
            </div>
          ))}
        </div>
      ) : <div></div>}
      </>
  );
};



export default QuizAnalysisSecond;
 


