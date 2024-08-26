import { GridColDef } from '@mui/x-data-grid';

import { ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { ParentModuleFormType, ParentModuleListResponse } from 'helper/types/AdminSettingTypes';

import { useChildModuleDelete, useParentModuleDelete } from 'store/hooks/ModuleHooks';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import EditButton from 'views/components/ui-componet/buttons/EditButton';
import DeleteButton from 'views/components/ui-componet/buttons/DeleteButton';

type ColumnVisble = {
  label?: boolean;
  name?: boolean;
  path?: boolean;
  slug?: boolean;
  Access?: boolean;
  parent_id?: boolean;
};
type Props = {
  data: ParentModuleListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  buttonLabel: string;
  fieldLabel?: string;
  url: string;
  visbleColumn?: ColumnVisble;
  permission: ModuleType;
};

export const ModuleTable = ({ permission, buttonLabel, data, isLoading, params, setParams, url, visbleColumn, redirectLink = '' }: Props) => {
  const { mutateAsync: parentModuleDelete, isPending } = useParentModuleDelete();
  const { mutateAsync: childModuleDelete, isPending: childPending } = useChildModuleDelete();
  const parentCheck = buttonLabel === 'Child Module' ? false : true;
  const columns: GridColDef<ParentModuleFormType>[] = [
    { field: 'label', headerName: 'Label', sortable: false, minWidth: 220, flex: 1 },
    { field: 'name', headerName: 'ParentModule Name', minWidth: 220, flex: 1 },
    {
      field: 'parent_id',
      headerName: 'Parent Name',
      minWidth: 220,
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => row?.parent_id?.name,
    },
    { field: 'path', headerName: 'Path Name', sortable: false, minWidth: 220, flex: 1 },
    { field: 'slug', headerName: 'Slug Name', sortable: false, minWidth: 220, flex: 1 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <EditButton url={permission.path} id={row?._id} />
          <DeleteButton
            id={row?._id || ''}
            deleteApi={(values, obj) => {
              return parentCheck ? parentModuleDelete(values, obj) : childModuleDelete(values, obj);
            }}
            label={parentCheck ? 'ParentModule' : 'ChildModule'}
            refetchUrl={url}
            isPending={childPending || isPending}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        addPath={redirectLink}
        buttonLabel={buttonLabel}
        params={params}
        setParams={setParams}
        totalCount={data?.total}
        url={url}
        enabled={{
          add: true,
        }}
        filterCount={data?.filterCount}
      />
      <DataTable
        row={data?.list}
        params={params}
        setParams={setParams}
        dataGridProps={{
          loading: isLoading,
          checkboxSelection: false,
          initialState: {
            columns: {
              columnVisibilityModel: {
                name: true,
                label: true,
                slug: true,
                path: true,
                parent_id: false,
                ...visbleColumn,
              } as ColumnVisble,
            },
          },
        }}
        title={buttonLabel}
        // totalCount={data?.total}
        columns={columns}
        total={data?.totalPages}
      />
    </>
  );
};
