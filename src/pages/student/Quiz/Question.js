import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import data from './Data';
 import "./Question.css";
import { Radio, FormControlLabel,FormControl, FormLabel, RadioGroup, List, ListItem, ListItemText, Checkbox, Box, Typography, Paper, withStyles } from '@material-ui/core';

/** Custom Hook */
import { useFetchQestion } from '../Quiz/Hooks/FetchQuestion';
// import {updateResultAction} from '../../redux/reducers/resultReducer'
import { updateResult } from './Hooks/setResult'



const Question = ({ onChecked }) => {
    const [checked, setChecked] = useState(undefined)
    // const [selectedValue, setSelectedValue] = React.useState('a');
    const [{ isLoading, apiData, serverError}] = useFetchQestion();
    // const questions = data[0];
     const question = useSelector(state => state.question.queue[state.question.trace])
     const  trace  = useSelector(state => state.question.trace);
     const result = useSelector(state => state.result.result);
      const dispatch = useDispatch()
    useEffect (()=> {
        //   console.log( {trace, checked});
          //console.log(apiData)npm start

        //  console.log(serverError)
        // dispatch(updateResultAction({ trace, checked}))
         dispatch(updateResult({ trace, checked}))
    },[checked])

    function onSelect(i) {
        //  console.log(i);
         onChecked(i); 
         setChecked(true);
         dispatch(updateResult({ trace, checked}))
        //  setSelectedValue(false);
        
    }
    if(isLoading) return <h3>isLoading</h3>
    if(serverError) return <h3>{serverError || "Unknown Error"}</h3>

    // Define custom styles for FormControlLabel
    const CustomRadio = withStyles({
        root: {
          // Customize the radio button itself here
        },
      })(Radio);
      

    return (
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px'}}>
      <Typography variant="h5">{question?.question}</Typography>
      <List className='question'>
        {question?.options.map((q, i) => (
          <ListItem key={i}>
            <Radio
              checked={result[trace] ==i}
              onChange={() => onSelect(i)}
              value={checked}
              name="options"
              id={`q${i}-option`}
              color="primary" // Customize the radio button color
            />
             {/* <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label> */}
             {/* <span className={`check ${result[trace] === i ? 'checked' : ''}`}></span>  */}
            <Typography
              className="custom-label"
              variant="body1"
              style={{ fontSize: '16px', color: 'blue' }}
              
            >
              {q}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>


    );
};

export default Question;

