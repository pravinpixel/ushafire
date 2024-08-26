import { fDate, fCurrency } from 'helper/FormatHelper';
import { GridColDefCustom } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { CustomerPaymentType, CustomerPaymentResponse } from 'helper/types/manage-payments/CustomerPayments';

import DataTable from 'views/components/table-componet/DataTable';

type Props = {
  data?: CustomerPaymentResponse;
  isLoading: boolean;
  params?: PaginationInterFace;
  setParams?: React.Dispatch<React.SetStateAction<PaginationInterFace>>;
};

const CustomerPaymentHistory = ({ data, params, setParams, isLoading }: Props) => {
  const columns: readonly GridColDefCustom<CustomerPaymentType>[] = [
    {
      field: 'salesInvoiceNo',
      headerName: 'Sale Invoice No',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'salesInvoiceDate',
      headerName: 'Sale Invoice Date',
      minWidth: 220,
      flex: 1,
      valueGetter: ({ value }) => fDate(value),
    },
    {
      field: 'paymentTerms',
      headerName: 'Payment Terms',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'totalAmount',
      headerName: 'Total Amount',
      minWidth: 120,
      flex: 1,
      valueGetter: ({ value }) => fCurrency(value),
    },
    {
      field: 'totalPaid',
      headerName: 'Total Paid',
      minWidth: 120,
      flex: 1,
      valueGetter: ({ value }) => fCurrency(value),
    },
    {
      field: 'pendingDue',
      headerName: 'Total Due',
      minWidth: 120,
      flex: 1,
      valueGetter: ({ value }) => fCurrency(value),
    },
    {
      field: 'totalDays',
      headerName: 'Total Days',
      minWidth: 120,
      flex: 1,
    },
  ];

  return (
    <DataTable
      key={data?.total}
      params={params}
      setParams={setParams}
      dataGridProps={{
        loading: isLoading,
        checkboxSelection: false,
      }}
      row={data?.list || []}
      columns={columns}
      total={data?.totalPages}
    />
  );
};

export default CustomerPaymentHistory;
