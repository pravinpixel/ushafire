import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { DealsListKey, useDealsListApi } from 'store/hooks/SalesCrmSystemHook';

import DealsListTable from '../_utils/DealsListTable';

const ListDeals: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useDealsListApi({
    params,
  });

  return (
    <DealsListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={DealsListKey}
    />
  );
};

export default ListDeals;
