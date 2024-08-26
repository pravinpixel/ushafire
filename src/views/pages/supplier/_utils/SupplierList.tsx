import { useState } from 'react';

import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { SupplierTypeForm, SupplierListResponse } from 'helper/types/SupplierTypes';

import { useSupplierDelete } from 'store/hooks/SupplierHooks';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import EditButton from 'views/components/ui-componet/buttons/EditButton';
import DeleteButton from 'views/components/ui-componet/buttons/DeleteButton';

// import SupplierView from '../view';

type Props = {
  data: SupplierListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  buttonLabel: string;
  fieldLabel?: string;
  url: string;
  permission: ModuleType;
};

export const SupplierTable = ({ buttonLabel, data, isLoading, params, setParams, url, redirectLink = '', permission }: Props) => {
  const { mutateAsync: supplierDelete, isPending } = useSupplierDelete();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const columns: readonly GridColDef<SupplierTypeForm>[] = [
    { field: 'code', headerName: 'Supplier code', minWidth: 150, flex: 1 },
    { field: 'name', headerName: 'Supplier Name', minWidth: 220, flex: 1 },
    { field: 'brand_id', headerName: 'Brand', renderCell: ({ row }) => row.brand_id?.name, minWidth: 180, flex: 1 },
    { field: 'contact_number', headerName: 'Contact', minWidth: 220, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 220, flex: 1 },
    { field: 'contact_person', headerName: 'Contact Person', minWidth: 220, flex: 1 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => (
        <>
          {/* {permission.view.access && <SupplierView />} */}
          {permission.edit.access && <EditButton url={permission.path} id={row?._id} />}
          {permission.delete.access && (
            <DeleteButton id={row?._id || ''} deleteApi={supplierDelete} label={permission.name} refetchUrl={url} isPending={isPending} />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          export: permission.export.access,
          add: permission?.add?.access,
        }}
        addPath={redirectLink}
        buttonLabel={buttonLabel}
        totalCount={data?.total}
        params={params}
        setParams={setParams}
        url={url}
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
        title="Supplier"
        // totalCount={data?.total}
        row={data?.list}
        columns={columns}
        total={data?.totalPages}
      />
    </>
  );
};
