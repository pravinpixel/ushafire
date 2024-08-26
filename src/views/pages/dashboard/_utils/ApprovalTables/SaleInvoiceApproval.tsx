import { Chip } from '@mui/material';
import { GridValidRowModel } from '@mui/x-data-grid';

import { handleColor } from 'helper/GlobalHelper';
import { useModuleFinder } from 'helper/CustomHooks';
import { fDate, fCurrency } from 'helper/FormatHelper';
import { GridColDefCustom } from 'helper/types/GlobalTypes';
import { SalesInvoiceFormType } from 'helper/types/sales-crm-system/SalesInvoiceTypes';

import ViewButton from 'views/components/ui-componet/buttons/ViewButton';

import DashBoardTable from './_utils/DashBoardTable';

type Props = {
  data?: readonly GridValidRowModel[];
};

function SaleInvoiceApproval({ data }: Props) {
  const { find } = useModuleFinder();
  const path = find('sales-invoice')?.addMore?.find((value) => value.fend_component === 'approval')?.path;
  const columns: readonly GridColDefCustom<SalesInvoiceFormType>[] = [
    { field: 'salesInvoiceNo', headerName: 'Sale Invoice No', minWidth: 180, flex: 1, sortable: false },
    { field: 'salesInvoiceDate', headerName: 'Sale Invoice Date', valueGetter: ({ value }) => fDate(value), minWidth: 180, flex: 1, sortable: false },
    { field: 'customerId', headerName: 'Customer Name', valueGetter: ({ value }) => value?.label, minWidth: 180, flex: 1, sortable: false },
    // { field: '', headerName: 'Delivery Location', minWidth: 180, flex: 1, sortable: false },
    { field: 'termOfPayment', headerName: 'Payment Code', valueGetter: ({ value }) => value?.label, minWidth: 180, flex: 1, sortable: false },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.status)} label={row?.status} />,
      minWidth: 180,
      flex: 1,
      sortable: false,
    },
    { field: 'totalAmount', headerName: 'Amount', valueGetter: ({ value }) => fCurrency(value), minWidth: 180, flex: 1, sortable: false },
    { field: 'action', headerName: '', renderCell: ({ row }) => <ViewButton id={row._id} url={path} />, width: 20, flex: 1, sortable: false },
  ];
  return <DashBoardTable title={'Sale Invoice Approval'} columns={columns} data={data} />;
}

export default SaleInvoiceApproval;
