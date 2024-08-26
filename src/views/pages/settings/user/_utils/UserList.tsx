import { useState } from 'react';

import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { notify, ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { UserFormType, UserListResponse } from 'helper/types/AdminSettingTypes';

import { useUserDelete, useUserStatusChange } from 'store/hooks/SettingHooks';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import EditButton from 'views/components/ui-componet/buttons/EditButton';
import DeleteButton from 'views/components/ui-componet/buttons/DeleteButton';
import ActiveInactiveButton from 'views/components/ui-componet/buttons/ActiveInactiveButton';

type Props = {
  data: UserListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  url: string;
  permission: ModuleType;
};

export const UserTable = ({ data, isLoading, params, setParams, url, redirectLink = '', permission }: Props) => {
  const { mutateAsync: deleteUser, isPending } = useUserDelete();
  const { mutateAsync: changeStatus, isPending: statusLoading } = useUserStatusChange();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const columns: readonly GridColDef<UserFormType>[] = [
    { field: 'code', headerName: permission.name + ' ID', minWidth: 150, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 220, flex: 1 },
    { field: 'department_id', headerName: 'Department', renderCell: ({ row }) => row.department_id?.name, minWidth: 180, flex: 1 },
    { field: 'designation_id', headerName: 'Designation', renderCell: ({ row }) => row.designation_id?.name, minWidth: 180, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      minWidth: 150,
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
          refetchUrl={'/users'}
          onChange={() =>
            changeStatus(
              {
                formData: {
                  status: !row?.status,
                  _id: row._id,
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
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => (
        <>
          {permission.edit?.access && <EditButton url={permission.path} id={row?._id} />}
          {permission.delete?.access && (
            <DeleteButton id={row?._id || ''} deleteApi={deleteUser} refetchUrl={'/users'} label={permission.name} isPending={isPending} />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          export: permission.export?.access,
          add: permission.add?.access,
          essentialFilter: [
            {
              essentialName: 'Department-sub',
              label: 'Department',
            },
            {
              essentialName: 'Designation-sub',
              label: 'Designation',
            },
          ],
        }}
        totalCount={data?.total}
        addPath={redirectLink}
        buttonLabel={permission.name}
        // mb={3}
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
