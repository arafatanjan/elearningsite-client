
import React, { useEffect, useState } from 'react'
 import Question from "./Question"

import { MoveNextQuestion, MovePrevQuestion } from '../Quiz/Hooks/FetchQuestion';

 import {PushAnswer}  from '../Quiz/Hooks/setResult'

/** redux store import */
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Quiz = () => {
     const [check, setChecked] = useState(undefined);
     const state= useSelector(state => state);
     const result = useSelector(state => state.result.result);
     const { trace, queue } = useSelector(state => state.question);
     const dispatch = useDispatch()

    // useEffect(()=>{
    //           console.log(result)
    // });

    /** next button event handler */
    // function onNext(){
    //     if(trace < queue.length){
    //         /** increase the trace value by one using MoveNextAction */
    //         dispatch(MoveNextQuestion());

    //         /** insert a new result in the array.  */
    //         if(result.length <= trace){
    //             dispatch(PushAnswer(check))
    //         }
    //     }
     
    //     /** reset the value of the checked variable */
    //     setChecked(undefined)
    // }

    /** Prev button event handler */
     function onPrev(){
         if(trace > 0){
              /** decrease the trace value by one using MovePrevQuestion */
               dispatch(MovePrevQuestion());
               
        // console.log('OnPrev Click')
         }
         }
         function onNext(){
            // console.log('OnNext Click')
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
     function onChecked(check){
         console.log(check)
          setChecked(check)
     }

    /** finished exam after the last question */
     if(result.length && result.length >= queue.length){
        return <Navigate to={'/Student/quiz/test/result'} replace={true}></Navigate>
     }

    return (
        <div className='container'>
        <h1 className='title'>Quiz Application</h1>
        {/* <br/>
        <br/> */}
        {/* <Question onChecked={onChecked} />
        <div className='grid'>
        <button className='btn prev' onClick={onPrev}>Prev</button>
        <button className='btn next' onClick={onNext}>Next</button>
        </div> */}
        {/* display questions */}
        <Question onChecked={onChecked} />

        <div className='grid'>
            { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
        <button className='btn next' onClick={onNext}>Next</button>
        </div>
        
    </div>
    
    );
};

export default Quiz;