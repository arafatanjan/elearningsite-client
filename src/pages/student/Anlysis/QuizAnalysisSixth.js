import React, { useEffect, useState } from 'react'
import axios from "axios";
import CustomBarChart from '../../../components/CustomBarChart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';

// const Studentdetails= 
// [
//   {
//     "_id": "653566902d54c8f8058ab3e9",
//     "name": "arafat",
//     "rollNum": 2,
//     "sclassName": {
//       "_id": "653566192d54c8f8058ab3be",
//       "sclassName": "class 8"
//     },
//     "school": "6535658d2d54c8f8058ab3a8",
//     "role": "Student",
//     "attendance": [
//       {
//         "date": "2023-10-23T00:00:00.000Z",
//         "status": "Present",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "653567102d54c8f8058ab420"
//       },
//       {
//         "date": "2023-10-25T00:00:00.000Z",
//         "status": "Absent",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "653807059fdac16dc54f38f5"
//       },
//       {
//         "date": "2023-12-12T00:00:00.000Z",
//         "status": "Present",
//         "subName": "6535687a2d54c8f8058ab4e4",
//         "_id": "6588fe59fb8d335f6c0de6fb"
//       },
//       {
//         "date": "2023-12-14T00:00:00.000Z",
//         "status": "Absent",
//         "subName": "6535687a2d54c8f8058ab4e4",
//         "_id": "6588fe63fb8d335f6c0de704"
//       },
//       {
//         "date": "2024-01-05T00:00:00.000Z",
//         "status": "Present",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "659a961a3bd908138fb3174b"
//       },
//       {
//         "date": "2024-01-06T00:00:00.000Z",
//         "status": "Present",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "659a962b3bd908138fb31756"
//       }
//     ],
//     "examResult": [
//       {
//         "subName": "653566402d54c8f8058ab3ca",
//         "marksObtained": 70,
//         "_id": "6535672b2d54c8f8058ab432"
//       },
//       {
//         "subName": "6535687a2d54c8f8058ab4e4",
//         "marksObtained": 65,
//         "_id": "6535689e2d54c8f8058ab52d"
//       }
//     ],
//     "__v": 8
//   },
//   {
//     "_id": "653567cf2d54c8f8058ab46f",
//     "name": "anju",
//     "rollNum": 3,
//     "sclassName": {
//       "_id": "653566192d54c8f8058ab3be",
//       "sclassName": "class 8"
//     },
//     "school": "6535658d2d54c8f8058ab3a8",
//     "role": "Student",
//     "attendance": [
//       {
//         "date": "2023-10-23T00:00:00.000Z",
//         "status": "Present",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "6535681d2d54c8f8058ab485"
//       },
//       {
//         "date": "2023-10-22T00:00:00.000Z",
//         "status": "Present",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "653568322d54c8f8058ab4a2"
//       },
//       {
//         "date": "2023-12-12T00:00:00.000Z",
//         "status": "Present",
//         "subName": "6535687a2d54c8f8058ab4e4",
//         "_id": "6588fe75fb8d335f6c0de734"
//       },
//       {
//         "date": "2023-12-14T00:00:00.000Z",
//         "status": "Absent",
//         "subName": "6535687a2d54c8f8058ab4e4",
//         "_id": "6588fe7dfb8d335f6c0de73d"
//       },
//       {
//         "date": "2024-01-04T00:00:00.000Z",
//         "status": "Present",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "659a97003bd908138fb31857"
//       },
//       {
//         "date": "2024-01-05T00:00:00.000Z",
//         "status": "Present",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "659a97063bd908138fb31862"
//       },
//       {
//         "date": "2024-01-06T00:00:00.000Z",
//         "status": "Present",
//         "subName": "653566402d54c8f8058ab3ca",
//         "_id": "659a970a3bd908138fb3186e"
//       }
//     ],
//     "examResult": [
//       {
//         "subName": "653566402d54c8f8058ab3ca",
//         "marksObtained": 60,
//         "_id": "6535684f2d54c8f8058ab4c3"
//       },
//       {
//         "subName": "6535687a2d54c8f8058ab4e4",
//         "marksObtained": 80,
//         "_id": "653568b02d54c8f8058ab557"
//       }
//     ],
//     "__v": 9
//   }
// ]


const QuizAnalysisSixth = () => {

    const [results, setResults] = useState([]);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        getAllResults();
        ////console.log(na?.property?.semester);
        ////console.log(results)
      }, []);
    
      const getAllResults = () => {
        axios
          .get(`https://elearningsite-server.onrender.com/Students/${currentUser.school._id}`)
          .then((result) => {
            setResults(result.data);
          })
          .catch((error) => {
            setResults([]);
            //console.log(error);
            alert("Error happened!");
          });
          
      };

      console.log(results);

      // Initialize an empty object to store the result
      const resultArray = {};
      
      // Iterate through each student in the Studentdetails array
      results.forEach(student => {
        const studentName = student.name;
      
        // Iterate through each exam result of the student
        student.examResult.forEach(result => {
          const subjectName = result.subName;
      
          // If the subject doesn't exist in the resultArray, create an empty object for it
          if (!resultArray[subjectName]) {
            resultArray[subjectName] = {};
          }
      
          // Assign the marksObtained to the corresponding student in the subject object
          resultArray[subjectName][studentName] = result.marksObtained;
        });
      });
      
      //console.log(resultArray);


      //console.log(Studentdetails)
        //console.log(studentName)
        const nam = results.map(student => student.name);
        const a= nam.includes(currentUser.name) ? currentUser.name : '';
        console.log(nam);

        const resultArrayAsArray = Object.entries(resultArray).map(([subject, studentMarks]) => ({
            subject,
            studentMarks,
          }));

          console.log(resultArrayAsArray)

        // const chartsData = Object.entries(resultArray).map(([subject, studentMarks]) => ({
        //     subject,
        //     avg: Object.values(studentMarks).reduce((sum, marks) => sum + marks, 0) / Object.keys(studentMarks).length,
        //     highest: Math.max(...Object.values(studentMarks)),
        //     points: studentMarks[currentUser.name] || 0,
        //   }));

        // const chartsData = resultArrayAsArray.map((data, index) => ({
        //     name: 'Chart ' + (index + 1),
        //     avg: data.reduce((sum, entry) => sum + entry.points, 0) / data.length,
        //     highest: Math.max(...data.map(entry => entry.points)),
        //     points: data.filter(result => result.username === currentUser.name)
        //     .map((result, index) => result.points),
        //     //arafatPoints : finalArray.find(student => student.username === currentUser.name)?.points || 0,
        //   }));

        const chartData = resultArrayAsArray.map(subjectData => {
            const studentMarks = subjectData.studentMarks;
            const studentNames = Object.keys(studentMarks);
        
            // Calculate the first student's marks obtained
            const firstStudentMarks = studentMarks[studentNames[0]];
        
            // Calculate the highest marks obtained
            const highestMarks = Math.max(...Object.values(studentMarks));
        
            // Calculate the average marks obtained
            const averageMarks = Object.values(studentMarks).reduce((sum, marks) => sum + marks, 0) / studentNames.length;
        
            return {
              subject: subjectData.subject,
              firstStudentMarks,
              highestMarks,
              averageMarks,
            };
        })

    return (
        <div>
            <h2>Semester Final Marks</h2>
        <ResponsiveContainer width="50%" height={200}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis domain={[0, 100]}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="firstStudentMarks" fill="#8884d8" name={`${a}`}/>
        <Bar dataKey="highestMarks" fill="#82ca9d" name="Highes" />
        <Bar dataKey="averageMarks" fill="#ffc658" name="Average" />
      </BarChart>
    </ResponsiveContainer>
    </div>
    );
};

export default QuizAnalysisSixth;