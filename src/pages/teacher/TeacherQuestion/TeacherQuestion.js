import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material'
//import { useDispatch, useSelector } from 'react-redux';
//import { getUserDetails } from '../../../redux/userRelated/userHandle';
import styled from 'styled-components';
//import { useHistory } from 'react-router-dom'; // Import useHistory hook for navigation
//import CountUp from 'react-countup';
//import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import Box from '@mui/material/Box';
import AllRights from '../../../components/AllRights';

const TeacherQuestion = () => {
    const navigate = useNavigate()

    const handleQsFormClick = () => {
        
        navigate('/Teacher/questionform');
    };
    const handleQsRepoClick = () => {
        
        navigate('');
    };

    return (
        <div>
             <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper onMouseUp={handleQsFormClick}>   
                            <Title>
                                Question Form
                            </Title>  
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper onClick={handleQsRepoClick}> 
                            <Title>
                                 Repository
                            </Title> 
                        </StyledPaper>
                    </Grid>
                    </Grid>
                    </Container>
          
            
        </>
        </div>
    );
};

const StyledPaper = styled(Paper)`
    && {
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 200px;
        background-color: #e0f2fe; // Set background color to blue
        cursor: pointer; // Change cursor to hand sign
    }
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

export default TeacherQuestion;