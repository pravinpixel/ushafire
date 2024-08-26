import React, { useState } from 'react';

import { Chip } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate, fCurrency } from 'helper/FormatHelper';
import { GridColDefCustom } from 'helper/types/GlobalTypes';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { useRouter, useModuleFinder } from 'helper/CustomHooks';
import { SalesInvoiceFormType, SalesInvoiceListResponse } from 'helper/types/sales-crm-system/SalesInvoiceTypes';

import { SalesInvoiceListKey, useSalesInvoiceDelete, useSalesInvoiceToStockOutward } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: SalesInvoiceListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};

const SalesInvoiceListTable = ({ data, isLoading, params, setParams, redirectLink, permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const router = useRouter();
  const { find } = useModuleFinder();
  const paymentPermission = find('customer-payments');
  const stockOutwardPermission = find('stock-outward');

  const { mutateAsync: deleteApi } = useSalesInvoiceDelete();
  const { mutateAsync: confirmApi } = useSalesInvoiceToStockOutward();

  const columns: readonly GridColDefCustom<
    SalesInvoiceFormType & {
      isUpdatePayment: boolean;
      isMoveStockOutward: boolean;
      isEdit: boolean;
      paymentStatus: string;
    }
  >[] = [
    { field: 'salesInvoiceNo', headerName: 'Sale Invoice No', minWidth: 180, flex: 1 },
    { field: 'salesInvoiceDate', headerName: 'Sale Invoice Date', minWidth: 180, flex: 1, renderCell: ({ row }) => fDate(row?.salesInvoiceDate) },
    { field: 'leadType', headerName: 'Lead Type', renderCell: ({ row }) => row?.leadType?.label, minWidth: 180, flex: 1 },
    { field: 'customerId', headerName: 'Customers', renderCell: ({ row }) => row?.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'contact', headerName: 'Contact', minWidth: 160, flex: 1 },
    { field: 'totalAmount', headerName: 'Total', renderCell: ({ row }) => fCurrency(row?.totalAmount), minWidth: 160, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.status)} label={row?.status} />,
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'paymentStatus',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.paymentStatus)} label={row?.paymentStatus} />,
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
              label: 'Update Payment',
              action: 'path',
              access: !!paymentPermission?.edit?.access,
              path: paymentPermission?.add?.path + `?invoice_id=${row._id}`,
              menuItemProps: {
                disabled: !row.isUpdatePayment,
              },
            },
            {
              label: 'Move To StockOut Ward',
              action: 'confirmPopup',
              access: !!stockOutwardPermission?.edit?.access,
              confirmApi: confirmApi,
              // path: stockOutwardPermission?.add?.path + `?invoice_id=${row._id}`,
              menuItemProps: {
                disabled: !row.isMoveStockOutward,
                onSuccess() {
                  router.push(stockOutwardPermission?.path ?? '/');
                },
              },
            },
            {
              label: 'Edit',
              action: 'edit',
              access: permission.edit.access,
              path: permission.edit.path,
              menuItemProps: {
                disabled: !row.isEdit,
              },
            },
            {
              label: 'Delete',
              action: 'delete',
              access: permission.delete.access,
            },
          ]}
          id={row._id}
          refetchUrl={SalesInvoiceListKey}
          label={'SalesInvoice'}
          deleteApi={deleteApi}
        />
      ),
    },
  ];
  return (
    <>
      <TableTopBar
        enabled={{
          add: permission?.add?.access,
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

export default SalesInvoiceListTable;
