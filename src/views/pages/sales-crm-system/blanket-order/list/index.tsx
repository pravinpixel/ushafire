import { useState } from 'react';

import { ComponentProps } from 'helper/types/GlobalTypes';
import { InitialPagniationParams } from 'helper/GlobalHelper';
import { PaginationInterFace } from 'helper/types/TableTypes';

import { BlanketOrderListKey, useBlanketOrderListApi } from 'store/hooks/SalesCrmSystemHook';

import BlanketOrderListTable from '../_utils/BlanketListTable';

const ListBlanketOrder: React.FC<ComponentProps> = ({ permission }) => {
  const [params, setParams] = useState<PaginationInterFace>(InitialPagniationParams);
  const { data, isLoading } = useBlanketOrderListApi({
    params,
  });

  return (
    <BlanketOrderListTable
      data={data}
      params={params}
      setParams={setParams}
      isLoading={isLoading}
      redirectLink={permission?.add?.path || ''}
      permission={permission}
      refetchUrl={BlanketOrderListKey}
    />
  );
};

export default ListBlanketOrder;
