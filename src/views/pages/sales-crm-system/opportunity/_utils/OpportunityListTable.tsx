import React, { useState } from 'react';

import { Chip } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { useRouter, useModuleFinder } from 'helper/CustomHooks';
import { OpportunityFormType, OpportunityListResponse } from 'helper/types/sales-crm-system/OpportunityTypes';

import { OpportunityListKey, useOpportunityDelete, useOpportunityToQuotation } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: OpportunityListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};

const OpportunityListTable = ({ data, isLoading, params, setParams, redirectLink, permission }: Props) => {
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const router = useRouter();
  const { find } = useModuleFinder();

  const quotationModule = find('quotation');

  const access = quotationModule?.add?.access || false;
  const path = quotationModule?.path || '/';

  const { mutateAsync: deleteApi } = useOpportunityDelete();
  const { mutateAsync: confirmApi } = useOpportunityToQuotation();

  const columns: readonly GridColDef<OpportunityFormType>[] = [
    { field: 'opportunityNumber', headerName: 'Opportunity No', minWidth: 120, flex: 1 },
    { field: 'opportunityDate', headerName: 'Opportunity Date', minWidth: 150, flex: 1, renderCell: ({ row }) => fDate(row?.opportunityDate) },
    { field: 'leadNumber', headerName: 'Lead No', minWidth: 100, flex: 1 },
    { field: 'leadDate', headerName: 'Lead Date', minWidth: 180, flex: 1, renderCell: ({ row }) => fDate(row?.leadDate) },
    { field: 'customerId', headerName: 'Customers', renderCell: ({ row }) => row?.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'salePersonId', headerName: 'Sale Person', renderCell: ({ row }) => row?.salePersonId?.label, minWidth: 160, flex: 1 },
    {
      field: 'opportunityStage',
      headerName: 'Deals',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.opportunityStage?.label)} label={row?.opportunityStage?.label} />,
      minWidth: 150,
      flex: 1,
    },
    { field: 'leadType', headerName: 'Lead Source', renderCell: ({ row }) => row?.leadType?.label, minWidth: 150, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.status)} label={row?.status} />,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      minWidth: 50,
      flex: 1,
      renderCell: ({ row }) =>
        row?.status !== 'Moved To Quotation' && (
          <MoreVertIconButton
            menuItem={[
              {
                label: 'Move to Quotation',
                action: 'confirmPopup',
                access: access || false,
                menuItemProps: {
                  onSuccess: () => router.push(path),
                  disabled: row?.status !== 'Approved',
                },
                confirmApi: confirmApi,
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
            refetchUrl={OpportunityListKey}
            label={'Opportunity'}
            deleteApi={deleteApi}
          />
        ),
    },
  ];
  return (
    <>
      <TableTopBar
        addPath={redirectLink}
        enabled={{
          essentialFilter: [
            {
              label: 'Customer',
              essentialName: 'Opportunity-filter-customer',
            },
            {
              essentialName: 'Opportunity-filter-salesperson',
              label: 'Sales Person',
            },
            {
              essentialName: 'Opportunity-filter-leadSource',
              label: 'Lead Source',
            },
            {
              essentialName: 'Opportunity-filter-opportunitystatus',
              label: 'Status',
            },
          ],
        }}
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

export default OpportunityListTable;
