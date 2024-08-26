import { useState, useContext } from 'react';

import { GridColDef } from '@mui/x-data-grid';

import { MoreIcon } from 'theme/svg';

import { fDate } from 'helper/FormatHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useProductInInwardList } from 'store/hooks/InventoryManagementHook';

import DataTable from 'views/components/table-componet/DataTable';

import { ProductViewContext } from './ProductViewContext';

const ProductStockInward = () => {
  const { data: ProductData } = useContext(ProductViewContext);
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useProductInInwardList({
    params,
    id: ProductData?._id,
  });

  const columns: readonly GridColDef[] = [
    { field: 'stockInward', headerName: 'Stock Inward No', minWidth: 220, flex: 1 },
    {
      field: 'stockInwardDate',
      headerName: 'Inward Date',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => <>{fDate(row.stockInwardDate)}</>,
    },
    { field: 'supplier', headerName: 'Supplier', minWidth: 300, flex: 1 },
    { field: 'quantity', headerName: 'Quantity', minWidth: 220, flex: 1 },
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
      total={data?.totalPages}
      dataGridProps={{
        loading: isLoading,
        checkboxSelection: true,
      }}
      row={data?.list}
      columns={columns}
    />
  );
};
export default ProductStockInward;
