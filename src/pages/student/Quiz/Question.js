import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
// import data from './Data';
 import "./Question.css";

/** Custom Hook */
import { useFetchQestion } from '../Quiz/Hooks/FetchQuestion';
// import {updateResultAction} from '../../redux/reducers/resultReducer'
import { updateResult } from './Hooks/setResult'

import { useParams } from "react-router-dom";
import { MoveNextQuestion, MovePrevQuestion } from '../Quiz/Hooks/FetchQuestion';
import {PushAnswer}  from '../Quiz/Hooks/setResult'
import { Navigate } from 'react-router-dom';
import { Container, Typography, Radio, FormControlLabel, Button, Grid } from '@mui/material';
import StudentQuizMarks from './StudentQuizMarks';


const Question = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [chec, setChec] = useState();
    const [check, setCheck] = useState(undefined);
    const [checked, setChecked] = useState(undefined);
    // const [selectedValue, setSelectedValue] = React.useState('a');
    const [{ isLoading, apiData, serverError}] = useFetchQestion();
    // const questions = data[0];
     const question = useSelector(state => state.question.queue[state.question.trace])
     const  trace  = useSelector(state => state.question.trace);
     const result = useSelector(state => state.result.result);
      const dispatch = useDispatch()

      const { queue } = useSelector(state => state.question);
     const {  course, category } = useParams({});
     //console.log(result)

    useEffect (()=> {
        //console.log(checked);
        //  console.log(serverError)
         dispatch(updateResult({ trace, checked}))
         //setChecked(undefined);
    },[checked])

    // function onSelect(i) {
    //      console.log(i);
    //      //onChecked(i); 
    //      setChecked(i);
    //      dispatch(updateResult({ trace, checked}))
    //      setCheck(i);
    //     //  setSelectedValue(false);
    //     console.log(trace);
    //     console.log(checked);
        
    // }

    

    const handleOptionSelect = (questionIndex, optionIndex) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionIndex]: optionIndex
        }));
        //setSelectedOption(optionIndex);
        setCheck(optionIndex);
        dispatch(updateResult({ trace, checked: optionIndex }));
    
    };

    if(isLoading) return <h3>isLoading</h3>
    if(serverError) return <h3>{serverError || "Unknown Error"}</h3>

    // Define custom styles for FormControlLabel
    // const CustomRadio = withStyles({
    //     root: {
    //       // Customize the radio button itself here
    //     },
    //   })(Radio);
    //setChecked(undefined);

    function onNext(){
        // console.log('OnNext Click')
       
        //console.log(trace);
        if(trace < queue.length){
            /** increase the trace value by one using MoveNextAction */
            dispatch(MoveNextQuestion());
            
            
            // dispatch(PushAnswer(check));
             /** insert a new result in the array.  */
            if(result.length <= trace){
                dispatch(PushAnswer(check))
                
            }
        
    }  
    setChecked(undefined);
}

     function onPrev(){      
         if(trace > 0){
              /** decrease the trace value by one using MovePrevQuestion */
               dispatch(MovePrevQuestion());
               console.log(trace);
        // console.log('OnPrev Click')
         }
         }
        
     

    /** finished exam after the last question */
   
     if(result.length && result.length >= queue.length){
        //const url = `/Student/quiz/:semester/:year/:course/:category`;
        //navigate(url);
        return (
            <>
              
              {/* Redirect or navigate to the desired URL */}
              {/* For example, using react-router's <Navigate> component */}
              <Navigate to={`/Student/quiz/test/result/${course}/${category}`} replace={true} />
            </>
          );  
     }

    return (

        <div className='container'>
        <h1 className='title'>Quiz Application</h1>
        <div className='question'>
            <h2 className='text-light'>{queue[trace]?.question}</h2>
            {queue[trace]?.options.map((option, optionIndex) => (
                <div 
                    key={optionIndex}
                    className={`option ${selectedOptions[trace] === optionIndex ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(trace, optionIndex)}
                >
                    {option}
                </div>
            ))}
        </div>
        <div className='grid'>
            {trace > 0 && <button className='btn prev' onClick={onPrev}>Prev</button>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>

      


    );
};

export default Question;

