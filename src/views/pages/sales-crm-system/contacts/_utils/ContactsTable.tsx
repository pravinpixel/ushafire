import { useState } from 'react';

import { Stack, Avatar, Typography } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { notify, ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { ContactsResponse, ContactsTypeForm } from 'helper/types/sales-crm-system/ContactsTypes';

import { ContactsListKey, useContactDelete, useContactStatus, useContactSendMail } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';
import ActiveInactiveButton from 'views/components/ui-componet/buttons/ActiveInactiveButton';

type Props = {
  data: ContactsResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  permission: ModuleType;
};

const ContactsTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const { mutateAsync: deleteApi } = useContactDelete();
  const { mutateAsync: changeStatus, isPending } = useContactStatus();
  const { mutateAsync: sendMailApi } = useContactSendMail();

  const columns: readonly GridColDef<
    ContactsTypeForm & {
      createdAt?: string;
    }
  >[] = [
    {
      field: 'customerName',
      headerName: 'Customer Name',
      minWidth: 220,
      renderCell: ({ row }) => (
        <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
          <Avatar
            variant="square"
            sx={{
              height: '1.5rem',
              width: '1.5rem',
            }}
            src={row.customerPhoto as string}
          />
          <Typography variant="inherit">{row.customerName}</Typography>
        </Stack>
      ),
      flex: 1,
    },
    { field: 'mobile', headerName: 'Primary Contact', minWidth: 180, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 180, flex: 1 },
    { field: 'company', headerName: 'Company', minWidth: 160, flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created On',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row.createdAt)}</Typography>,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      minWidth: 160,
      flex: 1,
      renderCell: ({ row }) => (
        <ActiveInactiveButton
          key={row._id}
          row={{
            status: row?.status,
            _id: row?._id,
          }}
          edit_access={permission.edit.access}
          refetchUrl={ContactsListKey}
          onChange={() =>
            changeStatus(
              {
                status: !row?.status,
                id: row._id ?? '',
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
          isPending={isPending}
        />
      ),
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 40,
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
            {
              label: 'Send Mail',
              action: 'confirmPopup',
              access: permission.view.access,
              confirmApi: sendMailApi,
            },
          ]}
          id={row._id}
          refetchUrl={ContactsListKey}
          label={'Contact'}
          deleteApi={deleteApi}
        />
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          add: permission?.add?.access,
          essentialFilter: [],
        }}
        addPath={redirectLink}
        buttonLabel={permission.name}
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
        row={data?.list}
        columns={columns}
        total={data?.totalPages}
      />
    </>
  );
};

export default ContactsTable;
