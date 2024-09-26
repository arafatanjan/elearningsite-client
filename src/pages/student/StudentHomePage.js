import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import Box from '@mui/material/Box';
import AllRights from '../../components/AllRights';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const StudentHomePage = () => {
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    
    const { subjectsList } = useSelector((state) => state.sclass);
    const [quizes, setQuizes] = useState([])
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const navigate = useNavigate()

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        // Define an async function to use with useEffect
        const fetchData = async () => {
            try {
                // Make a GET request using Axios
                const response = await axios.get('https://elearningsite-server.onrender.com/questions');
                
                // Extract the data from the response
                const data = response.data;
    
                // Update the state with the fetched data
                setQuizes(data);
                //  console.log(data);
            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', error);
            }
        };
    
        // Call the async function
        fetchData();
    }, []);
    const numberOfQuizzes = quizes.length;


    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const handleSubjects = () => {  
        navigate('/Student/subjects');
    };
    const handleQuizes = () => {  
        navigate('/Student/quiz');
    };
    const handleAttendance = () => {  
        navigate('/Student/attendance');
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper onMouseUp={handleSubjects}>
                            <img src={Subject} alt="Subjects" />
                            <Title>
                                Total Subjects
                            </Title>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper onMouseUp={handleQuizes}>
                            <img src={Assignment} alt="Assignments" />
                            <Title>
                                Total Quizes
                            </Title>
                            <Data start={0} end={numberOfQuizzes} duration={4} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                    
                        <ChartContainer onMouseUp={handleAttendance}>
                        
                            {
                                response ?
                                    <Typography variant="h6">No Attendance Found</Typography>
                                    :
                                    <>
                                        {loading
                                            ? (
                                                <Typography variant="h6">Loading...</Typography>
                                            )
                                            :
                                            <>
                                                {
                                                    subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                        <>
      
                                                         
                                                         
                                                         <CustomPieChart data={chartData} />
                                                        
                                                       
                                                    </>
                                                    )
                                                        :
                                                        <Typography variant="h6">No Attendance Found</Typography>
                                                }
                                            </>
                                        }
                                    </>
                            }
                             
                        </ChartContainer>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
                
            </Container>
          
            
        </>
        
    )
}

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;



const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;





export default StudentHomePage