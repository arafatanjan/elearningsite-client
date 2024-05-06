import React, { useEffect, useState } from 'react'
import axios from "axios";
import CustomBarChart from '../../../components/CustomBarChart'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';

const QuizAnalysisFifth = () => {
    const [results, setResults] = useState([]);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    function divideBySubjectName(data) {
        const dividedData = {};
      
        data.forEach(student => {
          student.attendance.forEach(attendance => {
            const subName = attendance.subName;
      
            if (!dividedData[subName]) {
              dividedData[subName] = [];
            }
      
            dividedData[subName].push({
              studentName: student.name,
              rollNumber: student.rollNum,
              status: attendance.status,
              date: attendance.date,
            });
          });
        });
      
        return dividedData;
      }

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
      
      // Call the function
      const dividedBySubject = divideBySubjectName(results);
      
      // Log the result
      console.log(dividedBySubject);
    
      return (
        <div>
            
        </div>
    );
};

export default QuizAnalysisFifth;