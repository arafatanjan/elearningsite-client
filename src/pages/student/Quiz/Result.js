import React, { useEffect } from 'react';
import "./Result.css";
import { Link } from 'react-router-dom';
// import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult} from './Helper'
/** import actions  */
import { resetAllAction } from '../../../redux/QuizRelated/questionReducer';
import { resetResultAction } from '../../../redux/QuizRelated/resultReducer';
import { usePublishResult } from '../Quiz/Hooks/setResult';

const Result = () => {

    const dispatch = useDispatch()
    const { question : { queue ,answer}, result : { result, userId}}  = useSelector(state => state);
    const totalPoints = queue.length * 10; 
     const attempts = attempts_Number(result);
    //   const earnPoints = earnPoints_Number(result, answer)
      const earnPoints = earnPoints_Number(result, answer, 10)
      const flag = flagResult(totalPoints, earnPoints)

      //usePublishResult
      usePublishResult ({ 
        result, 
        username : userId,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed" });
        
     useEffect (()=> {
          console.log(userId);
     })

    function onRestart(){
        // console.log('on Restart');
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }
    return (
        <div className='container'>
             <h1 className='title'>Quiz Application</h1>
             <div className='result flex-center'>
             <div className='flex'>
                <span>Username</span>
                 <span className='bold'>{userId || ""}</span> 
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
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }}>{flag ? "Passed" : "Failed"}</span>
            </div>
             </div>
             <div className="start">
            <Link className='btn' to={'/Student/quiz'} onClick={onRestart}>Finish</Link>
        </div>
         {/* <div className="container">
            
            <ResultTable></ResultTable>
        </div>  */}
        </div>
    );
};

export default Result;