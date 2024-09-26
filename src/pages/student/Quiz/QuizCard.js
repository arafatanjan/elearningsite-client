import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getAllSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import './QuizCard.css'


const QuizCard = ({quiz}) => {
  //const { properties } = quiz;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response, error }  = useSelector((state) => state.user);
  const { subjectDetails, subjectsList } = useSelector((state) => state.sclass);
  const [subjectID, setsubjectID] = useState();
  const [subjectName, setSubjectName] = useState('');
  const [propertiess, setPropertiess] = useState('');
  
  console.log(quiz)
  //console.log(currentUser)

  useEffect(() => {
    const fetchSubjectNames = async () => {
      const subjectID = currentUser.school._id;
      try {
        await dispatch(getAllSubjectDetails(subjectID, 'AllSubjects'));
      } catch (error) {
        console.error(`Error fetching subject details for ${subjectID}:`, error);
       
      }
    };

    fetchSubjectNames();
  }, [currentUser.school._id]);
  

  // if (quiz?.properties?.class?._id === currentUser.sclassName._id) {
  
  //   const updatedQuiz = quiz;
  //   const { properties } = updatedQuiz;
  //   setPropertiess(properties)
  
  // }

  useEffect(() => {
    if (quiz?.properties?.class?._id === currentUser?.sclassName?._id) {
      const { properties } = quiz;
      setPropertiess(properties);
      //console.log(propertiess)
      
    }
  }, [quiz, currentUser]);

  //console.log(propertiess.course);
  //console.log(subjectsList)

  useEffect(() => {
    if (subjectsList && subjectsList.length > 0 && propertiess.course) {
      const matchedSubject = subjectsList.find(subject => subject._id === propertiess.course);
      if (matchedSubject) {
        setSubjectName(matchedSubject.subName);
      }
    }
  }, [subjectsList, propertiess.course, currentUser]);
  
  // Render
  const matchedSubject = subjectsList.find(subject => subject._id === propertiess.course);
  
  

  if (error) {
    console.log(error);
  }
  

  const handleClick = () => {
    const url = `/Student/quiz/${propertiess.course}/${propertiess.category}`;
    navigate(url);
  };


  return (
    <>
    {matchedSubject ? (
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Box mb={2} display="flex" justifyContent="center" width="100%">
          <Card
            elevation={6}
            style={{
              backgroundColor: '#fafafa',
              width: '80%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              borderRadius: '15px',
              overflow: 'hidden',
            }}
            className="animated-card"
          >
            <CardContent>
              <Typography variant="subtitle1" color="textPrimary" align="center" fontWeight="600" gutterBottom>
                <span style={{ color: '#6d4c41', fontWeight: 'bold' }}>Course: </span>{subjectName}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" align="center" fontWeight="700" gutterBottom>
                <span style={{ color: '#6d4c41', fontWeight: 'bold' }}>Category: </span>{propertiess.category}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button
                component={Link}
                to={`/Student/quiz/${propertiess.course}/${propertiess.category}`}
                variant="contained"
                color="secondary"
                className="start-button"
                style={{ transition: 'background-color 0.3s ease' }}
              >
                Start
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    ) : (
      <Typography variant="h6" align="center" color="textSecondary">
        
      </Typography>
    )}
  </>
  );
};

export default QuizCard;
