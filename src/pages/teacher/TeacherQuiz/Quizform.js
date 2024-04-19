import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const MyForm = () => {
   const { category } = useParams();

   //??
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const { currentUser, userDetails, loading } = useSelector((state) => state.user);
  const course= currentUser.teachSubject; 
  console.log(course.id);

  const onSubmit = (data) => {
    const url = `/Teacher/${course.id}/${data.category}`;
    navigate(url);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Quiz Form
      </Typography>
      <Box sx={{ '& > :not(style)': { marginBottom: 2 } }}>
        <TextField label="Course" {...register('course')} defaultValue={course.subName} fullWidth disabled/>
        <TextField label="Category" {...register('category')} defaultValue={category} fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default MyForm;
