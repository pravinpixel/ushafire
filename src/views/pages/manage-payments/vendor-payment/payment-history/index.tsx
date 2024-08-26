import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { useVendorPaymentDetailView } from 'store/hooks/ManagePaymentHooks';

import VendorPaymentHistory from '../_utils/VendorPaymentHistory';

const PaymentHistoryVendor: React.FC<ComponentProps> = () => {
  const { id } = useParams();
  const [params, setParams] = useState<PaginationInterFace>({
    ...InitialPagniationParams,
  });
  const { data, isLoading } = useVendorPaymentDetailView({ url: id, params });
  return (
    <Box mt={7}>
      <VendorPaymentHistory data={data} isLoading={isLoading} params={params} setParams={setParams} />
    </Box>
  );
};

export default PaymentHistoryVendor;
