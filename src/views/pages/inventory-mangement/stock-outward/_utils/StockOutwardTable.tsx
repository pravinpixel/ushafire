import { useState } from 'react';

import { Chip, Typography } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { StockOutwardTypeForm, StockOutwardListResponse } from 'helper/types/inventory-management/StockOutwardType';

import { StockOutwardListsKey } from 'store/hooks/InventoryManagementHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: StockOutwardListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  permission: ModuleType;
};

export const StockOutwardTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const WithdrawPath = permission.addMore?.find((value) => value.fend_component === 'withdraw-quantity')?.path ?? '/';
  const columns: readonly GridColDef<StockOutwardTypeForm>[] = [
    { field: 'stockOutwardNumber', headerName: 'Stock Outward No', minWidth: 150, flex: 1 },
    {
      field: 'stockOutwardDate',
      headerName: 'Outward Date',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row.stockOutwardDate)}</Typography>,
      minWidth: 220,
      flex: 1,
    },
    { field: 'customerId', headerName: 'Customer', renderCell: ({ row }) => row.customerId?.customerName, minWidth: 220, flex: 1 },
    { field: 'modeOfTransfer', headerName: 'Mode of Transfer', renderCell: ({ row }) => row?.modeOfTransfer?.name, minWidth: 220, flex: 1 },
    // { field: 'finalTotal', headerName: 'Total', renderCell: ({ row }) => fCurrency(row?.finalTotal), minWidth: 220, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.status)} label={row?.status} />,
      minWidth: 110,
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
          id={row._id}
          menuItem={[
            {
              label: 'Edit',
              access: permission.edit.access,
              action: 'edit',
              path: permission.edit.path,
            },
            {
              label: 'Withdraw Quantity',
              access: permission.view.access,
              action: 'pathById',
              path: WithdrawPath,
            },
          ]}
          refetchUrl={StockOutwardListsKey}
          label={permission.name}
        />
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          add: permission?.add?.access,
          essentialFilter: [
            {
              // name: 'customer',
              essentialName: 'StockOutward-filter-customer',
              label: 'Customer',
            },
          ],
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
