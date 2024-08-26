import { useState } from 'react';

import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fCurrency } from 'helper/FormatHelper';
import { ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { VendorPaymentType } from 'helper/types/manage-payments/VendorPayments';
import { PurchaseOrderResponse } from 'helper/types/sales-crm-system/PurchaseOrderTypes';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import ViewButton from 'views/components/ui-componet/buttons/ViewButton';

type Props = {
  data: PurchaseOrderResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  permission: ModuleType;
};

const VendorPaymentTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const PaymentHistoryPath = permission.addMore?.find((value) => value.fend_component === 'vendor-payment-history');

  const columns: readonly GridColDef<VendorPaymentType>[] = [
    { field: 'supplier', headerName: 'Suplier Name', valueGetter: ({ value }) => value?.label, minWidth: 180, flex: 1 },
    // {
    //   field: 'poDate',
    //   headerName: 'Payment Terms',
    //   renderCell: ({ row }) => <Typography variant="inherit">{fDate(row.poDate)}</Typography>,
    //   minWidth: 180,
    //   flex: 1,
    // },
    { field: 'totalPaid', headerName: 'Total Sales', valueGetter: ({ value }) => fCurrency(value), minWidth: 180, flex: 1 },
    { field: 'totalAmount', headerName: 'Total Amount', valueGetter: ({ value }) => fCurrency(value), minWidth: 160, flex: 1 },
    { field: 'pendingDue', headerName: 'Pending Dues', valueGetter: ({ value }) => fCurrency(value), minWidth: 100, flex: 1 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 50,
      flex: 1,
      renderCell: ({ row }) => PaymentHistoryPath?.access && <ViewButton url={PaymentHistoryPath?.path} id={row._id} />,
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

export default VendorPaymentTable;
