import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
//import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import axios from "axios";
import CustomBarChart from '../../../components/CustomBarChart'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const QuizAnalysisThird = ({ active, payload, dataKey }) => {
    const dispatch = useDispatch();
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
    const [results, setResults] = useState([]);

    if (active && payload && payload.length) {
        //console.log(payload);
        const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;
    }

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);
    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        //console.log(subjectAttendancePercentage);
      })

    //console.log(attendanceBySubject);
    //console.log(overallAttendancePercentage);
    //console.log(subjectAttendancePercentage);
    //console.log(attendancePercentage);
    //console.log(currentUser.school._id) 

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

      //console.log(results);

    // Create a Map to group students by name and rollNum

  const nam = results.map(student => student.name);
  const a= nam.includes(currentUser.name) ? currentUser.name : '';
  const groupedStudents = new Map();

  results.forEach(student => {
    const key = `${student.name}_${student.rollNum}`;

    if (groupedStudents.has(key)) {
      groupedStudents.get(key).push(student);
    } else {
      groupedStudents.set(key, [student]);
    }
  });

  // Convert Map values to an array
  const groupedArrays = Array.from(groupedStudents.values());
  //console.log(groupedArrays);
  //console.log(userDetails);

  // Function to count attendance status for different subjects
//   const countAttendanceStatus = (group) => {
//     const subjectAttendanceCounts = {};

//     group.forEach(student => {
//       student.attendance.forEach(record => {
//         const subjectname = record.subName;
//         const status = record.status;

//         if (!subjectAttendanceCounts[subjectname]) {
//           subjectAttendanceCounts[subjectname] = {};
//         }

//         if (!subjectAttendanceCounts[subjectname][status]) {
//           subjectAttendanceCounts[subjectname][status] = 1;
//         } else {
//           subjectAttendanceCounts[subjectname][status]++;
//         }
//       });
//     });

//     return subjectAttendanceCounts;
// };

// const calculateAttendanceStats = (group) => {
//     const subjectStats = {};

//     group.forEach(student => {
//       student.attendance.forEach(record => {
//         const subjectName = record.subName;
//         const status = record.status;

//         if (!subjectStats[subjectName]) {
//           subjectStats[subjectName] = {
//             totalPresent: 0,
//             highestPresent: 0,
//             studentCount: 0,
//           };
//         }

//         if (status === 'Present') {
//           subjectStats[subjectName].totalPresent++;
//           subjectStats[subjectName].highestPresent = Math.max(
//             subjectStats[subjectName].highestPresent,
//             subjectStats[subjectName].totalPresent
//           );
//         }

//         subjectStats[subjectName].studentCount++; // Move this line inside the record loop
//       });
//     });
//         return subjectStats;
//   };

   // Function to calculate total, highest, and average present per subject across all students
//    const calculateOverallAttendanceStats = (students) => {
//     const overallStats = {};

//     students.forEach(student => {
//       student.attendance.forEach(record => {
//         const subjectName = record.subName;
//         const status = record.status;

//         if (!overallStats[subjectName]) {
//           overallStats[subjectName] = {
//             totalPresent: 0,
//             highestPresent: 0,
//             studentCount: 0,
//           };
//         }

//         if (status === 'Present') {
//           overallStats[subjectName].totalPresent++;
//           overallStats[subjectName].highestPresent = Math.max(
//             overallStats[subjectName].highestPresent,
//             overallStats[subjectName].totalPresent
//           );
//         }

//         overallStats[subjectName].studentCount++;
//       });
//     });

//     return overallStats;
//   };

//   const overallAttendanceStats = calculateOverallAttendanceStats(results);

//   const chartData = Object.entries(overallAttendanceStats).map(([subject, stats]) => ({
//     subject,
//     totalPresent: stats.totalPresent,
//     highestPresent: stats.highestPresent,
//     studentCount: stats.studentCount,
//   }));

 // Function to calculate total, highest, and average present per subject
 const calculateSubjectStats = (student) => {
    const stats = {
      totalPresent: 0,
      highestPresent: 0,
      studentCount: 0,
    };

    student.attendance.forEach(record => {
      if (record.status === 'Present') {
        stats.totalPresent++;
        stats.highestPresent = Math.max(stats.highestPresent, stats.totalPresent);
      }

      stats.studentCount++;
    });

    return stats;
  };

    return (
        
            
             <>
             <h2>Attendance</h2>
                 <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
             </>

    //         <div style={{ display: 'flex' }}>
    //         {results.map((student, index) => {
    //           const subjectStats = calculateSubjectStats(student);
      
    //           return (
    //             <div style={{ display: 'flex' }}>
    //             {results.map((student, index) => {
    //              const subjectStats = calculateSubjectStats(student);

    //     return (
    //       <div key={index} style={{ margin: '0 10px' }}>
    //         <h2>{student.name}</h2>
    //         {nam.includes(student.name) ? (
    //           <BarChart width={400} height={300} data={[{ name: 'Present', count: subjectStats.totalPresent }]}>
    //             <CartesianGrid strokeDasharray="3 3" />
    //             <XAxis dataKey="name" />
    //             <YAxis />
    //             <Tooltip />
    //             <Legend />
    //             <Bar dataKey="count" fill="#8884d8" />
    //           </BarChart>
    //         ) : (
    //           <p>No chart available for this subject</p>
    //         )}
    //       </div>
    //     );
    //   })}
    // </div>
    //           );
    //         })}
    //       </div>
    );
};

export default QuizAnalysisThird;