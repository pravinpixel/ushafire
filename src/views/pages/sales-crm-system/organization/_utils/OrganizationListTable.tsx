import React, { useState } from 'react';

import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { ModuleType } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { OrganizationFormType, OrganizationListResponse } from 'helper/types/sales-crm-system/OrganizationTypes';

import { OrganizationListKey, useOrganizationDelete } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: OrganizationListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};
const OrganizationListTable = ({ data, isLoading, params, setParams, redirectLink, permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const { mutateAsync: deleteApi } = useOrganizationDelete();
  const columns: readonly GridColDef<OrganizationFormType>[] = [
    { field: 'organizationName', headerName: 'Organization Name', minWidth: 180, flex: 1 },
    { field: 'verticalTypeId', headerName: 'Vertical Type', renderCell: ({ row }) => row?.verticalTypeId?.label, minWidth: 180, flex: 1 },
    { field: 'bussinessType', headerName: 'Bussiness Type', renderCell: ({ row }) => row?.businessType?.label, minWidth: 160, flex: 1 },
    { field: 'paymentTermsId', headerName: 'Payment Terms', renderCell: ({ row }) => row?.paymentTermsId?.label, minWidth: 160, flex: 1 },
    { field: 'contact', headerName: 'Contact', minWidth: 180, flex: 1 },
    {
      field: 'email',
      headerName: 'Email',
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
          refetchUrl={OrganizationListKey}
          label={'Organization'}
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
          essentialFilter: [
            {
              essentialName: 'Organization-filter-businessvertical',
              label: 'Bussiness Vertical',
            },
            {
              essentialName: 'Organization-filter-subvertical',
              label: 'Sub Vertical',
            },
            {
              essentialName: 'Organization-filter-paymentterms',
              label: 'Payment Terms',
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

export default OrganizationListTable;
