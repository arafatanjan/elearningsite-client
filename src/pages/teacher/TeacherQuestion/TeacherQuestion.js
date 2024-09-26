import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@mui/material";
//import { useDispatch, useSelector } from 'react-redux';
//import { getUserDetails } from '../../../redux/userRelated/userHandle';
import styled from "styled-components";
//import { useHistory } from 'react-router-dom'; // Import useHistory hook for navigation
//import CountUp from 'react-countup';
//import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import Box from "@mui/material/Box";
import AllRights from "../../../components/AllRights";

const TeacherQuestion = () => {
  const navigate = useNavigate();

  const handleQsFormClick = () => {
    navigate("/Teacher/questionform");
  };
  const handleQsRepoClick = () => {
    navigate("");
  };

  return (
    <div>
      <>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Question Form Card */}
            <Grid item xs={12} md={3} lg={3}>
              <StyledPaper
                onMouseUp={handleQsFormClick}
                sx={{
                  backgroundColor: "#d0d2f2",
                  paddingTop: '3rem', 
                }}
              >
                <Title>Question Form</Title>
              </StyledPaper>
            </Grid>
            
            <Grid item xs={12} md={3} lg={3} >
              <StyledPaper onClick={handleQsRepoClick} sx={{
                display: 'flex',
                  backgroundColor: "#d0d2f2",
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingTop: '3rem', 
                }}>
                <Title>Repository</Title>
              </StyledPaper>
            </Grid>
          </Grid>
        </Container>
      </>
    </div>
  );
};

const StyledPaper = styled(Paper)({
  padding: "16px",
  height: "10rem",
  textAlign: "center",
  justifyContent: "center",
  color: "#1c1919",
  cursor: "pointer",
  backgroundColor: "#d2f7f4",
  transition: "transform 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#aeb1f5",
    transform: "scale(1.05)",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow effect
  },
  "&:active": {
    transform: "scale(0.98)", // Shrinks the card when clicked
  },
});

const Title = styled("h2")({
  fontSize: "1.2rem",
  color: "#26423f",
  marginBottom: "16px",
});

export default TeacherQuestion;
