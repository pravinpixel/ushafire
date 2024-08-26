import { useState, useContext } from 'react';

import { GridColDef } from '@mui/x-data-grid';

import { MoreIcon } from 'theme/svg';

import { fDate } from 'helper/FormatHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useProductInOutwardList } from 'store/hooks/InventoryManagementHook';

import DataTable from 'views/components/table-componet/DataTable';

import { ProductViewContext } from './ProductViewContext';

const ProductStockOutward = () => {
  const { data: ProductData } = useContext(ProductViewContext);
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useProductInOutwardList({
    params,
    id: ProductData?._id,
  });

  const columns: readonly GridColDef[] = [
    { field: 'stockOutwardNumber', headerName: 'Stock Outward No', minWidth: 220, flex: 1 },
    {
      field: 'stockOutwardDate',
      headerName: 'Outward Date',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => <>{fDate(row.stockOutwardDate)}</>,
    },
    { field: 'quantity', headerName: 'Quantity', minWidth: 220, flex: 1 },
    { field: 'rate', headerName: 'Rate', minWidth: 300, flex: 1 },
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
      params={params}
      setParams={setParams}
      dataGridProps={{
        loading: isLoading,
        checkboxSelection: true,
      }}
      row={data?.list}
      columns={columns}
      total={data?.totalPages}
    />
  );
};
export default ProductStockOutward;
