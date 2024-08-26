import React, { useCallback } from 'react';

import { DataGrid, GridColDef, gridClasses, DataGridProps, GridValidRowModel } from '@mui/x-data-grid';
import { ExpandMoreOutlined, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Box, Stack, Select, MenuItem, useTheme, BoxProps, Pagination, Typography, PaginationItem } from '@mui/material';

import { PaginationInterFace } from 'helper/types/TableTypes';

import { CustomNoRowsOverlay } from './NoDataRow';

type AllTablesProps = BoxProps & {
  row?: readonly GridValidRowModel[];
  columns: readonly GridColDef[];
  dataGridProps?: Omit<DataGridProps, 'columns' | 'rows'>;
  params?: PaginationInterFace;
  setParams?: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  total?: number;
  minSize?: number;
  fixedHeight?: boolean;
};

function CustomPagination({
  pageSize,
  params,
  total,
  handlePageChange,
}: {
  pageSize: number[];
  total: number;
  params?: PaginationInterFace;
  handlePageChange: (e: PaginationInterFace) => void;
}) {
  const theme = useTheme();
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} px={2} mt={3}>
      <Stack gap={2} direction={'row'} alignItems={'center'}>
        <Typography variant="subtitle3">Showing</Typography>
        <Select
          size="small"
          IconComponent={(props) => <ExpandMoreOutlined {...props} />}
          value={params?.pageSize}
          onChange={(e) => {
            handlePageChange({
              page: 0,
              pageSize: (e.target.value as number) || params?.pageSize || 20,
            });
          }}
          sx={{
            width: '4.7rem',
            minHeight: '2.5rem',
            background: theme.palette.common.white,
          }}
        >
          {pageSize.map((data, index) => (
            <MenuItem key={index} value={data}>
              {data}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="subtitle3" color={theme.palette.grey[600]}>
          Items per page
        </Typography>
      </Stack>
      <Pagination
        color="primary"
        variant="text"
        shape="rounded"
        page={(params?.page as number) + 1}
        count={total}
        showFirstButton
        showLastButton
        renderItem={(item) =>
          item.type !== 'page' ? (
            <PaginationItem
              slots={{
                first: KeyboardDoubleArrowLeft,
                last: KeyboardDoubleArrowRight,
              }}
              {...item}
            />
          ) : (
            item.selected && (
              <PaginationItem
                key={item.page}
                slots={{
                  first: KeyboardDoubleArrowLeft,
                  last: KeyboardDoubleArrowRight,
                }}
                sx={{
                  background: theme.palette.common.white,
                  color: theme.palette.common.black,
                }}
                variant="outlined"
                shape={item.shape}
                size={item.size}
                type={item.type}
                page={item.page}
              />
            )
          )
        }
        onChange={(_event: React.ChangeEvent<unknown>, value: number) => handlePageChange({ page: value - 1, pageSize: params?.pageSize || 20 })}
      />
    </Stack>
  );
}

const DataTable = ({
  minSize = 95,
  row = [],
  columns,
  dataGridProps,
  params,
  setParams,
  total = row.length,
  fixedHeight = true,
  ...props
}: AllTablesProps) => {
  const handlePagenation = useCallback(
    (pagenationData: PaginationInterFace) => {
      setParams &&
        setParams((state) => ({
          ...state,
          ...pagenationData,
        }));
    },
    [setParams]
  );

  return (
    <Box sx={{ [fixedHeight ? 'height' : 'minHeight']: `calc(${minSize}vh - 220px)`, minHeight: '20rem', width: '100%' }} {...props}>
      <DataGrid
        rows={row}
        columns={columns}
        rowHeight={50}
        slots={{
          // pagination: CustomPagination,
          footer: () =>
            row?.length >= 1 && <CustomPagination params={params} handlePageChange={handlePagenation} pageSize={[10, 20, 30, 100]} total={total} />,
          noRowsOverlay: CustomNoRowsOverlay,
          // loadingOverlay: LoaderCompount,
        }}
        paginationMode="server"
        paginationModel={params}
        // onPaginationModelChange={({ page, pageSize }) =>
        //     handlePagenation({
        //         page,
        //         pageSize,
        //     })
        // }
        // onRowModesModelChange={({}) => handlePagenation()}
        onSortModelChange={(sortData) => {
          const { field, sort = null } = sortData[0];
          if (sort !== undefined && sort !== null) {
            handlePagenation({
              field: field,
              sort: sort,
              page: params?.page ?? 0,
              pageSize: params?.pageSize ?? 20,
            });
          } else {
            // Handle the case when sort is undefined or null
            handlePagenation({
              field: field,
              sort: undefined,
              page: params?.page ?? 0,
              pageSize: params?.pageSize ?? 20,
            }); // or provide a default sort value
          }
        }}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelection
        getRowId={(row) => row?._id}
        hideFooterSelectedRowCount
        disableColumnMenu
        // loading={true}
        sx={{
          [`& .${gridClasses.virtualScroller}`]: {
            overflow: dataGridProps?.loading || row.length === 0 ? 'hidden' : 'auto',
          },
        }}
        // -------- for disable the selectd rows--------//
        // isRowSelectable={(params: GridRowParams) => params.row.disabled }
        // -------hide pagination by this-------//
        // hideFooterPagination
        {...dataGridProps}
      />
    </Box>
  );
};
export default DataTable;
