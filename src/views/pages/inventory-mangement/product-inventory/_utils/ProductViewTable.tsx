import { GridColDef } from '@mui/x-data-grid';

import { MoreIcon } from 'theme/svg';

import { PaginationInterFace } from 'helper/types/TableTypes';

import DataTable from 'views/components/table-componet/DataTable';

type ColumnVisble = {
  stock?: boolean;
  inwarddate?: boolean;
  supplier?: boolean;
  customers?: boolean;
  products?: boolean;
  sku?: boolean;
  total?: boolean;
  quantity?: boolean;
  loan?: boolean;
  loandate?: boolean;
  customername?: boolean;
  employeename?: boolean;
  return?: boolean;
  purpose?: boolean;
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isLoading?: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  fieldLabel?: string;
  visbleColumn: ColumnVisble;
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
};

export const ProductViewTable = ({ data, params, setParams, visbleColumn, isLoading }: Props) => {
  const columns: readonly GridColDef<TableDataType>[] = [
    { field: 'stock', headerName: 'Stock Inward No', minWidth: 220, flex: 1 },
    { field: 'inwarddate', headerName: 'Inward Date', minWidth: 220, flex: 1 },
    { field: 'supplier', headerName: 'Supplier', minWidth: 300, flex: 1 },
    { field: 'customers', headerName: 'Customers', minWidth: 220, flex: 1 },
    { field: 'products', headerName: 'Products', minWidth: 220, flex: 1 },
    { field: 'sku', headerName: 'SKU', minWidth: 220, flex: 1 },
    { field: 'quantity', headerName: 'Quantity', minWidth: 220, flex: 1 },
    { field: 'loan', headerName: 'Loan No', minWidth: 220, flex: 1 },
    { field: 'loandate', headerName: 'Loan Date', minWidth: 220, flex: 1 },
    { field: 'customername', headerName: 'Customer Name', minWidth: 220, flex: 1 },
    { field: 'employeename', headerName: 'Employee Name', minWidth: 220, flex: 1 },
    { field: 'return', headerName: 'Date of Return', minWidth: 220, flex: 1 },
    { field: 'purpose', headerName: 'Purpose', minWidth: 220, flex: 1 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 50,
      flex: 1,
      renderCell: () => <MoreIcon />,
    },
  ];

  return (
    <DataTable
      // key={data?.total}
      params={params}
      setParams={setParams}
      title={''}
      // totalCount={data?.total}
      dataGridProps={{
        loading: isLoading,
        checkboxSelection: true,
        initialState: {
          columns: {
            columnVisibilityModel: {
              stock: false,
              inwarddate: false,
              supplier: false,
              customers: false,
              products: false,
              sku: false,
              quantity: true,
              total: false,
              loan: false,
              loandate: false,
              customername: false,
              employeename: false,
              return: false,
              purpose: false,
              ...visbleColumn,
            } as ColumnVisble,
          },
        },
      }}
      row={data.list}
      columns={columns}
      // total={data?.totalPages}
    />
  );
};
