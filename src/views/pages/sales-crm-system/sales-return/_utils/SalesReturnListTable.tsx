import React, { useState } from 'react';

import { Typography } from '@mui/material';
import {  GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { ModuleType } from 'helper/GlobalHelper';
import { GridColDefCustom } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { SalesReturnFormType, SalesReturnListResponse } from 'helper/types/sales-crm-system/SalesReturnTypes';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';

type Props = {
  data: SalesReturnListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};
const SalesReturnListTable = ({ data, isLoading, params, setParams, redirectLink, permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const columns: readonly GridColDefCustom<SalesReturnFormType>[] = [
    { field: 'returnNo', headerName: 'Return No', minWidth: 180, flex: 1 },
    { field: 'returnDate', headerName: 'Return Date', minWidth: 180, flex: 1, renderCell : ({ row }) => <Typography variant="inherit">{fDate(row?.returnDate)}</Typography>},
    { field: 'salesInvoiceId', headerName: 'Sales Invoice No', renderCell: ({ row }) => row?.salesInvoiceId?.label, minWidth: 160, flex: 1 },
    { field: 'customerId', headerName: 'Customers', renderCell: ({ row }) => row?.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'returnReason', headerName: 'Return Reason', minWidth: 180, flex: 1 },
  ];
  return (
    <>
      <TableTopBar
        enabled={{
          add: permission?.add?.access,
          essentialFilter: [{
            essentialName  : "SalesReturn-filter-customer",
            label : "Customer"
          }],
        }}
        addPath={redirectLink}
        buttonLabel={permission.name}
        totalCount={data?.total}
        params={params}
        setParams={setParams}
        ids={ids}
        filterCount={data?.filterCount}
      />
      <DataTable
        params={params}
        setParams={setParams}
        dataGridProps={{
          loading: isLoading,
          checkboxSelection: true,
          isRowSelectable: () => true,
          onRowSelectionModelChange: (newRowSelectionModel) => {
            setIds(newRowSelectionModel);
          },
        }}
        row={data?.list}
        columns={columns}
        total={data?.totalPages}
      />
    </>
  );
};

export default SalesReturnListTable;
