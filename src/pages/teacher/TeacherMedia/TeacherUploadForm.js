import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';

const TeacherUploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let formData = new FormData();
      for (let key in videos) {
        formData.append('videos', videos[key]);
      }

      formData.append('name', name);

      const response = await axios.post(`https://elearningsite-server.onrender.com/api/v1/media/create`, formData);

      getAllMedias();
      alert('Submitted successfully');
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error happened:', error);
      setError('Error happened! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Upload Media
      </Typography>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
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
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default TeacherUploadForm;
