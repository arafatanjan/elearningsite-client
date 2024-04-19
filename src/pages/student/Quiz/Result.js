import React, { useEffect, useState } from 'react';
import "./Result.css";
import axios from "axios";
import { Link } from 'react-router-dom';
// import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult} from './Helper'
/** import actions  */
import { resetAllAction } from '../../../redux/QuizRelated/questionReducer';
import { resetResultAction } from '../../../redux/QuizRelated/resultReducer';
import { usePublishResult } from '../Quiz/Hooks/setResult';
import { getServerData } from "./Helper";
import { useParams } from "react-router-dom";
import StudentQuizMarks from './StudentQuizMarks';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    //const [property, setProperty] = useState([]);
    const { semester, year, course, category } = useParams({});
     const dispatch = useDispatch()
    const { question : { queue ,answer}, result : { result, userId}}  = useSelector(state => state);
    const totalPoints = queue.length * 10; 
     const attempts = attempts_Number(result);
    //   const earnPoints = earnPoints_Number(result, answer)
      const earnPoints = earnPoints_Number(result, answer, 10)
      const flag = flagResult(totalPoints, earnPoints)
      const { currentUser, response, error } = useSelector((state) => state.user);
      const [studentID, setStudentID] = useState("");
      const [showQuizMarks, setShowQuizMarks] = useState(false); // State to control visibility of StudentQuizMarks
      const navigate = useNavigate();

      useEffect(() => { 
        setStudentID(currentUser._id);   
  }, [currentUser._id]);


  if (response) { console.log(response) }
  else if (error) { console.log(error) }
      

     
      usePublishResult ( studentID,{
        property : { course, category},
        result, 
        username : currentUser.name,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed" });

    function onRestart(){
        // console.log('on Restart');
        dispatch(resetAllAction());
        dispatch(resetResultAction());
        setShowQuizMarks(true); // Set showQuizMarks to true to render StudentQuizMarks
        //navigate('/Student/quiz');
  }

    

    return (
        <div className='container'>
             <h1 className='title'>Quiz Result</h1>
             <div className='result flex-center'>
             <div className='flex'>
                <span>Username</span>
                 <span className='bold'>{currentUser.name || ""}</span> 
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            {/* <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }}>{flag ? "Passed" : "Failed"}</span>
            </div> */}
             </div>
             <div className="start">
             <button className='btn' onClick={onRestart}>Finish</button>
        </div>

         {/* Conditionally render StudentQuizMarks based on showQuizMarks state */}
      {showQuizMarks && <StudentQuizMarks />}
         {/* <div className="container">
            
            <ResultTable></ResultTable>
        </div>  */}
        </div>
    );
};

export default Result;