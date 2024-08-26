import React from 'react';

import { Box, BoxProps } from '@mui/material';

type Props = BoxProps & {
  children: React.ReactNode;
};

const TabContainer = ({ children, ...props }: Props) => {
  return (
    <Box sx={{ width: '100%' }} {...props}>
      {children}
    </Box>
  );
};

export default TabContainer;
