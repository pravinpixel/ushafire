/**
 * This file is part of AutoPack.
 *
 * Stock Inward Form to insert the stock to the ware house
 */
import { useState } from 'react';

import { Chip, Typography } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate, fCurrency } from 'helper/FormatHelper';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { StockInwardTypeForm, StockInwardListResponse } from 'helper/types/inventory-management/StockInwardType';

import { StockInwardListsKey, useStockInwardDelete } from 'store/hooks/InventoryManagementHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: StockInwardListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  permission: ModuleType;
};

export const StockInwardTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const { mutateAsync: deleteApi } = useStockInwardDelete();
  const UpdataStock = permission?.addMore?.find((value) => value?.fend_component === 'update-stock')?.path;
  const columns: readonly GridColDef<StockInwardTypeForm>[] = [
    { field: 'poNumber', headerName: 'PO NO', minWidth: 150, flex: 1 },
    {
      field: 'poDate',
      headerName: 'PO Date',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row.poDate)}</Typography>,
      minWidth: 220,
      flex: 1,
    },
    { field: 'supplierId', headerName: 'Supplier', renderCell: ({ row }) => row.supplierId?.name, minWidth: 220, flex: 1 },
    // { field: 'modeOfTransfer', headerName: 'Mode of Transfer', renderCell: ({ row }) => row?.modeOfTransfer?.name, minWidth: 220, flex: 1 },
    { field: 'finalTotal', headerName: 'Total', renderCell: ({ row }) => fCurrency(row?.finalTotal), minWidth: 220, flex: 1 },
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
          deleteApi={deleteApi}
          menuItem={[
            {
              label: 'Edit',
              access: permission.edit.access,
              action: 'edit',
              path: permission.edit.path,
            },
            {
              label: 'View Stock',
              access: permission.view.access,
              action: 'pathById',
              path: UpdataStock || '/',
              menuItemProps: {
                disabled: row?.status === 'Pending',
              },
            },
            {
              label: 'Delete',
              access: permission.delete.access,
              action: 'delete',
            },
          ]}
          refetchUrl={StockInwardListsKey}
          label={permission.name}
        />
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          // add: permission?.add?.access,
          add: false,
          essentialFilter: [
            {
              essentialName: 'StockInward-filter-supplier',
              label: 'Supplier',
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
