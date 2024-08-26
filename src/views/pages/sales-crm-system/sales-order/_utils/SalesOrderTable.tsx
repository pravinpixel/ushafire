import { useState } from 'react';

import { Chip, Typography } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { useRouter, useModuleFinder } from 'helper/CustomHooks';
import { SaleOrderResponse, SaleOrderTypeForm } from 'helper/types/sales-crm-system/SalesOrderTypes';

import { useSoToPO, SalesOrderListKey, useSalesOrderDelete, useSaleOrderToSaleInvoice } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: SaleOrderResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  permission: ModuleType;
};

const SalesOrderTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const router = useRouter();
  const { find } = useModuleFinder();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const { mutateAsync: deleteApi } = useSalesOrderDelete();
  const { mutateAsync: salesOrderToSalesInvoice } = useSaleOrderToSaleInvoice();
  const { mutateAsync: salesOrderToPo } = useSoToPO();
  const saleInvoicePath = find('sales-invoice')?.path;
  const PoRequestPath = find('purchase-order')?.path;

  const columns: readonly GridColDef<
    SaleOrderTypeForm & {
      isEdit: boolean;
      isMove: boolean;
      isPoRequest: boolean;
    }
  >[] = [
    { field: 'saleOrderNumber', headerName: 'Sale Order No', minWidth: 180, flex: 1 },
    {
      field: 'saleOrderDate',
      headerName: 'Sale Order Date',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row?.saleOrderDate)}</Typography>,
      minWidth: 180,
      flex: 1,
    },
    {
      field: 'quotationNumber',
      headerName: 'Quotation No',
      minWidth: 180,
      flex: 1,
    },
    {
      field: 'quotationDate',
      headerName: 'Quotation Date',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row?.quotationDate)}</Typography>,
      minWidth: 180,
      flex: 1,
    },
    { field: 'customerName', headerName: 'Customer Name', renderCell: ({ row }) => row?.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'location', headerName: 'Delivery Location' },
    { field: 'paymentMode', headerName: 'Payment Mode', valueGetter: ({ value }) => value?.label, minWidth: 100, flex: 1 },
    { field: 'total', headerName: 'Total', minWidth: 100, flex: 1 },
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
              label: 'Move to Sales Invoice',
              access: permission.edit.access,
              action: 'confirmPopup',
              confirmApi: salesOrderToSalesInvoice,
              menuItemProps: {
                disabled: !row.isMove,
                onSuccess: () => router.push(saleInvoicePath ?? '/'),
              },
            },
            {
              label: 'Send PO Request',
              access: permission.edit.access,
              action: 'confirmPopup',
              confirmApi: salesOrderToPo,
              menuItemProps: {
                disabled: !row.isPoRequest,
                onSuccess: () => router.push(PoRequestPath ?? '/'),
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
          refetchUrl={SalesOrderListKey}
          label={'Loan'}
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
          essentialFilter: [
            {
              essentialName: 'SaleOrder-filter-customer',
              label: 'Customer',
            },
            {
              essentialName: 'SaleOrder-filter-saleorderstatus',
              label: 'Status',
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

export default SalesOrderTable;
