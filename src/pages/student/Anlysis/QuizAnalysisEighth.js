import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomBarChart from "../../../components/CustomBarChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import "./QuizAnalysis.css";

const QuizAnalysisEighth = () => {
  const [results, setResults] = useState([]);
  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    getAllResults();
  }, []);

  //https://elearningsite-server.onrender.com

  const getAllResults = () => {
    axios
      .get(
        `https://elearningsite-server.onrender.com/students/PlayCount/${currentUser._id}`
      )
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

  const percentageData = results.map((student) => {
    const percentage = (student.playCount / student.totalCount) * 100;
    return {
      student_id: student.student_id,
      percentage: percentage,
    };
  });

  //const nam = results.map(student => student.name);
  //const a= nam.includes(currentUser.name) ? currentUser.name : '';
  const a = currentUser.name;
  //console.log(a);

  // Calculate average and highest percentage
  const averagePercentage =
    percentageData.reduce((sum, student) => sum + student.percentage, 0) /
    percentageData.length;
  const highestPercentage = Math.max(
    ...percentageData.map((student) => student.percentage)
  );

  // Prepare data for the chart
  const chartData = [
    { label: `${a}`, percentage: percentageData[0]?.percentage.toFixed(0) || 0 },
    { label: "Average", percentage: averagePercentage.toFixed(0) },
    { label: "Highest", percentage: highestPercentage.toFixed(0) },
  ];

  const renderTooltipContent = ({ payload }) => {
    const { value, name } = payload?.[0] || {}; // Extract value and name from the payload
    return (
      <div className="custom-tooltip">
        <p className="label">
          {name ? `${name}: ${value}%` : "No data available"}
        </p>
      </div>
    );
  };

  return (
    <>
      <div>
        <h2 className="video-watches-title">Video Watches</h2>
      </div>
      <ResponsiveContainer
        className="ResponsiveContainer"
        width="50%"
        height={300}
      >
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
          <Legend />
          <Bar
            dataKey="percentage"
            fill="#140302"
            name="Percentage"
            barSize={40}
            barGap={0}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <style jsx>{`
        @media only screen and (max-width: 900px) {
          .video-watches-title {
            font-size: 1.2rem; /* Adjust font size for smaller screens */
          }
          .ResponsiveContainer {
            width: 100%;
          }
          .custom-tooltip {
            font-size: 0.9rem; /* Adjust tooltip size */
          }
        }
      `}</style>
    </>
  );
};

export default QuizAnalysisEighth;
