import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
//import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import axios from "axios";
import CustomBarChart from '../../../components/CustomBarChart'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './QuizAnalysis.css';

const QuizAnalysisThird = ({ active, payload, dataKey }) => {
    const dispatch = useDispatch();
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
    const [results, setResults] = useState([]);
    

  //   if (active && payload && payload.length > 0 && payload[0] && payload[0].payload) {
  //     const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload;
  //     console.log(payload); // Check payload[0].payload contents
  // } else {
  //     console.log('Payload is empty or invalid');
  // }
   
    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);
    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])
    //console.log(userDetails)

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
        
    } 
  );
  
  

    Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        //console.log(subjectAttendancePercentage);
      })

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
             <h2 className="video-watches-title">Attendance</h2>
                 <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
             </>

    );
};

export default QuizAnalysisThird;