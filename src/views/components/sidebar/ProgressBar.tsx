import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { fontWeightBold } from '../../../utils/theme/typography';

const CircularProgressBar: React.FC<{ progressValue: number }> = ({ progressValue }) => {
  const circleSize = 60;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={100}
        thickness={5}
        size={circleSize} 
        sx={{
          color: 'rgba(255, 255, 255, 1)',
          opacity:'20%'
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progressValue}
        size={circleSize} 
        thickness={5}
        sx={{
          position: 'absolute',
          left: 0,
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant='f16' sx={{fontWeight:fontWeightBold,color:'rgba(255, 255, 255, 1)'}}>
          {`${Math.round(progressValue)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressBar;
