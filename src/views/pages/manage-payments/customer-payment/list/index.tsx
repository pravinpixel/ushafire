import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { useCustomerPaymentListApi } from 'store/hooks/ManagePaymentHooks';

import CustomerPaymentTable from '../_utils/CustomerPaymentTable';

const CustomerPaymentList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>({
    ...InitialPagniationParams,
  });
  const { data, isLoading } = useCustomerPaymentListApi({
    params,
  });

  return (
    <CustomerPaymentTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
    />
  );
};

export default CustomerPaymentList;
