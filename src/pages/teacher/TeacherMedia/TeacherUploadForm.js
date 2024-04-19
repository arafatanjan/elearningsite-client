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

const TeacherUploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [course, setCourse] = useState('');
  const [category, setCategory] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [medias, setMedias] = useState([]);
  console.log('o');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let formData = new FormData();
      for (let key in videos) {
        formData.append('videos', videos[key]);
      }     

    formData.append('name', name);
    formData.append('course', course); 
    formData.append('category', category); 

      const response = await axios.post(`https://elearningsite-server.onrender.com/api/v1/media/create`, formData);

      getAllMedias();
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

  useEffect(() => {
    //console.log('o') 
    AllMedias();
  }, []);

  const AllMedias = () => {
    axios
      .get(`https://elearningsite-server.onrender.com/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };
  console.log(medias) 

  return (
    <>
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Upload Media
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
          accept=".mp4, .mkv"
          onChange={(e) => setVideos(e.target.files)}
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
      <br/>
      <br/>
      <br/>
      <>
      <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Uploaded Videos
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Course</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Tittle</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {medias.map((result, index) => {
                            if (!result.name) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index}>
                                    
                                    <StyledTableCell>{result.course}</StyledTableCell>
                                    <StyledTableCell>{result.category}</StyledTableCell>
                                    <StyledTableCell>{result.name}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                </Container>
            </>
    </>
  );
};

export default TeacherUploadForm;
