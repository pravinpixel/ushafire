import React, { ReactNode } from 'react';

import { TableRow, TableRowProps } from '@mui/material';

type Props = TableRowProps & {
  children: ReactNode;
};

const TableRows = ({ children, ...props }: Props) => {
  return (
    <React.Fragment>
      <TableRow {...props}>{children}</TableRow>;
    </React.Fragment>
  );
};

export default TableRows;
