import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { useVendorPaymentListApi } from 'store/hooks/ManagePaymentHooks';

import VendorPaymentTable from '../_utils/VendorPaymentTable';

const VendorPaymentList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>({
    ...InitialPagniationParams,
  });
  const { data, isLoading } = useVendorPaymentListApi({
    params,
  });
  return (
    <VendorPaymentTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
    />
  );
};

export default VendorPaymentList;
