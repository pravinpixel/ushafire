import React from 'react';

import { Box, Tabs, TabsOwnProps } from '@mui/material';

type Props = TabsOwnProps & {
  children: React.ReactNode;
  value: string | number;
  handleChange: (_event: React.SyntheticEvent, newValue: unknown) => void;
};

const TabList = ({ children, handleChange, value, ...props }: Props) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="product detail tabs" variant="scrollable" scrollButtons="auto" {...props}>
        {children}
      </Tabs>
    </Box>
  );
};

export default TabList;
