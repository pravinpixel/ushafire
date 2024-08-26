import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { SalesReturnListKey, useSalesReturnListApi } from 'store/hooks/SalesCrmSystemHook';

import SalesReturnListTable from '../_utils/SalesReturnListTable';

const ListSalesReturn: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useSalesReturnListApi({
    params,
  });

  return (
    <SalesReturnListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={SalesReturnListKey}
    />
  );
};

export default ListSalesReturn;
