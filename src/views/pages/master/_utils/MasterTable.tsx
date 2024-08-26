import { Avatar } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { defaultImage } from 'helper/AssetHelper';
import { notify, ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { MasterForm, MasterListResponse } from 'helper/types/MasterType';

import { useMasterDelete, useMasterStatusChange } from 'store/hooks/MasterHooks';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import ActiveInactiveButton from 'views/components/ui-componet/buttons/ActiveInactiveButton';
import ViewEditDeleteButton from 'views/components/ui-componet/buttons/ViewEditDeleteButton';

type ColumnVisble = {
  code?: boolean;
  sub_name?: boolean;
  name?: boolean;
  brand_logo?: boolean;
  status?: boolean;
  symbol?: boolean;
  country_code?: boolean;
  country_id?: boolean;
  state_name?: boolean;
  state_id?: boolean;
  location_id?: boolean;
  bay_id?: boolean;
  rack_id?: boolean;
  vertical_id?: boolean;
  date?: boolean;
  quantity?: boolean;
  product_id?: boolean;
  address?: boolean;
  rackId?: boolean;
  shelfId?: boolean;
};

const MasterTable = ({
  data,
  isLoading,
  params,
  setParams,
  fieldLabel,
  buttonLabel,
  url,
  visbleColumn,
  permission,
}: {
  data: MasterListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  buttonLabel: string;
  fieldLabel?: string;
  url: string;
  visbleColumn?: ColumnVisble;
  permission: ModuleType;
}) => {
  //Hooks
  const { mutateAsync: changeStatus, isPending: statusLoading } = useMasterStatusChange();
  const { mutateAsync: deleteMaster, isPending } = useMasterDelete();

  const columns: readonly GridColDef<MasterForm>[] = [
    {
      field: 'date',
      headerName: fieldLabel + ' Date',
      sortable: false,
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{fDate(row.date)}</div>;
      },
    },
    { field: 'code', headerName: fieldLabel + ' Code', sortable: false, minWidth: 220, flex: 1 },
    { field: 'name', headerName: fieldLabel + ' Name', minWidth: 220, flex: 1 },
    { field: 'sub_name', headerName: fieldLabel + ' Name', minWidth: 220, flex: 1 },
    { field: 'state_name', headerName: 'State Name', minWidth: 220, flex: 1 },
    { field: 'country_code', headerName: 'Country Code', minWidth: 220, flex: 1 },
    { field: 'quantity', headerName: 'Quantity', sortable: false, minWidth: 220, flex: 1 },
    { field: 'product_id', headerName: 'Product Name', minWidth: 220, flex: 1 },
    { field: 'address', headerName: fieldLabel + ' Address', minWidth: 220, flex: 1 },
    {
      field: 'country_id',
      headerName: 'Country Name',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => row?.country_id?.label,
    },
    {
      field: 'state_id',
      headerName: 'State' + ' Name',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{row?.state_id?.label}</div>;
      },
    },
    {
      field: 'vertical_id',
      headerName: 'Vertical' + ' Name',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{row?.vertical_id?.label}</div>;
      },
    },
    {
      field: 'location_id',
      headerName: fieldLabel + ' Location',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{row?.location_id?.label}</div>;
      },
    },
    {
      field: 'rack_id',
      headerName: 'Rack Name',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{row?.rack_id?.label}</div>;
      },
    },
    {
      field: 'bay_id',
      headerName: 'Bay Name',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{row?.bay_id?.label}</div>;
      },
    },
    {
      field: 'rackId',
      headerName: 'Rack Name',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{row?.rackId?.name}</div>;
      },
    },
    {
      field: 'shelfId',
      headerName: 'Shelf Name',
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => {
        return <div>{row?.shelfId?.name}</div>;
      },
    },
    { field: 'symbol', headerName: fieldLabel + ' Symbol', sortable: false, minWidth: 220, flex: 1 },
    {
      field: 'brand_logo',
      headerName: fieldLabel + ' Logo',
      sortable: false,
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => <Avatar variant="square" src={(row?.brand_logo as string) ?? defaultImage} />,
    },
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
          row={{
            status: row?.status,
            _id: row?._id,
          }}
          edit_access={permission.edit.access}
          refetchUrl={url}
          onChange={() =>
            changeStatus(
              {
                formData: {
                  status: !row?.status,
                  url,
                },
                url: `${url}/` + row?._id,
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
        <ViewEditDeleteButton
          key={row?._id}
          id={row?._id ?? ''}
          enabled={{
            edit: permission.edit?.access,
            deleted: permission.delete?.access,
          }}
          deleteApi={deleteMaster}
          url={url}
          path={permission.path}
          isPending={isPending}
          deleteId={`${url}/` + row?._id}
          label={buttonLabel}
        />
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        addPath={permission.add?.path}
        buttonLabel={buttonLabel}
        params={params}
        setParams={setParams}
        totalCount={data?.total}
        filterCount={data?.filterCount}
        url={url}
        enabled={{ export: permission.export?.access, import: permission.add?.access, add: permission.add?.access }}
      />
      <DataTable
        key={data?.total}
        params={params}
        setParams={setParams}
        title={buttonLabel}
        // totalCount={data?.total}
        dataGridProps={{
          loading: isLoading,
          checkboxSelection: false,
          initialState: {
            columns: {
              columnVisibilityModel: {
                code: true,
                name: true,
                status: true,
                sub_name: false,
                brand_logo: false,
                symbol: false,
                country_code: false,
                country_id: false,
                state_name: false,
                state_id: false,
                location_id: false,
                bay_id: false,
                rack_id: false,
                vertical_id: false,
                quantity: false,
                date: false,
                product_id: false,
                address: false,
                rackId: false,
                shelfId: false,
                ...visbleColumn,
              } as ColumnVisble,
            },
          },
        }}
        row={data?.list}
        columns={columns}
        total={data?.totalPages}
      />
    </>
  );
};

export default MasterTable;
