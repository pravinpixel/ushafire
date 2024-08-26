import React, { useState } from 'react';

import { Chip } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { GridColDefCustom } from 'helper/types/GlobalTypes';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { LoanReturnFormType, LoanReturnListResponse } from 'helper/types/sales-crm-system/LoanReturnType';

import { SalesReturnListKey, useSalesReturnDelete } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: LoanReturnListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};
const LoanReturnListTable = ({ data, isLoading, params, setParams, redirectLink, permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const { mutateAsync: deleteApi } = useSalesReturnDelete();

  const columns: readonly GridColDefCustom<LoanReturnFormType>[] = [
    { field: 'loanNumber', headerName: 'Loan No', minWidth: 130, flex: 1 },
    { field: 'loanDate', headerName: 'Loan Date', valueGetter: ({ value }) => fDate(value), minWidth: 180, flex: 1 },
    { field: 'quotationNumber', headerName: 'Quotation No', minWidth: 130, flex: 1 },
    { field: 'quotationDate', headerName: 'Quotation Date', valueGetter: ({ value }) => fDate(value), minWidth: 180, flex: 1 },
    { field: 'customerId', headerName: 'Customers', renderCell: ({ row }) => row?.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'salePersonId', headerName: 'Sale Person', renderCell: ({ row }) => row?.salePersonId?.label, minWidth: 160, flex: 1 },
    { field: 'dateOfReturn', headerName: 'Date of Return', valueGetter: ({ value }) => fDate(value), minWidth: 180, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.status)} label={row?.status} />,
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 50,
      flex: 1,
      renderCell: ({ row }) => (
        <MoreVertIconButton
          menuItem={[
            {
              label: 'Return',
              action: 'edit',
              access: permission.edit.access,
              path: permission.edit.path,
            },
          ]}
          id={row._id}
          refetchUrl={SalesReturnListKey}
          label={'SalesReturn'}
          deleteApi={deleteApi}
        />
      ),
    },
  ];
  return (
    <>
      <TableTopBar
        enabled={{
          add: false,
          // essentialFilter: [],
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

export default LoanReturnListTable;
