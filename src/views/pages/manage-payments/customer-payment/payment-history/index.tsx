import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { useCustomerPaymentDetailView } from 'store/hooks/ManagePaymentHooks';

import CustomerPaymentHistory from '../_utils/CustomerPaymentHistory';

const PaymentHistoryCustomer: React.FC<ComponentProps> = () => {
  const { id } = useParams();
  const [params, setParams] = useState<PaginationInterFace>({
    ...InitialPagniationParams,
  });
  const { data, isLoading } = useCustomerPaymentDetailView({ url: id, params });
  return (
    <Box mt={7}>
      <CustomerPaymentHistory data={data} isLoading={isLoading} params={params} setParams={setParams} />
    </Box>
  );
};

export default PaymentHistoryCustomer;
