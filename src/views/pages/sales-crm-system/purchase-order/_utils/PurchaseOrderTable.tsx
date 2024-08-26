import { useState } from 'react';

import { Chip, Typography } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { useModuleFinder } from 'helper/CustomHooks';
import { GridColDefCustom } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PurchaseOrderTypeForm, PurchaseOrderResponse } from 'helper/types/sales-crm-system/PurchaseOrderTypes';

import { PurchaseOrderListsKey, usePurchaseOrderDelete } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: PurchaseOrderResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  permission: ModuleType;
};

const PurchaseOrderTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const { find } = useModuleFinder();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const { mutateAsync: deleteApi } = usePurchaseOrderDelete();
  const access = find('stock-inward')?.add?.access || false;
  const paymentPermission = find('vendor-payments');
  const columns: readonly GridColDefCustom<
    PurchaseOrderTypeForm & {
      isMailSend: boolean;
      isEdit: boolean;
      isUpdatePayment: boolean;
      requestFrom: string;
    }
  >[] = [
    { field: 'poNumber', headerName: 'PO No', minWidth: 180, flex: 1 },
    {
      field: 'poDate',
      headerName: 'PO Date',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row.poDate)}</Typography>,
      minWidth: 180,
      flex: 1,
    },
    { field: 'supplier', headerName: 'Supplier Name', renderCell: ({ row }) => row?.supplier?.label, minWidth: 180, flex: 1 },
    { field: 'paymentTerms', headerName: 'Payment Terms', renderCell: ({ row }) => row?.paymentTerms?.label, minWidth: 160, flex: 1 },
    {
      field: 'requestFrom',
      headerName: 'Lead Type',

      minWidth: 120,
      flex: 1,
    },
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
            {
              label: 'Update Payment',
              action: 'path',
              access: !!paymentPermission?.edit.access,
              path: paymentPermission?.add?.path + `?po_id=${row._id}`,
              menuItemProps: {
                disabled: !row.isUpdatePayment,
              },
            },
            {
              label: 'Send a Mail',
              action: 'mail',
              access: access,
              menuItemProps: {
                disabled: !row.isMailSend,
              },
            },
          ]}
          id={row._id}
          refetchUrl={PurchaseOrderListsKey}
          label={'PurchaseOrder'}
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

export default PurchaseOrderTable;
