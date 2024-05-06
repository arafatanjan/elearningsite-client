import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import { BottomNavigation, BottomNavigationAction, Paper, Table, TableBody, TableHead} from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { useDispatch, useSelector } from 'react-redux';

const QuestionForm = () => {
    const { userDetails, currentUser, response } = useSelector((state) => state.user);
    const [name, setName] = useState('');

  const [course, setCourse] = useState('');
  const [category, setCategory] = useState('');
  //const [questions, setQuestions] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [medias, setMedias] = useState([]);
  //console.log('userDetails', userDetails);
  console.log('currentUser', currentUser.teachSubject._id);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        let formData = new FormData();
      for (let key in pdfs) {
        formData.append('pdfs', pdfs[key]);
      }  

      //formData.append('pdf', questions);
      formData.append('name', name);
      formData.append('course', course); 
      formData.append('category', category); 
      formData.append('teachSubjectId', currentUser.teachSubject._id); 
      console.log('formData', formData);
        const response = await axios.post(`https://elearningsite-server.onrender.com/api/v1/question/create`, formData);
  
        //getAllMedias();
      alert('Submitted successfully');
      console.log('Server response:', response.data);
    } 
    catch (error) {
      console.error('Error happened:', error);
      setError('Error happened! Please try again.');
    } finally {
      setLoading(false);
    }
  };

    return (
        <div>         
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Upload Questions
      </Typography>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Course"
          variant="outlined"
          margin="normal"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <TextField
          fullWidth
          label="Category"
          variant="outlined"
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          fullWidth
          label="Tittle"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          type="file"
          label="Upload Videos"
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CloudUploadIcon />
              </InputAdornment>
            ),
          }}
          accept=".pdf"
          onChange={(e) => setPdfs(e.target.files)}
        />

        {loading && <LinearProgress style={{ margin: '16px 0' }} />}
        {error && <Typography variant="body2" color="error">{error}</Typography>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          style={{ marginTop: '16px' }}
        >
          Submitt
        </Button>
      </form>
      </Container>
      
        </div>
    );
};

export default QuestionForm;