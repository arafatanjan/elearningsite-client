import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { Link } from "react-router-dom";
import AllRights from "../components/AllRights";
import backgroundImage from '../../src/assets/backg.jpg';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <>
    
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <StyledTypography>
                  Admin
                </StyledTypography>
                Login as an administrator to access the dashboard to manage app data.
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Teacher")}>
                <Box mb={2}>
                  <School fontSize="large" />
                </Box>
                <StyledTypography>
                 Teacher
                </StyledTypography>
                Login as a teacher to create courses, assignments, and track student progress.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Student")}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>
                Student
                </StyledTypography>
                Login as a student to explore course materials and assignments.
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div>
              <StyledPaperText elevation={3}>
                {/* <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box> */}
                <StyledTypography>
                <p>ID: admin@uiu.com</p>
                <p>Password: 123456</p>
                </StyledTypography>
               <p><span>=</span> Admin can create classes, subjects, teachers, students.</p>
               <p><span>=</span> Admin can assign teachers and students to subjects and particular classes.</p>
               <p><span>=</span>Admin can circulate notices.</p>
               <p><span>=</span>Admin can make evaluation setup form.</p>
              </StyledPaperText>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div>
          <StyledPaperText elevation={3}>
                {/* <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box> */}
                <StyledTypography>
                <p>ID: fazlerabbi@uiu.com</p>
                <p>Password: 123456</p>
                </StyledTypography>
                <br/>
               <p><span>=</span> Teachers can take attendance and provide examination and class progress marks.</p>
               <p><span>=</span> Teachers can upload study materials i.e video tutorials, the questionnaires, set quizzes  </p>
              
              </StyledPaperText>
              </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <div>
          <StyledPaperText elevation={3}>
                {/* <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box> */}
                <StyledTypography>
                <p>Name: Arafat Anjan</p>
                <p>Roll: 1</p>
                <p>Password: 123456</p>
                </StyledTypography>
               <p><span>=</span>Students can attend quizzes, access to notices, video lessons, questionnaires, result card and automatic feedback. </p>
               <p><span>=</span>Students can view attendance and performance comparison in graph format.</p>
               
              </StyledPaperText>
              </div>
          </Grid>
        </Grid>
        <br />
       <div style={{ textAlign: 'center', margin: '20px' }}>
        <StyledText>
          
        Want to start new?{" "}
        <Link to="/Adminregister" style={{ color: "#550080" }}>
          Sign up
        </Link>
        
      </StyledText>
      </div>
     
      
      </Container>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
    
    </>
  );
};

export default ChooseUser;

//height: 85vh;

const StyledContainer = styled.div`
  // background: linear-gradient(to bottom, #d5cae3, #d7bef7);

  margin-left: -30px ;
  display: flex;
  justify-content: center;
  padding: 6rem 2rem 5rem 2rem;
  background: url(${backgroundImage}); 
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;

  &:hover {
    background-color: #2c2c6c;
    color: white;
  }
`;

const StyledPaperText = styled(Paper)`
  padding: 20px;
  text-align: left;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.9);
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;

const StyledText = styled.span`
  background-color: #f5f5f5;
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;