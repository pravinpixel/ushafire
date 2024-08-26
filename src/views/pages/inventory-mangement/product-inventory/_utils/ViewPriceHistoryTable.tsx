import dayjs from 'dayjs';

import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { fCurrency } from 'helper/FormatHelper';
import { OptionsType } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { ProductListResponse } from 'helper/types/inventory-management/ProductInventoryType';

import { useProductHistoryApi } from 'store/hooks/InventoryManagementHook';

import DataTable from 'views/components/table-componet/DataTable';

type Props = {
  data?: ProductListResponse;
  id: string | null;
  // isLoading: boolean;
  params?: PaginationInterFace;
  setParams?: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  fieldLabel?: string;
};

type TableDataType = {
  _id: string;
  stock: string;
  inwarddate: string;
  supplier: string;
  quantity: number;
  total: string;
  customers: string;
  products: string;
  sku: string;
  loan: string;
  loandate: string;
  customername: string;
  employeename: string;
  return: string;
  purpose: string;
  createdAt?: Date;
  createdBy?: OptionsType;
  costPrice?: number;
  sellingPrice?: number;
  discountedPrice?: number;
};

const ViewPriceHistoryTable = ({ id, params, setParams }: Props) => {
  const { data, isLoading } = useProductHistoryApi(id as string);

  const columns: readonly GridColDef<TableDataType>[] = [
    {
      field: 'createdAt',
      headerName: 'Date',
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => <Typography variant="inherit">{dayjs(row.createdAt).format('MMMM DD, YYYY')}</Typography>,
    },
    {
      field: 'inwarddate',
      headerName: 'Admin Name',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => (
        <Typography variant="inherit" sx={{ textTransform: 'capitalize' }}>
          {row?.createdBy?.label}
        </Typography>
      ),
    },
    {
      field: 'costPrice',
      headerName: 'Cost Price',
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => <Typography variant="inherit">{fCurrency(row?.costPrice)}</Typography>,
    },
    {
      field: 'sellingPrice',
      headerName: 'Selling Price',
      minWidth: 120,
      flex: 1,
      renderCell: ({ row }) => <Typography variant="inherit">{fCurrency(row?.sellingPrice)}</Typography>,
    },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Price',
      minWidth: 120,
      flex: 1,
      renderCell: ({ row }) => <Typography variant="inherit">{fCurrency(row?.discountedPrice)}</Typography>,
    },
  ];

  return (
    <DataTable
      key={data?.total}
      params={params}
      setParams={setParams}
      title={''}
      // totalCount={data?.total}
      dataGridProps={{
        loading: isLoading,
        checkboxSelection: false,
        hideFooter: true,
      }}
      row={data?.list || []}
      columns={columns}
      // total={data?.totalPages}
    />
  );
};

export default ViewPriceHistoryTable;
