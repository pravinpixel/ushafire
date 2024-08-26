import { ReactNode } from 'react';

import { Table, SxProps, TableProps, TableContainer } from '@mui/material';

import ScrollBar from 'views/components/scroll-bar';

type Props = TableProps & { children: ReactNode; scrollSx?: SxProps };

const TableWrapper = ({ children, scrollSx, ...props }: Props) => {
  return (
    <TableContainer
      sx={{
        overflow: 'hidden',
        width: '100%',
        boxShadow: ({ shadows }) => shadows[1],
        borderRadius: ({ shape }) => shape.borderRadius * 0.15,
      }}
    >
      <ScrollBar
        sx={{ width: '100%', overflowY: 'hidden', ...scrollSx }}
        other={{
          autoHide: false,
        }}
      >
        <Table {...props}>{children}</Table>
      </ScrollBar>
    </TableContainer>
  );
};

export default TableWrapper;
