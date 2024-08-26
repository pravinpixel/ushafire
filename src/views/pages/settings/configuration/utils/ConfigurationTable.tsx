import { useState } from 'react';

import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { notify, ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { ConfigurationFormType, ConfigurationListResponse } from 'helper/types/AdminSettingTypes';

import { ConfigurationListKey, useConfigurationDelete, useConfigurationStatusChange } from 'store/hooks/SettingHooks';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';
import ActiveInactiveButton from 'views/components/ui-componet/buttons/ActiveInactiveButton';

type Props = {
  data: ConfigurationListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  url: string;
  permission: ModuleType;
};

const ConfigurationTable = ({ data, isLoading, params, setParams, url, redirectLink = '', permission }: Props) => {
  const { mutateAsync: changeStatus, isPending: statusLoading } = useConfigurationStatusChange();
  const { mutateAsync: roleDelete } = useConfigurationDelete();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const columns: readonly GridColDef<ConfigurationFormType>[] = [
    { field: 'type_id', headerName: 'Type', minWidth: 220, flex: 1 },
    { field: 'text', headerName: 'Prefix Text', minWidth: 220, flex: 1 },
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
        <MoreVertIconButton
          id={row._id}
          deleteApi={roleDelete}
          menuItem={[
            {
              label: 'Edit',
              access: permission.edit.access,
              action: 'edit',
              path: permission.edit.path,
            },
            {
              label: 'Delete',
              access: permission.delete.access,
              action: 'delete',
            },
          ]}
          refetchUrl={ConfigurationListKey}
          label={permission.name}
          isPending={false}
        />
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        totalCount={data?.total}
        enabled={{
          add: permission?.add?.access,
          essentialFilter: [
            {
              essentialName: 'Configuration',
              label: 'Type',
            },
          ],
        }}
        addPath={redirectLink}
        buttonLabel={permission.name}
        params={params}
        setParams={setParams}
        url={url}
        ids={ids}
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

export default ConfigurationTable;
