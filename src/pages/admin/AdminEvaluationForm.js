import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const AdminEvaluationForm = () => {
    const { semester, year, course, category } = useParams();
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    const url = `/Teacher/${data.semester}/${data.year}/${data.course}/${data.category}`;
    navigate(url);
  };
    return (
        
        <div>
        <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
  <Typography variant="h5" align="center" gutterBottom>
    Evaluation Form
  </Typography>
  <Box sx={{ '& > :not(style)': { marginBottom: 2 } }}>
    <TextField label="Examination Marks" {...register('Examination Marks')} defaultValue={semester} fullWidth type="number"/>
    <TextField label="Class Progress Marks" {...register('Class Progress Marks')} defaultValue={year} fullWidth type="number"/>
    <TextField label="Quiz Marks" {...register('Quiz Marks')} defaultValue={course} fullWidth type="number"/>
    <TextField label="Attendace Marks" {...register('Attendace Marks')} defaultValue={category} fullWidth type="number"/>
    <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
      Submit
    </Button>
  </Box>
</Container>
    </div>
    );
};

export default AdminEvaluationForm;