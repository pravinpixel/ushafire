import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import DashBoardTable from './_utils/DashBoardTable';

type Props = {
  data?: readonly GridValidRowModel[];
};

function OrdersPipline({ data }: Props) {
  const columns: readonly GridColDef[] = [
    { field: 'No', headerName: 'Product Name', renderCell: ({ row }) => row.categoryId?.name, minWidth: 180, flex: 1 , sortable: false },
    { field: 'loanDate', headerName: 'Loan Date', renderCell: ({ row }) => row.subcategoryId?.name, minWidth: 180, flex: 1 , sortable: false },
    { field: 'customerName', headerName: 'Deliver to Name', width: 80, flex: 1 , sortable: false },
  ];
  return <DashBoardTable title={'Orders Pipline'} subTitle="Last 2 Weeks" columns={columns} data={data} />;
}

export default OrdersPipline;
