import { Chip } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { handleColor } from 'helper/GlobalHelper';
import { useModuleFinder } from 'helper/CustomHooks';
import { BlanketOrderFormType } from 'helper/types/sales-crm-system/BlanketOrderTypes';

import ViewButton from 'views/components/ui-componet/buttons/ViewButton';

import DashBoardTable from './_utils/DashBoardTable';

type Props = {
  data?: readonly GridValidRowModel[];
};

function BlanketApproval({ data }: Props) {
  const { find } = useModuleFinder();
  const path = find('blanket-order')?.addMore?.find((value) => value.fend_component === 'approval')?.path;
  const columns: readonly GridColDef<BlanketOrderFormType>[] = [
    {
      field: 'blanketOrderNumber',
      headerName: 'Blanket Order No',
      minWidth: 180,
      flex: 1,
      sortable: false,
    },
    {
      field: 'blanketOrderDate',
      headerName: 'Blanket Order Date',
      valueGetter: ({ value }) => fDate(value),
      minWidth: 180,
      flex: 1,
      sortable: false,
    },
    { field: 'customerId', headerName: 'Customer Name', valueGetter: ({ value }) => value?.label, minWidth: 180, flex: 1, sortable: false },
    { field: 'location', headerName: 'Delivery Location', minWidth: 180, flex: 1, sortable: false },
    { field: 'paymentMode', headerName: 'Payment Mode', valueGetter: ({ value }) => value?.label, minWidth: 180, flex: 1, sortable: false },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip color={handleColor(row.status)} label={row.status} />,
      minWidth: 180,
      flex: 1,
      sortable: false,
    },
    { field: 'action', headerName: '', renderCell: ({ row }) => <ViewButton id={row._id} url={path} />, width: 20, flex: 1, sortable: false },
  ];
  return <DashBoardTable title={'Blanket Approval'} columns={columns} data={data} />;
}

export default BlanketApproval;
