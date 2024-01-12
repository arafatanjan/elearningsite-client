import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const QuizCard = ({ quiz }) => {
  const { properties } = quiz;
  const navigate = useNavigate();

  const handleClick = () => {
    const url = `/Student/quiz/${properties.semester}/${properties.year}/${properties.course}/${properties.category}`;
    navigate(url);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Box mb={2}>
        <Card elevation={3} style={{ backgroundColor: '#f0f8ff', maxWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {properties.semester} {properties.year}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {properties.course}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {properties.category}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to={`/Student/quiz/${properties.semester}/${properties.year}/${properties.course}/${properties.category}`}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Start Quiz
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default QuizCard;
