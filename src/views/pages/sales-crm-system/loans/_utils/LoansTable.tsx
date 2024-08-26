import { useState } from 'react';

import { Tab, Chip, Typography } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { ModuleType, handleColor } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { useRouter, useModuleFinder } from 'helper/CustomHooks';
import { LoansResponse, LoansTypeForm } from 'helper/types/sales-crm-system/LoansTypes';

import { useLoanToPO, LoansListKey, useLoanDelete, useLoanToSaleInvoice } from 'store/hooks/SalesCrmSystemHook';

import DataTable from 'views/components/table-componet/DataTable';
import TableTopBar from 'views/components/ui-componet/TableTopBar';
import { TabList, TabContainer } from 'views/components/ui-componet/custom-tab';
import MoreVertIconButton from 'views/components/ui-componet/buttons/MoreVertIconButton';

type Props = {
  data: LoansResponse;
  isLoading: boolean;
  params: PaginationInterFace;
  setParams: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
  redirectLink?: string;
  fieldLabel?: string;
  permission: ModuleType;
};

const LoansTable = ({ data, isLoading, params, setParams, redirectLink = '', permission }: Props) => {
  const router = useRouter();
  const [ids, setIds] = useState<GridRowSelectionModel>([]);
  const [value, setValue] = useState('all');
  const { mutateAsync: deleteApi } = useLoanDelete();
  const { mutateAsync: loanToSalesInovice } = useLoanToSaleInvoice();
  const { mutateAsync: salesOrderToPo } = useLoanToPO();

  const { find } = useModuleFinder();
  const saleInvoicePath = find('sales-invoice')?.path;
  const PoRequestPath = find('purchase-order')?.path;
  const LoanReturnPath = find('loan-return')?.path;
  const handleChange = (_event: React.SyntheticEvent | null, newValue: string | unknown) => {
    setValue(newValue as string);
    setParams((state) => ({
      ...state,
      view: newValue,
    }));
  };
  const columns: readonly GridColDef<
    LoansTypeForm & {
      isMove: boolean;
      isEdit: boolean;
      isPoRequest: boolean;
    }
  >[] = [
    { field: 'loanNumber', headerName: 'Loan No', minWidth: 130, flex: 1 },
    {
      field: 'loanDate',
      headerName: 'Loan Date',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row.loanDate)}</Typography>,
      minWidth: 150,
      flex: 1,
    },
    // { field: 'quotationNo', headerName: 'Quotation No', renderCell: ({ row }) => row.customerId?.label, minWidth: 180, flex: 1 },
    // { field: 'quotationDate', headerName: 'Quotation Date', renderCell: ({ row }) => row.customerId?.label, minWidth: 180, flex: 1 },

    { field: 'customerName', headerName: 'Customer Name', renderCell: ({ row }) => row.customerId?.label, minWidth: 180, flex: 1 },
    { field: 'location', headerName: 'Location', minWidth: 220, flex: 1 },
    { field: 'salesPersonId', headerName: 'Employee Name', renderCell: ({ row }) => row.salePersonId?.label, minWidth: 160, flex: 1 },
    {
      field: 'dateOfReturn',
      headerName: 'Date of Return',
      renderCell: ({ row }) => <Typography variant="inherit">{fDate(row.dateOfReturn)}</Typography>,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'returnDays',
      headerName: 'Return Days',
      renderCell: ({ row }) => <Typography variant="inherit">{row?.returnDays || ''}</Typography>,
      minWidth: 150,
      flex: 1,
    },
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
      renderCell: ({ row }) => (
        <MoreVertIconButton
          menuItem={[
            {
              label: 'Move to Sale Invoice',
              access: permission.edit.access,
              path: permission.edit.path,
              action: 'confirmPopup',
              confirmApi: loanToSalesInovice,
              menuItemProps: {
                disabled: !row.isMove,
                onSuccess: () => router.push(saleInvoicePath ?? '/'),
              },
            },
            {
              label: 'Send PO Request',
              access: permission.edit.access,
              action: 'confirmPopup',
              confirmApi: salesOrderToPo,
              menuItemProps: {
                disabled: !row.isPoRequest,
                onSuccess: () => router.push(PoRequestPath ?? '/'),
              },
            },
            {
              label: 'Return',
              access: permission.edit.access,
              action: 'path',
              menuItemProps: {
                disabled: !(value === 'return'),
                onSuccess: () => router.push(LoanReturnPath ?? '/'),
              },
            },
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
          refetchUrl={LoansListKey}
          label={'Loan'}
          deleteApi={deleteApi}
        />
      ),
    },
  ];

  return (
    <>
      <TableTopBar
        enabled={{
          // add: permission?.add?.access,
          essentialFilter: [
            {
              essentialName: 'Loan-filter-customer',
              label: 'Customer',
            },
            {
              essentialName: 'Loan-filter-saleperson',
              label: 'Saleperson',
            },
            {
              essentialName: 'Loan-filter-status',
              label: 'Status',
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
      <TabContainer>
        <TabList handleChange={handleChange} value={value}>
          <Tab value="all" label="All Loan" />
          <Tab value="return" label="Return Due" />
        </TabList>
        <DataTable
          mt={1}
          minSize={87}
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
      </TabContainer>
    </>
  );
};

export default LoansTable;
