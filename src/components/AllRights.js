import React from 'react';
import Box from '@mui/material/Box';

const AllRights = () => {
  // ... (your existing component code)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        //minHeight: '100vh', // Ensure the content takes at least the full viewport height
      }}
    >
      {/* ... (your existing component content) */}

      <Box
        sx={{
          marginTop: '0px', // Push the content to the top
          backgroundColor: '#f5f5f5', // Add a background color if needed
          padding: '0px', // Add padding for better visibility
          textAlign: 'center', // Center the text
        }}
      >
        All rights reserved@arafatanjan
      </Box>
    </Box>
  );
};

export default AllRights;
