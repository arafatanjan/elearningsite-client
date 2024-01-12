import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const UploadsList = ({ medias}) => {
  const [watchedTime, setWatchedTime] = useState(0);
  const [videoAlerts, setVideoAlerts] = useState({});
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [currentVideoIds, setCurrentVideoIds] = useState({});
  const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
  const [playCount, setPlayCount] = useState(0);

  const handleProgress = (progress, currentVideoId) => {
    const { loadedSeconds, playedSeconds } = progress;
    const studentName= currentUser.name;
    console.log(studentName);
    // const [currentVideoId, setCurrentVideoId] = useState(null);


    const constantValue = loadedSeconds === playedSeconds ? 1 : 0;

    //const hasAlertShown = localStorage.getItem(`alert_${currentVideoId}`);

    if (constantValue === 1 && !currentVideoIds[currentVideoId]) {
      window.alert(`Congratulations! You have completed video`);

       // Add the currentVideoId to the object
       setCurrentVideoIds((prevCurrentVideoIds) => ({
        ...prevCurrentVideoIds,
        [currentVideoId]: true,
      }));

      setVideoAlerts((prevVideoAlerts) => ({
        ...prevVideoAlerts,
        [currentVideoId]: true,
      }));
      sendPlayCountToBackend(currentVideoId, studentName);
}

    // Perform additional actions based on the progress
    //console.log('Constant Value:', constantValue);
    //console.log('Total watched time:', playedSeconds);

    // Update watchedTime
    setWatchedTime(playedSeconds);
  };

  useEffect(() => {
    // Reset alertShown when a new video is started
    setVideoAlerts((prevVideoAlerts) => ({
      ...prevVideoAlerts,
      [currentVideoId]: false,
    }));
  }, [currentVideoId]);


  const handleVideoPlay = () => {
    // Increment play count when the video is played
    setPlayCount((prevPlayCount) => prevPlayCount + 1);
  };

  // useEffect(() => {
  //   // You might want to send playCount to the backend here
  //   sendPlayCountToBackend();
  // }, [playCount]);

  const sendPlayCountToBackend = (videoId, studentName) => {
    // Assume you have an API endpoint on your Node.js backend to handle play count updates
    fetch('https://elearningsite-server.onrender.com//updatePlayCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId, playCount, studentName }),
    })
      .then(response => response.json())
      .then(data => console.log('Play count sent to backend:', data))
      .catch(error => console.error('Error sending play count to backend:', error));
  };

  // Perform additional actions based on the progress
  //console.log('Constant Value:', constantValue);

  const formatTime = (seconds) => {
    const pad = (num) => {
      return num < 10 ? '0' + num : num;
    };

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };
  return (
    <Grid container spacing={2}>
      {medias &&
        medias.map((media) => (
          <Grid item xs={12} key={media._id}>
            <Paper elevation={3} style={{ backgroundColor: '#f0f8ff', padding: '16px' }}>
              <Typography variant="h5" gutterBottom>
                {media.name}
              </Typography>
              {media.videos.map((video) => {
                const videoId = `${media._id}`;
                return (
                  <div key={videoId} style={{ marginBottom: '16px' }}>
                    <ReactPlayer
                      url={`https://elearningsite-server.onrender.com${video}`}
                      controls={true}
                      width="100%"
                      onProgress={(progress) => {
                        setCurrentVideoId(videoId);
                        handleProgress(progress, videoId);
                      }}
                      onPlay={handleVideoPlay}
                    />
                  </div>
                );
              })}
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default UploadsList;
