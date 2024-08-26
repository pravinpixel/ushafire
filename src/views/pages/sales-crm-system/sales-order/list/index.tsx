import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { PaginationInterFace } from 'helper/types/TableTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';

import { useSalesOrderListApi } from 'store/hooks/SalesCrmSystemHook';

import SalesOrderTable from '../_utils/SalesOrderTable';

const SalesOrderList: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useSalesOrderListApi({
    params,
  });

  return (
    <SalesOrderTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
    />
  );
};

export default SalesOrderList;
