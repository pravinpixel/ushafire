import { useState } from 'react';

import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { notify, ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { RoleFormType, RoleListResponse } from 'helper/types/AdminSettingTypes';

import { useRoleDelete, useRoleStatusChange } from 'store/hooks/SettingHooks';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import EditButton from 'views/components/ui-componet/buttons/EditButton';
import CloneButton from 'views/components/ui-componet/buttons/CloneButton';
import DeleteButton from 'views/components/ui-componet/buttons/DeleteButton';
import ActiveInactiveButton from 'views/components/ui-componet/buttons/ActiveInactiveButton';

import RoleView from '../view';

type Props = {
  data: RoleListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  url: string;
  permission: ModuleType;
};

export const RoleTable = ({ data, isLoading, params, setParams, url, redirectLink = '', permission }: Props) => {
  const { mutateAsync: changeStatus, isPending: statusLoading } = useRoleStatusChange();
  const { mutateAsync: roleDelete, isPending } = useRoleDelete();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const columns: readonly GridColDef<RoleFormType>[] = [
    { field: 'code', headerName: permission.name + ' ID', minWidth: 220, flex: 1 },
    { field: 'name', headerName: permission.name + ' Name', minWidth: 220, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => (
        <ActiveInactiveButton
          key={row._id}
          isPending={statusLoading}
          edit_access={permission.edit.access}
          row={{
            status: row?.status,
            _id: row?._id,
          }}
          refetchUrl={url}
          onChange={() =>
            changeStatus(
              {
                formData: {
                  status: !row?.status,
                  _id: row?._id ?? '',
                },
              },
              {
                onSuccess: (res) => {
                  notify(res);
                },
                onError: (error) => {
                  notify(error);
                },
              }
            )
          }
        />
      ),
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => (
        <>
          {permission.view.access && <RoleView id={row._id} />}
          {permission.edit.access && <EditButton url={permission.path} id={row?._id} />}
          {permission.delete.access && (
            <DeleteButton id={row?._id || ''} deleteApi={roleDelete} label={permission.name} refetchUrl={url} isPending={isPending} />
          )}
          {permission?.add?.access && <CloneButton url={permission.add?.path ?? '/'} id={row._id} />}
        </>
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        totalCount={data?.total}
        enabled={{
          export: permission.export.access,
          add: permission?.add?.access,
        }}
        addPath={redirectLink}
        buttonLabel={permission.name}
        params={params}
        setParams={setParams}
        url={url}
        ids={ids}
        filterCount={data?.filterCount}
        // mb={3}
      />
      <DataTable
        key={data?.total}
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
