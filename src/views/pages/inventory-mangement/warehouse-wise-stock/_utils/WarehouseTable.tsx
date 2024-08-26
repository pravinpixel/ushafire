import { useState } from 'react';

import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { WarehouseWiseListType, WarehouseWiseListResponse } from 'helper/types/inventory-management/WarehouseWiseType';

import { WareHouseWiseKey, useWareHouseWiseDelete } from 'store/hooks/InventoryManagementHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: WarehouseWiseListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  permission: ModuleType;
};
export const WarehouseTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const { mutateAsync: deleteApi } = useWareHouseWiseDelete();
  const columns: readonly GridColDef<WarehouseWiseListType>[] = [
    { field: 'warehouseLocation', headerName: 'Warehouse Location', renderCell: ({ row }) => row?.warehouseLocation?.name, minWidth: 200, flex: 1 },
    {
      field: 'warehouseAddress',
      headerName: 'Warehouse Address',
      renderCell: ({ row }) => row?.warehouseAddress?.address,
      minWidth: 220,
      flex: 1,
    },
    { field: 'categoryId', headerName: 'Category', renderCell: ({ row }) => row.categoryId?.name, minWidth: 220, flex: 1 },
    { field: 'subCategoryId', headerName: 'Sub Category', renderCell: ({ row }) => row.subCategoryId?.name, minWidth: 220, flex: 1 },
    { field: 'productId', headerName: 'Product Name', renderCell: ({ row }) => row.productId?.productName, minWidth: 220, flex: 1 },
    { field: 'skuId', headerName: 'SKU', renderCell: ({ row }) => row.skuId?.sku, minWidth: 100, flex: 1 },
    { field: 'quantity', headerName: 'Quantity', minWidth: 100, flex: 1 },
    { field: 'bayId', headerName: 'Bay', renderCell: ({ row }) => row.bayId?.name, minWidth: 130, flex: 1 },
    { field: 'rackId', headerName: 'Rack', renderCell: ({ row }) => row.rackId?.name, minWidth: 130, flex: 1 },
    { field: 'shelvesId', headerName: 'Shelf', renderCell: ({ row }) => row.shelvesId?.name, minWidth: 130, flex: 1 },
    { field: 'binId', headerName: 'Bin', renderCell: ({ row }) => row.binId?.name, minWidth: 130, flex: 1 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 50,
      flex: 1,
      renderCell: ({ row }) => (
        <MoreVertIconButton
          menuItem={[
            {
              label: 'Edit',
              action: 'edit',
              access: permission.edit.access,
              path: permission.edit.path,
            },
            {
              label: 'Delete',
              action: 'delete',
              access: permission.delete.access,
            },
          ]}
          id={row._id}
          label={'Warehouse'}
          deleteApi={deleteApi}
          // isPending={isPending}
          refetchUrl={WareHouseWiseKey}
        />
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          add: permission?.add?.access,
          essentialFilter: [
            {
              // name: 'warehouseIds',
              essentialName: 'WarehouseLocation',
              label: 'Warehouse Location',
              single: true,
              defaultValue: data?.['WarehouseLocation'] || null,
            },
            {
              // name: 'sku',
              essentialName: 'Warehouse-filter-sku',
              label: 'Sku',
            },
            {
              // name: 'category',
              essentialName: 'Warehouse-filter-category',
              label: 'Category',
            },
            {
              // name: 'product',
              essentialName: 'Warehouse-filter-product',
              label: 'Product',
            },
          ],
        }}
        addPath={redirectLink}
        buttonLabel={'Warehouse'}
        totalCount={data?.total}
        params={params}
        setParams={setParams}
        ids={ids}
        filterCount={data?.filterCount}
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
        title=""
        row={data?.list}
        columns={columns}
        total={data?.totalPages}
      />
    </>
  );
};
