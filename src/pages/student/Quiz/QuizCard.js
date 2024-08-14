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


const QuizCard = ({quiz}) => {
  //const { properties } = quiz;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response, error }  = useSelector((state) => state.user);
  const { subjectDetails, subjectsList } = useSelector((state) => state.sclass);
  const [subjectID, setsubjectID] = useState();
  const [subjectName, setSubjectName] = useState('');
  const [propertiess, setPropertiess] = useState('');
  
  //console.log(quiz)
  
  
  

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
      console.log(quiz)
      
    }
  }, [quiz, currentUser]);

  //console.log(propertiess.course);
  console.log(subjectsList)

  useEffect(() => {
    if (subjectsList && subjectsList.length > 0) {
      
      const matchedSubject = subjectsList.find(subject => subject._id === propertiess.course);
      if (matchedSubject) {
        setSubjectName(matchedSubject.subName); // Set subjectName if a match is found
      }
    }
  }, [currentUser, subjectsList]);

  
  

  if (error) {
    console.log(error);
  }
  

  const handleClick = () => {
    const url = `/Student/quiz/${propertiess.course}/${propertiess.category}`;
    navigate(url);
  };


  return (
    <Grid item xs={12} sm={6} md={3} lg={3}> 
      <Box mb={2} display="flex" justifyContent="center" width="100%"> {/* Center items horizontally */}
        <Card elevation={4} style={{ backgroundColor: '#f5fcfc', width: '80%' }}> {/* Adjust maxWidth to control card width */}
          <CardContent>
            <Typography variant="subtitle1" color="textSecondary" align="center" fontWeight="600" gutterBottom>
              {subjectName}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center" fontWeight="700" gutterBottom >
              {propertiess.category}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}> {/* Center the button within the card */}
            <Button
              component={Link}
              to={`/Student/quiz/${propertiess.course}/${propertiess.category}`}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Start
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default QuizCard;
