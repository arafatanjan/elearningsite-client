import React, { useEffect, useState, useRef } from "react";
// import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import "./Front.css";
import QuizCard from "./QuizCard";
import axios from "axios";

const Front = () => {
  const inputRef = useRef(null);
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://elearningsite-server.onrender.com/questions"
        );
        const data = response.data;
        setQuizes(data);
        //  console.log(data);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(quizes);

  return (
    <div>
      <br />
      <div className="service-container" id="quizes">
        {quizes &&
          quizes.map((quiz, index) => {
            console.log(quiz); 
            return <QuizCard key={quiz._id} quiz={quiz}></QuizCard>;
          })}
      </div>
    </div>
  );
};

export default Front;
