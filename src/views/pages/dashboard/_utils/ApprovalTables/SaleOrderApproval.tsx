import { Chip } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import { handleColor } from 'helper/GlobalHelper';
import { useModuleFinder } from 'helper/CustomHooks';
import { fDate, fCurrency } from 'helper/FormatHelper';
import { SaleOrderTypeForm } from 'helper/types/sales-crm-system/SalesOrderTypes';

import ViewButton from 'views/components/ui-componet/buttons/ViewButton';

import DashBoardTable from './_utils/DashBoardTable';

type Props = {
  data?: readonly GridValidRowModel[];
};

const SaleOrderApproval = ({ data }: Props) => {
  const { find } = useModuleFinder();
  const path = find('sales-order')?.addMore?.find((value) => value.fend_component === 'approval')?.path;
  const columns: GridColDef<SaleOrderTypeForm>[] = [
    { field: 'saleOrderNumber', headerName: 'So Number', minWidth: 180, flex: 1, sortable: false },
    { field: 'saleOrderDate', headerName: 'SO Date', valueGetter: ({ value }) => fDate(value), minWidth: 180, flex: 1, sortable: false },
    { field: 'customerId', headerName: 'Customer Name', valueGetter: ({ value }) => value.label, minWidth: 180, flex: 1, sortable: false },
    { field: 'location', headerName: 'Delivery Location', minWidth: 180, flex: 1, sortable: false },
    { field: 'paymentMode', headerName: 'Payment Mode', valueGetter: ({ value }) => value.label, minWidth: 180, flex: 1, sortable: false },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip color={handleColor(row.status)} label={row.status} />,
      minWidth: 180,
      flex: 1,
      sortable: false,
    },
    { field: 'totalAmount', headerName: 'Amount', valueGetter: ({ value }) => fCurrency(value), minWidth: 180, flex: 1, sortable: false },
    { field: 'action', headerName: '', renderCell: ({ row }) => <ViewButton id={row._id} url={path} />, width: 20, flex: 1, sortable: false },
  ];
  return <DashBoardTable title={'Sale Order Approval'} columns={columns} data={data} />;
};

export default SaleOrderApproval;
