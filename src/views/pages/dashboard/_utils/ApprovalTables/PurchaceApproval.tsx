import { Chip } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import { handleColor } from 'helper/GlobalHelper';
import { useModuleFinder } from 'helper/CustomHooks';
import { fDate, fCurrency } from 'helper/FormatHelper';
import { PurchaseOrderTypeForm } from 'helper/types/sales-crm-system/PurchaseOrderTypes';

import ViewButton from 'views/components/ui-componet/buttons/ViewButton';

import DashBoardTable from './_utils/DashBoardTable';

type Props = {
  data?: readonly GridValidRowModel[];
};
const PurchaceApproval = ({ data }: Props) => {
  const { find } = useModuleFinder();
  const path = find('purchase-order')?.addMore?.find((value) => value.fend_component === 'approval')?.path;

  const columns: readonly GridColDef<PurchaseOrderTypeForm>[] = [
    { field: 'poNumber', headerName: 'PO No', minWidth: 180, flex: 1, sortable: false },
    { field: 'loanDate', headerName: 'PO Date', renderCell: ({ row }) => fDate(row.poDate), minWidth: 180, flex: 1, sortable: false },
    {
      field: 'supplier',
      headerName: 'Supplier Name',
      valueGetter: ({ value }) => value.label,
      minWidth: 180,
      flex: 1,
      sortable: false,
    },
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
  return <DashBoardTable title={'Purchace Order'} columns={columns} data={data} />;
};

export default PurchaceApproval;
