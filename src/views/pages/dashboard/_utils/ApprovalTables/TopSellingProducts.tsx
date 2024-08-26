import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import DashBoardTable from './_utils/DashBoardTable';

type Props = {
  data?: readonly GridValidRowModel[];
};

const TopSellingProducts = ({ data }: Props) => {
  const columns: readonly GridColDef[] = [
    { field: 'loanNo', headerName: 'No', renderCell: ({ row }) => row.categoryId?.name, width: 80, flex: 1, sortable: false },
    { field: 'loanDate', headerName: 'Product Name', renderCell: ({ row }) => row.subcategoryId?.name, minWidth: 180, flex: 1, sortable: false },
    { field: 'customerName', headerName: 'Order', minWidth: 180, flex: 1, sortable: false },
    { field: 'location', headerName: 'Revenue', renderCell: ({ row }) => row.productId?.quantity, width: 80, flex: 1, sortable: false },
  ];
  return <DashBoardTable title={'Top Selling Products'} subTitle="Last 2 Weeks" columns={columns} data={data} />;
};

export default TopSellingProducts;
