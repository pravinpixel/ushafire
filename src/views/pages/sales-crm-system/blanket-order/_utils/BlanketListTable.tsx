import React, { useState } from 'react';

import { Chip } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { useRouter, useModuleFinder } from 'helper/CustomHooks';
import { BlanketOrderFormType, BlanketOrderListResponse } from 'helper/types/sales-crm-system/BlanketOrderTypes';

import { useBlanketToPO, BlanketOrderListKey, useBlanketOrderDelete, useBlanketToSaleInvoice } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: BlanketOrderListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};
const BlanketOrderListTable = ({ data, isLoading, params, setParams, redirectLink, permission }: Props) => {
  const router = useRouter();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const { mutateAsync: salesOrderToPo } = useBlanketToPO();
  const { mutateAsync: deleteApi } = useBlanketOrderDelete();
  const { mutateAsync: blanketOrderToSalesInvoice } = useBlanketToSaleInvoice();

  const { find } = useModuleFinder();
  const saleInvoicePath = find('sales-invoice')?.path;
  const PoRequestPath = find('purchase-order')?.path;
  const columns: readonly GridColDef<
    BlanketOrderFormType & {
      isEdit: boolean;
      isMove: boolean;
      isPoRequest: boolean;
    }
  >[] = [
    { field: 'blanketOrderNumber', headerName: 'Blanket Order No', minWidth: 180, flex: 1 },
    { field: 'blanketOrderDate', headerName: 'Blanket Order Date', renderCell: ({ row }) => fDate(row?.blanketOrderDate), minWidth: 180, flex: 1 },

    { field: 'quotationNumber', headerName: 'Quotation No', minWidth: 180, flex: 1 },
    { field: 'quotationDate', headerName: 'Quotation Date', renderCell: ({ row }) => fDate(row?.quotationDate), minWidth: 160, flex: 1 },
    { field: 'customerId', headerName: 'Customer Name', renderCell: ({ row }) => row?.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'location', headerName: 'Delivery Location', minWidth: 180, flex: 1 },
    { field: 'deliveryDate', headerName: 'Delivery Date', renderCell: ({ row }) => fDate(row?.deliveryDate), minWidth: 180, flex: 1 },
    { field: 'paymentMode', headerName: 'Payment Mode', renderCell: ({ row }) => row?.paymentMode?.label, minWidth: 180, flex: 1 },

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
              confirmApi: blanketOrderToSalesInvoice,
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
          refetchUrl={BlanketOrderListKey}
          label={'BlanketOrder'}
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
              essentialName: 'BlanketOrder-filter-blanketorderstatus',
              label: 'Status',
            },
            {
              essentialName: 'BlanketOrder-filter-customer',
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

export default BlanketOrderListTable;
