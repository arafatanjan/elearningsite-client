import React, { useEffect, useState , useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux'
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
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Question = () => {
    const time = 10;
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [check, setCheck] = useState(undefined);
    const [checked, setChecked] = useState(undefined);
    const [timer, setTimer]= useState(time);
    const [parentTimer, setParentTimer]= useState(time);
    const [navigate, setNavigate] = useState(false);
    const intervalRef = useRef();
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

     const startTimer = () => {
        clearInterval(intervalRef.current);
        setTimer(time);
        intervalRef.current = setInterval(() => {
            setTimer((currentTime) => {
                if (currentTime === 0) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return currentTime - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        setParentTimer(timer);
        if (timer === 0) {
            setNavigate(true);
        }
    }, [timer]);

    // if (navigate) {
    //     return <Navigate to={`/Student/quiz/test/result/${course}/${category}`} replace={true} />;
    // }

// useEffect(() => {
//     if (timer ===0) {
//         return (
//             <>
              
//               {/* Redirect or navigate to the desired URL */}
              
//               <Navigate to={`/Student/quiz/test/result/${course}/${category}`} replace={true} />
//             </>
//           );  
//     }
// })
// useEffect (()=> {
//     //console.log(checked);
//     //  console.log(serverError)
//      dispatch(updateResult({ trace, checked}))
//      //setChecked(undefined);
// },[checked])

useEffect(() => {
    // Check if 'checked' is defined and perform your logic
    console.log(checked);
    if (checked !== undefined) {
        dispatch(updateResult({ trace, checked }));
        //setChecked(undefined);
    }
}, [checked, dispatch, trace]);

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
        //console.log(trace);
        if(trace < queue.length){
            /** increase the trace value by one using MoveNextAction */
            dispatch(MoveNextQuestion());
                      
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
   
     if(navigate || result.length && result.length >= queue.length){
        //const url = `/Student/quiz/:semester/:year/:course/:category`;
        //navigate(url);
        return (
            <>
              
              {/* Redirect or navigate to the desired URL */}
              
              <Navigate to={`/Student/quiz/test/result/${course}/${category}`} replace={true} />
            </>
          );  
     }

    return (

        <div className='container'>
        {/* <h1 className='title'>Quiz Application</h1> */}
         <div className='flex gap-2 items-center'>
            <FontAwesomeIcon
            className='text-green-700'
            width={20}
            height={20}
            icon={faStopwatch}
            />
            <span>00:00:{parentTimer}</span>
        </div> 
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

