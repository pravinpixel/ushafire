import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { LoanReturnListKey, useLoanReturnListApi } from 'store/hooks/SalesCrmSystemHook';

import LoanReturnListTable from '../_utils/LoanReturnListTable';

const ListLoanReturn: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useLoanReturnListApi({
    params,
  });

  return (
    <LoanReturnListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={LoanReturnListKey}
    />
  );
};

export default ListLoanReturn;
