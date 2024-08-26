import React, { useState } from 'react';

import { Chip, Typography } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { useModuleFinder } from 'helper/CustomHooks';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { LeadFormType, LeadListResponse } from 'helper/types/sales-crm-system/LeadManagementTypes';

import { LeadListKey, useLeadDelete } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: LeadListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};
const LeadListTable = ({ data, isLoading, params, setParams, redirectLink, permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const { find } = useModuleFinder();
  const access = find('opportunity')?.add?.access || false;
  const path = find('opportunity')?.path || '/';
  const { mutateAsync: deleteApi, isPending } = useLeadDelete();
  const columns: readonly GridColDef<LeadFormType>[] = [
    { field: 'leadNumber', headerName: 'Lead No', minWidth: 180, flex: 1 },
    {
      field: 'leadDate',
      headerName: 'leadDate',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row.leadDate)}</Typography>,
      minWidth: 180,
      flex: 1,
    },
    { field: 'customerId', headerName: 'Customers', renderCell: ({ row }) => row?.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'salePersonId', headerName: 'Sale Person', renderCell: ({ row }) => row?.salePersonId?.label, minWidth: 160, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.status)} label={row?.status} />,
      minWidth: 120,
      flex: 1,
    },
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
              label: 'Move to opportunity',
              access: access || false,
              path: path || '/',
              action: 'path',
            },
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
          refetchUrl={LeadListKey}
          label={'Lead'}
          isPending={isPending}
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
          // essentialFilter: [],
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

export default LeadListTable;
