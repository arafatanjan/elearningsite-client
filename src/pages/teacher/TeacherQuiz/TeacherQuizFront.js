import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; // Import useHistory hook for navigation
import CountUp from 'react-countup';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import AllRights from '../../../components/AllRights';

const TeacherQuizFront = () => {
    const navigate = useNavigate()
    

    const handleQuizFormClick = () => {
        // Navigate to the desired link when "Total Subjects" is clicked
        navigate('/Teacher/quizform');
    };
    const handleQuizResultClick = () => {
        // Navigate to the desired link when "Total Subjects" is clicked
        navigate('/Teacher/quiz/test/resulttable');
    };

    return (
        <>
             <Container
         maxWidth={false}  // Disable default maxWidth behavior
         sx={{
            width: '100%',      
            height: '80vh',    
            m: 0,                
            pb: 20,                
            display: 'flex',     
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Grid container spacing={8} sx={{
            justifyContent: 'center',
            
         }}>
            {/* Quiz Form */}
            <Grid item xs={12} md={3} lg={3}>
   <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
   >
      <StyledPaper onMouseUp={handleQuizFormClick}>
         <Title>Quiz Form</Title>
      </StyledPaper>
   </motion.div>
</Grid>

            {/* Quiz Result */}
            <Grid item xs={12} md={3} lg={3}>
               <StyledPaper onClick={handleQuizResultClick}>
                  <Title>Quiz Result</Title>
               </StyledPaper>
            </Grid>
         </Grid>
      </Container>
            
            
        </>
    );
};

// StyledPaper: Add vivid colors, shadows, and animation effects
const StyledPaper = styled(Paper)({
    padding: '24px',
    height: '100px',
    textAlign: 'center',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
       transform: 'translateY(-5px)',  // Slight lift on hover
       boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
       background: 'linear-gradient(135deg, #7e57c2, #42a5f5)', // Gradient swap
    },
 });
 
 // Title: Style for the titles inside the papers
 const Title = styled(Typography)({
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ffffff',
 });


export default TeacherQuizFront;