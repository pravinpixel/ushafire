import { Chip } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

import { fDate } from 'helper/FormatHelper';
import { handleColor } from 'helper/GlobalHelper';
import { useModuleFinder } from 'helper/CustomHooks';
import { LoansTypeForm } from 'helper/types/sales-crm-system/LoansTypes';

import ViewButton from 'views/components/ui-componet/buttons/ViewButton';

import DashBoardTable from './_utils/DashBoardTable';

type Props = {
  data?: readonly GridValidRowModel[];
};

const LoanApproval = ({ data }: Props) => {
  const { find } = useModuleFinder();
  const path = find('loans')?.addMore?.find((value) => value.fend_component === 'approval')?.path;
  const columns: readonly GridColDef<LoansTypeForm>[] = [
    { field: 'loanNumber', headerName: 'Loan No', renderCell: ({ row }) => row.loanNumber, minWidth: 120, flex: 1, sortable: false },
    { field: 'loanDate', headerName: 'Loan Date', renderCell: ({ row }) => fDate(row.loanDate), minWidth: 120, flex: 1, sortable: false },
    { field: 'customerName', headerName: 'Customer Name', renderCell: ({ row }) => row.customerId?.label, minWidth: 180, flex: 1, sortable: false },
    { field: 'location', headerName: 'Location', minWidth: 180, flex: 1, sortable: false },
    { field: 'employeeName', headerName: 'Employee Name', renderCell: ({ row }) => row.salePersonId?.label, minWidth: 180, flex: 1, sortable: false },
    {
      field: 'dateofReturn',
      headerName: 'Date of Return',
      renderCell: ({ row }) => fDate(row.dateOfReturn),
      minWidth: 180,
      flex: 1,
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => <Chip size="medium" color={handleColor(row?.status)} label={row?.status} />,
      minWidth: 120,
      flex: 1,
      sortable: false,
    },
    { field: 'action', headerName: '', renderCell: ({ row }) => <ViewButton id={row._id} url={path} />, width: 20, flex: 1, sortable: false },
  ];
  return <DashBoardTable title={'Loan Approval'} columns={columns} data={data} />;
};

export default LoanApproval;
