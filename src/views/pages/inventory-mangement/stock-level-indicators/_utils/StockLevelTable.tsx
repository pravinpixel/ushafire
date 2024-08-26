import { useState } from 'react';

import { Chip } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { ProductListResponse } from 'helper/types/inventory-management/ProductInventoryType';
import { StockLevelIndicatorRes } from 'helper/types/inventory-management/StockLevelIndicatorType';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';

type Props = {
  data: ProductListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};

const StockLevelTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const columns: readonly GridColDef<StockLevelIndicatorRes>[] = [
    { field: 'categoryId', headerName: 'Category', renderCell: ({ row }) => row?.warehouse?.product?.productCategory?.label, minWidth: 180, flex: 1 },
    {
      field: 'subcategoryId',
      headerName: 'Sub Category',
      renderCell: ({ row }) => row?.warehouse?.product?.productSubCategory?.label,
      minWidth: 180,
      flex: 1,
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      minWidth: 180,
      renderCell: ({ row }) => row?.warehouse?.product?.productName,
      flex: 1,
    },
    { field: 'SKU', headerName: 'SKU', renderCell: ({ row }) => row?.warehouse?.product?.SKU, minWidth: 160, flex: 1 },
    { field: 'quantity', headerName: 'Available Quantity', renderCell: ({ row }) => row?.quantity, minWidth: 100, flex: 1 },
    {
      field: 'minimumOrderQuantity',
      headerName: 'Min Order Qty',
      renderCell: ({ row }) => row?.warehouse?.product?.minimumOrderQuantity,
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'indicator',
      headerName: 'Indicator',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.warehouse?.indicator as never)} label={row?.warehouse?.indicator} />,
      minWidth: 120,
      flex: 1,
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          add: false,
          essentialFilter: [
            {
              essentialName: 'WarehouseLocation',
              label: 'Warehouse Location',
              single: true,
              defaultValue: data?.['WarehouseLocation'] || null,
            },
          ],
        }}
        addPath={redirectLink}
        buttonLabel={permission.name}
        totalCount={data?.total}
        params={params}
        setParams={setParams}
        ids={ids}
        filterCount={data?.filterCount}
        defaultFilters={{
          warehouseIds: data?.warehouseIds,
        }}
      />
      <DataTable
        params={params}
        setParams={setParams}
        dataGridProps={{
          loading: isLoading,
          checkboxSelection: true,
          isRowSelectable: () => true,
          onRowSelectionModelChange: (newRowSelectionModel) => {
            setIds(newRowSelectionModel);
          },
        }}
        row={data?.list}
        columns={columns}
        total={data?.totalPages}
      />
    </>
  );
};

export default StockLevelTable;
