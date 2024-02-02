import React, { useEffect, useState } from 'react'
import axios from "axios";
import CustomBarChart from '../../../components/CustomBarChart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';

const QuizAnalysisEighth = () => {
    const [results, setResults] = useState([]);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        getAllResults();
        
      }, []);

      //https://elearningsite-server.onrender.com
    
      const getAllResults = () => {
        axios
          .get(`https://elearningsite-server.onrender.com/students/PlayCount/${currentUser._id}`)
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

      const percentageData = results.map(student => {
        const percentage = (student.playCount / student.totalCount) * 100;
        return {
          student_id: student.student_id,
          percentage: percentage,
        };
      });
    
      // Calculate average and highest percentage
      const averagePercentage = percentageData.reduce((sum, student) => sum + student.percentage, 0) / percentageData.length;
      const highestPercentage = Math.max(...percentageData.map(student => student.percentage));
    
      // Prepare data for the chart
      const chartData = [
        { label: 'Student', percentage: percentageData[0]?.percentage || 0 },
        { label: 'Average', percentage: averagePercentage },
        { label: 'Highest', percentage: highestPercentage },
      ];

    return (
        <>
        <h2>Video Watches</h2>
        <ResponsiveContainer width="20%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="percentage" fill="#8884d8" name="Percentage" />
      </BarChart>
    </ResponsiveContainer>
    </>
    )
};

export default QuizAnalysisEighth;