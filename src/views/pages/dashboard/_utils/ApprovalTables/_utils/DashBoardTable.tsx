import { gridClasses } from '@mui/x-data-grid';
import { Box, Stack, Typography } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import DataTable from 'views/components/table-componet/DataTable';

// ---------------------------------------------------------------------------

type Props = {
  title: string;
  subTitle?: string;
  action?: React.ReactNode;
  data?: readonly GridValidRowModel[];
  columns: readonly GridColDef[];
};

const DashBoardTable = ({ data = [], title, action, columns, subTitle }: Props) => {
  return (
    <Box bgcolor={({ palette }) => palette.common.white} p={2} borderRadius={'0.75rem'}>
      <Stack mb={0} direction={'row'} gap={1} alignItems={'center'} m={1}>
        <Box>
          <Typography variant="h4">
            {title}
            {' - Pending Approval'}
          </Typography>
          <Typography variant="subtitle2" color={({ palette }) => palette.grey[400]}>
            {subTitle}
          </Typography>
        </Box>
        {action && action}
      </Stack>
      <DataTable
        dataGridProps={{
          hideFooter: true,
          sx: {
            [`& .${gridClasses.main}`]: {
              boxShadow: 'none',
            },
            [`& .${gridClasses.virtualScroller}`]: {
              overflow: data?.length === 0 ? 'hidden' : 'auto',
            },
          },
        }}
        minSize={10}
        row={data}
        columns={columns}
      />
    </Box>
  );
};

export default DashBoardTable;
