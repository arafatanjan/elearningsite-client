import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Popup from '../../../components/Popup';
import { useDispatch, useSelector } from 'react-redux';

const QuestionForm = () => {
  const { userDetails, currentUser, loading, response, error }  = useSelector((state) => state.user);
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: {
      question: '',
      options: ['', '', ''],
      answer: '',
    },
  });

  const { course, category } = useParams({});
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [properties, setProperties] = useState({});
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  console.log(currentUser.teachSclass)

  const onSubmit = (data) => {
    const newQuestion = {
      question: data.question,
      options: [data.options[0], data.options[1], data.options[2]],
    };
    // console.log(newQuestion);
    setQuestion([...question, newQuestion]);

    const newAnswer = parseFloat(data.answer);
    setAnswer([...answer, newAnswer]);

    setProperties({ course: course, category: category, class: currentUser.teachSclass });
    console.log(properties);
    //  console.log(question);
    // console.log(answer);

    reset();
  };

  // http://localhost:5000
  const postData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Teacher/quiz", {
        question,
        answer,
        properties
      });
      setShowPopup(true)
      setMessage("Done Successfully")
      console.log("Inside post response", response.data);
    } catch (error) {
      setShowPopup(true);
      setMessage("Error during POST request");
      console.error("Error during POST request:", error);
    }
    // <Stack sx={{ width: '100%' }} spacing={2}>
    //   <Alert severity="success">This is a success alert — check it out!</Alert>
    // </Stack>
  };

  const handleClick = () => {
    postData();
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        Quiz Question Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Question"
              {...register('question', { required: 'This field is required' })}
              multiline
              fullWidth
              margin="normal"  // Added margin here
            />
            <br />
            <label>Options:</label>
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <Controller
                  name={`options[${index}]`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Option ${index + 1}`}
                      fullWidth
                      margin="normal"  // Added margin here
                    />
                  )}
                />
              </div>
            ))}
            <TextField
              label="Answer"
              {...register('answer', { required: 'This field is required' })}
              type="number"
              fullWidth
              margin="normal"  // Added margin here
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add
            </Button>
            <Button
              type="button"
              onClick={handleClick}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="left" gutterBottom>
            Questions List:
          </Typography>
          <ul>
            {question.map((q, index) => (
              <li key={index}>
                <strong>Question:</strong> {q.question}
                <br />
                <strong>Options:</strong> {q.options.join(", ")}
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default QuestionForm;
