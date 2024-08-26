import { ReactNode } from 'react';

import { Box, BoxProps, TableCell } from '@mui/material';

type Props = BoxProps & {
  children: ReactNode;
};

const TableItem = ({ children, ...props }: Props) => {
  return (
    <TableCell>
      <Box width={'100%'} {...props}>
        {children}
      </Box>
    </TableCell>
  );
};

export default TableItem;
