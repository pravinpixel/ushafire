import React, { useState } from 'react';

import { Chip } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate, fCurrency } from 'helper/FormatHelper';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { useRouter, useModuleFinder } from 'helper/CustomHooks';
import { QuotationFormType, QuotationListResponse } from 'helper/types/sales-crm-system/QuotationTypes';

import {
  QuotationListKey,
  useQuotationClone,
  useQuotationDelete,
  useQuotationToLoan,
  useQuotationToSaleOrder,
  useQuotationToBlanketOrder,
} from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import ViewButton from 'views/components/ui-componet/buttons/ViewButton';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: QuotationListResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  refetchUrl: string;
  permission: ModuleType;
};
const QuotationListTable = ({ data, isLoading, params, setParams, redirectLink, permission }: Props) => {
  const router = useRouter();
  const { find } = useModuleFinder();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);

  const blanketPath = find('blanket-order')?.path;
  const saleOrderPath = find('sales-order')?.path;

  const loanPath = find('loans')?.path;

  const { mutateAsync: deleteApi } = useQuotationDelete();

  const { mutateAsync: confirmSaleOrderApi } = useQuotationToSaleOrder();
  const { mutateAsync: confirmBlanketOrderApi } = useQuotationToBlanketOrder();
  const { mutateAsync: confirmQuotationLoanApi } = useQuotationToLoan();
  const { mutateAsync: confirmQuotationCloneApi } = useQuotationClone();

  const columns: readonly GridColDef<
    QuotationFormType & {
      isBlanketOrder: boolean;
      isSaleOrder: boolean;
      isLoan: boolean;
      isEdit: boolean;
    }
  >[] = [
    { field: 'quotationNumber', headerName: 'Quotation No', minWidth: 180, flex: 1 },
    { field: 'quotationDate', headerName: 'Quotation Date', renderCell: ({ row }) => fDate(row?.quotationDate), minWidth: 180, flex: 1 },
    { field: 'opportunityDate', headerName: 'Opportunity Date', renderCell: ({ row }) => fDate(row?.opportunityDate), minWidth: 160, flex: 1 },
    { field: 'opportunityNumber', headerName: 'Opportunity No', minWidth: 180, flex: 1 },
    { field: 'customerId', headerName: 'Customer', renderCell: ({ row }) => row?.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'leadType', headerName: 'Lead Type', renderCell: ({ row }) => row?.leadType?.label, minWidth: 180, flex: 1 },
    // { field: 'leadNumber', headerName: 'Price', minWidth: 180, flex: 1 },
    // { field: 'leadNumber', headerName: 'Discount', minWidth: 180, flex: 1 },
    { field: 'totalAmount', headerName: 'Total Price', renderCell: ({ row }) => fCurrency(row?.totalAmount), minWidth: 180, flex: 1 },
    {
      field: 'viewQuote',
      headerName: 'View  Quote',
      renderCell: ({ row }) => <ViewButton url={permission.view.path} id={row._id} />,
      minWidth: 180,
      flex: 1,
    },
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
              label: 'Move to Blanket Order',
              access: permission.edit.access,
              path: permission.edit.path,
              action: 'confirmPopup',
              confirmApi: confirmBlanketOrderApi,
              menuItemProps: {
                disabled: !row.isBlanketOrder,
                onSuccess: () => router.push(blanketPath ?? '/'),
              },
            },
            {
              label: 'Move to Loan',
              access: permission.edit.access,
              action: 'confirmPopup',
              confirmApi: confirmQuotationLoanApi,
              menuItemProps: {
                disabled: !row.isLoan,
                onSuccess: () => router.push(loanPath ?? '/'),
              },
            },
            {
              label: 'Clone',
              access: permission.edit.access,
              action: 'confirmPopup',
              confirmApi: confirmQuotationCloneApi,
              menuItemProps: {
                onSuccess: (res) => {
                  const { data } = res as { data: QuotationFormType };
                  router.pushById({
                    path: permission.edit.path ?? '/',
                    id: data?._id ?? '',
                  });
                },
              },
            },
            {
              label: 'Move to SO',
              access: permission.edit.access,
              path: permission.edit.path,
              action: 'confirmPopup',
              confirmApi: confirmSaleOrderApi,
              menuItemProps: {
                disabled: !row.isSaleOrder,
                onSuccess: () => router.push(saleOrderPath ?? '/'),
              },
            },
            // {
            //   label: 'Download',
            //   action: 'edit',
            //   access: permission.edit.access,
            //   path: permission.edit.path,
            // },
            {
              label: 'Edit',
              action: 'edit',
              access: permission.edit.access,
              path: permission.edit.path,
              menuItemProps: {
                disabled: !row.isEdit,
              },
            },
            {
              label: 'Delete',
              action: 'delete',
              access: permission.delete.access,
            },
          ]}
          id={row._id}
          refetchUrl={QuotationListKey}
          label={'Quotation'}
          deleteApi={deleteApi}
        />
      ),
    },
  ];
  return (
    <>
      <TableTopBar
        enabled={{
          essentialFilter: [
            {
              essentialName: 'Quotation-filter-saleperson',
              label: 'Sales Person',
            },
            {
              essentialName: 'Quotation-filter-status',
              label: 'Status',
            },
            {
              essentialName: 'Quotation-filter-leadtype',
              label: 'Leadtype',
            },
            {
              essentialName: 'Quotation-filter-customer',
              label: 'Customer',
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

export default QuotationListTable;
