import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const MyForm = () => {
  const { semester, year, course, category } = useParams();
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    const url = `/Teacher/${data.semester}/${data.year}/${data.course}/${data.category}`;
    navigate(url);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Quiz Form
      </Typography>
      <Box sx={{ '& > :not(style)': { marginBottom: 2 } }}>
        <TextField label="Semester" {...register('semester')} defaultValue={semester} fullWidth />
        <TextField label="Year" {...register('year')} defaultValue={year} fullWidth />
        <TextField label="Course" {...register('course')} defaultValue={course} fullWidth />
        <TextField label="Category" {...register('category')} defaultValue={category} fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default MyForm;
