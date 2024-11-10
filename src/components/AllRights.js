import React from 'react';
import Box from '@mui/material/Box';

const AllRights = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        //minHeight: '100vh', // Ensure the content takes at least the full viewport height
      }}
    >

      <Box
        sx={{
          margin: '0px', 
          backgroundColor: '#f5f5f5', 
          padding: '0px', 
          textAlign: 'center', 
        }}
      >
        All rights reserved@arafatanjan
      </Box>
    </Box>
  );
};

export default AllRights;
